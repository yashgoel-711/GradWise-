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
courseSchema.methods.GetInfoCourseDetails = async function(id){
  if(!id){
    throw new apiError(400,"give the  id of the student  course details") 
  }
  try {
    if(this.uploadedBy.toString() === id.toString()){
      return {"courseLink":this.courseLink,"title":this.title,"platform":this.platform,"difficulty":this.difficulty,"duration":this.duration,"summary":this.summary,"tags":this.tags}
    }
    else{
      throw new apiError(403,"you are not allowed to see the course details because the id is not same")
    }
  } catch (error) {
    throw new apiError(500,"error in getting the course details")
    
  }
}
courseSchema.methods.GetUpdateCourseDetails = async function(id,body){
  if(!id){
    throw new apiError(400,"give the  id of the student  course details") 
  }
  try {
    if(this.uploadedBy.toString() === id.toString()){
      this.courseLink = body.courseLink || this.courseLink;
      this.title = body.title || this.title;
      this.platform = body.platform || this.platform;
      this.difficulty = body.difficulty || this.difficulty;
      this.duration = body.duration || this.duration;
      this.summary = body.summary || this.summary;
      this.tags = body.tags || this.tags;
      await this.save()
      return {"courseLink":this.courseLink,"title":this.title,"platform":this.platform,"difficulty":this.difficulty,"duration":this.duration,"summary":this.summary,"tags":this.tags}
    }
    else{
      throw new apiError(403,"you are not allowed to see the course details because the id is not same")
    }
  } catch (error) {
    throw new apiError(500,"error in getting the course details")
    
  }
}

export const Course = mongoose.model("Course",courseSchema)