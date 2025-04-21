import { Ainvidia } from "../services/OpenAI/OpenAI.services.js";
import { apiError } from "../utils/apiError.utils.js";
import { asyncAwaitHandler } from "../utils/asyncAwaitHandler.utils.js";
import { apiResponse } from "../utils/apiResponse.utils.js";

const Aihandle = asyncAwaitHandler(async (req, res) => {
  const { name, year } = req.student;

  // Validate input from req.student
  if (!name  || !year) {
    throw new apiError(400, "Student information incomplete: name, course, and year are required");
  }

  // Generate AI prompt using student info
  const prompt = `
    Hi AI, my name is ${name}. I am currently pursuing a course in btech and I am in year ${year}.
    Can you create a personalized career roadmap for me?
    Include suggestions like skills to learn, technologies to focus on, internships, projects, certifications, and possible career paths in btech.
  `;

  // Call Ainvidia to get AI-generated roadmap
  const response = await Ainvidia(prompt);

  if (!response) {
    throw new apiError(408, "Cannot get the response from AI");
  }

  // Send back the roadmap
  return res.status(200).json(
    new apiResponse(200, {
      message: "Career roadmap generated successfully",
      roadmap: response,
    })
  );
});

export { Aihandle };
