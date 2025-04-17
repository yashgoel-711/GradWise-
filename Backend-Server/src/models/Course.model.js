import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({

  courseLink: {
    type: String,
    required: true
  },

  //AI will analyse the below fields
  title: String,
  platform: String, // YouTube, Coursera, Udemy, etc.
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced']
  },
  duration: String, // optional string like "4h 32min"
  summary: String, // AI-generated summary of the course
  tags: [String], // React, Web Dev, DSA, etc.

}, { timestamps: true });

export const Course = mongoose.model("Course",courseSchema)