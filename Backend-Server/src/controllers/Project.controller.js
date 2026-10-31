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
// List variant for GET: an empty list is a normal result, not a 404
const listProjects = asyncAwaitHandler(async (req, res) => {
    const projects = await Project.find({ uploadedBy: req.student._id }).sort({ createdAt: -1 });
    return res.status(200).json(new apiResponse(200, projects, "Projects retrieved successfully"));
});

const updateProject = asyncAwaitHandler(async (req, res) => {
    const { githubRepo, status, summary, techStack, domain } = req.body;
    const project = await Project.findOne({ _id: req.params.id, uploadedBy: req.student._id });
    if (!project) {
        throw new apiError(404, "Project not found");
    }
    if (techStack !== undefined && !Array.isArray(techStack)) {
        throw new apiError(400, "techStack must be an array");
    }
    if (status !== undefined && !Project.schema.path("status").enumValues.includes(status)) {
        throw new apiError(400, "Invalid status");
    }

    project.githubRepo = githubRepo?.trim() || project.githubRepo;
    project.status = status ?? project.status;
    project.summary = summary ?? project.summary;
    project.techStack = techStack ?? project.techStack;
    project.domain = domain ?? project.domain;
    await project.save();

    return res.status(200).json(new apiResponse(200, project, "Project updated successfully"));
});

const deleteProject = asyncAwaitHandler(async (req, res) => {
    const removed = await Project.findOneAndDelete({ _id: req.params.id, uploadedBy: req.student._id });
    if (!removed) {
        throw new apiError(404, "Project not found");
    }
    return res.status(200).json(new apiResponse(200, {}, "Project deleted successfully"));
});

export {createProject,getProject,listProjects,updateProject,deleteProject}