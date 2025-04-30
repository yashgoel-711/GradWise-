import { Course } from "../models/Course.model.js";
import { asyncAwaitHandler } from "../utils/asyncAwaitHandler.utils.js";
import { apiError } from "../utils/apiError.utils.js";
import { apiResponse } from "../utils/apiResponse.utils.js";

/**
 * Create a new course
 */
const createCourse = asyncAwaitHandler(async (req, res) => {
  const { courseLink, title, platform, difficulty, duration, summary, tags } = req.body;

  // Validate required fields
  if (
    [courseLink, title, platform, difficulty].some(
      (field) => typeof field !== "string" || field.trim() === ""
    ) ||
    !Array.isArray(tags) || tags.length === 0
  ) {
    throw new apiError(400, "Must pass valid course details");
  }

  // Create course
  const createdCourse = await Course.create({
    courseLink,
    title,
    platform,
    difficulty,
    duration,
    summary,
    tags,
    uploadedBy: req.student._id, // Make sure auth middleware sets req.user
  });

  if (!createdCourse) {
    throw new apiError(500, "Error while creating course");
  }

  return res.status(201).json(
    new apiResponse(201, createdCourse, "Course created successfully")
  );
});

/**
 * Get all courses uploaded by a specific student
 */
const getCourse = asyncAwaitHandler(async (req, res) => {
    const studentId = req.user?._id || req.student?._id; // depends on your auth middleware
    if (!studentId) {
      throw new apiError(400, "Student ID missing in request");
    }
  
    const courses = await Course.find({ uploadedBy: studentId });
  
    if (!courses || courses.length === 0) {
      throw new apiError(404, "No courses found");
    }
  
    return res.status(200).json(
      new apiResponse(200, courses, "Course details retrieved successfully")
    );
  });
  

export { createCourse, getCourse };
