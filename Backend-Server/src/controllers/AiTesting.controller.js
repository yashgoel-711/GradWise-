import { Ainvidia } from "../services/OpenAI/OpenAI.services.js";
import { apiError } from "../utils/apiError.utils.js";
import { asyncAwaitHandler } from "../utils/asyncAwaitHandler.utils.js";
import { apiResponse } from "../utils/apiResponse.utils.js";

const AiProgressTracker = asyncAwaitHandler(async (req,res) => {
  const { prompt, history } = req.body
  if(!prompt){
    throw new apiError(400,"Prompt is required")

  }
  // Keep only the last few well-formed turns as context
  const safeHistory = Array.isArray(history)
    ? history
        .filter(m => m && ["user","assistant"].includes(m.role) && typeof m.content === "string")
        .slice(-10)
    : []
  try {
    const aiResponse = await Ainvidia(prompt, safeHistory);

    return res.status(200).json({
      success: true,
      message: "AI response generated successfully",
      data: aiResponse,
    });

  } catch (error) {
    console.error("AI Generation Error:", error);

    return res.status(502).json({
      success: false,
      message: "Failed to generate AI response",
      error: error.message || "Unexpected error",
    });
  }
})

const cleanLine = (line) =>
  line
    .replace(/^\s*(?:[-•*]|\d+[.)])\s*/, "") // bullet or "1." prefix
    .replace(/\*\*/g, "")                        // markdown bold
    .trim();

const roadmapPayload = (student) => ({
  name: student.name,
  year: student.year,
  branch: student.branch,
  roadmap: student.Roadmap,
  roadmapDone: student.roadmapDone || [],
});

// Generates the roadmap once and stores it; later calls return the stored one
// unless the client asks to regenerate.
const Aihandle = asyncAwaitHandler(async (req, res) => {
  const student = req.student;
  const { name, year, branch } = student;

  if (!name || !year) {
    throw new apiError(400, "Student information incomplete: name and year are required");
  }

  if (student.Roadmap?.length && !req.body?.regenerate) {
    return res.status(200).json(new apiResponse(200, roadmapPayload(student)));
  }

  const skills = student.skills?.length ? student.skills.join(", ") : "none listed yet";
  const prompt = `
You are a career advisor AI.

The student is ${name}, studying ${branch || "engineering"}, currently in year ${year}.
Their current skills: ${skills}.

Give a clear, concise career roadmap of 8 to 10 steps, one step per line, in the order they should be done.
Each step is a short action: a skill to learn, certification, project to build, or internship to apply for.
Build on the skills they already have.
Output only the steps, one per line, with no heading, introduction or closing remarks.
`;

  let response;
  try {
    response = await Ainvidia(prompt);
  } catch (error) {
    throw new apiError(502, `AI is unavailable right now: ${error.message}`);
  }

  const taskArray = response
    .split("\n")
    .map(cleanLine)
    .filter((task) => task.length > 0 && task.toLowerCase() !== "bullets");

  student.Roadmap = taskArray;
  student.roadmapDone = []; // new roadmap, new progress
  await student.save();

  return res.status(200).json(new apiResponse(200, roadmapPayload(student)));
});

// Pulls the first JSON object out of a model reply (models often wrap it in prose or code fences)
const parseJsonObject = (text) => {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) return null;
  try {
    return JSON.parse(match[0]);
  } catch {
    return null;
  }
};

const SkillGap = asyncAwaitHandler(async (req, res) => {
  const role = req.body?.role?.trim();
  if (!role) {
    throw new apiError(400, "Target role is required");
  }
  const current = req.student.skills?.length ? req.student.skills.join(", ") : "none";

  const prompt = `
A student wants to become a ${role.slice(0, 80)}.
Their current skills: ${current}.

List the skills they are still missing for this role, and for each one a learning resource.
Reply with only a JSON object, no other text, in exactly this shape:
{"missingSkills":["skill 1","skill 2"],"resources":[{"skill":"skill 1","title":"resource title","platform":"YouTube / Coursera / freeCodeCamp / docs"}]}
Give 5 to 7 missing skills. Do not include URLs.
`;

  let text;
  try {
    text = await Ainvidia(prompt);
  } catch (error) {
    throw new apiError(502, `AI is unavailable right now: ${error.message}`);
  }

  const parsed = parseJsonObject(text);
  const missingSkills = Array.isArray(parsed?.missingSkills)
    ? parsed.missingSkills.map(String).slice(0, 10)
    : [];
  if (!missingSkills.length) {
    throw new apiError(502, "AI returned an unreadable answer, please try again");
  }
  const resources = Array.isArray(parsed?.resources)
    ? parsed.resources
        .filter((r) => r && r.title)
        .map((r) => ({ skill: String(r.skill ?? ""), title: String(r.title), platform: String(r.platform ?? "") }))
        .slice(0, 12)
    : [];

  return res.status(200).json(new apiResponse(200, { role, missingSkills, resources }));
});


export { Aihandle,AiProgressTracker,SkillGap };
