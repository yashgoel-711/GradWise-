import { Aigpt2 } from "../services/OpenAI/OpenAI.services.js";
import { apiError } from "../utils/apiError.utils.js";
import { asyncAwaitHandler } from "../utils/asyncAwaitHandler.utils.js";
import { apiResponse } from "../utils/apiResponse.utils.js";
import { Student } from "../models/Student.model.js";
const AiProgressTracker = asyncAwaitHandler(async (req,res) => {
  const prompt  = req.body.prompt
  console.log("prompt from aiprogress tracker",prompt)
  if(!prompt){
    throw new apiError(400,"Prompt is required")

  }
  console.log(prompt)
  try {
    const aiResponse = await Aigpt2(prompt);
    console.log(aiResponse)
    console.log(typeof aiResponse)

    return res.status(200).json({
      success: true,
      message: "AI response generated successfully",
      data: aiResponse,
    });

  } catch (error) {
    console.error("AI Generation Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate AI response",
      error: error.message || "Unexpected error",
    });
  }

  
  

  
  
})

const Aihandle = asyncAwaitHandler(async (req, res) => {

  const { name, year } = req.student;
  const course = "B.Tech";

  if (!name || !year) {
    throw new apiError(400, "Student information incomplete: name and year are required");
  }

  const prompt = `
You are a career advisor AI.

The student name is ${name}. They are studying ${course}, currently in year ${year}.

Give a clear, concise career roadmap in bullet points only.
Only include action steps, skills to learn, certifications, internships, or projects.
Do not include any introduction, closing remarks, or extra explanation — just the tasks.
`;

  const response = await Aigpt2(prompt);

  if (!response) {
    throw new apiError(408, "Cannot get the response from AI");
  }

  // Convert plain text bullet points into an array
  const taskArray = response
    .split('\n')
    .map(line => line.replace(/^[-•*\d.]+\s*/, '').trim()) // remove bullet symbols/numbers
    .filter(task => task.length > 0);
  const TaskArray  = await Student.UpdateRoadmap(req.student._id,taskArray)
  console.log(TaskArray)
  // remove empty lines

  return res.status(200).json(
    new apiResponse(200, {
      name,
      course,
      year,
      roadmap:  TaskArray,
    })
  );

});


export { Aihandle,AiProgressTracker };
