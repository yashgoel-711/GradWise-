import { Project } from "../models/Project.model.js";
import { asyncAwaitHandler } from "../utils/asyncAwaitHandler.utils.js";
import { apiError } from "../utils/apiError.utils.js";
import { apiResponse } from "../utils/apiResponse.utils.js";

const createProject = asyncAwaitHandler(async (req, res) => {
    const { githubRepo, status, summary, techStack, domain } = req.body;
    if (
        [githubRepo, status, summary, domain].some(
          (field) => typeof field !== "string" || field.trim() === ""
        ) ||
        !Array.isArray(techStack) || techStack.length === 0
      ) {
        throw new apiError(400, "Must pass valid Project details");
      }
    
    const createdProject = await Project.create({
        githubRepo,
        status,
        summary,
        techStack,
        domain,
        uploadedBy: req.student._id,
    });
    
    if (!createdProject) {
        throw new apiError(500, "error while creating Project");
    }
    
    return res.status(200).json(
        new apiResponse(200, createdProject, "Project created successfully")
    );
})
const getProject = asyncAwaitHandler(async (req, res) => {
    const studentId = req.student._id;

    const projects = await Project.find({ uploadedBy: studentId });

    if (!projects || projects.length === 0) {
        throw new apiError(404, "No projects found for this student");
    }

    return res.status(200).json(
        new apiResponse(200, projects, "Projects retrieved successfully")
    );
});
export {createProject,getProject}