import mongoose from "mongoose";
import { apiError } from "../utils/apiError.utils";

const projectSchema = new mongoose.Schema({

    githubRepo: { 
        type: String,
        required: true
    },
    
    // AI will analyse the below things 

    status: {
      type: String,
      enum: ['Incomplete', 'In Progress', 'Completed'],
      default: 'In Progress'
    },

    summary: String, 
    techStack: [String],
    domain: String, // e.g., 'Web', 'AI', 'Backend'

    uploadedBy: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student' 
    }

  }, { timestamps: true });

  projectSchema.methods.GetInfoProjectDetails = async function(id){
    if(!id){
      throw new apiError(400,"give the  id of the student  project details") 
    }
    try {
      if(this.uploadedBy.toString() === id.toString()){
        return {"githubRepo":this.githubRepo,"status":this.status,"summary":this.summary,"techStack":this.techStack,"domain":this.domain}
      }
      else{
        throw new apiError(403,"you are not allowed to see the project details because the id is not same")
      }
    } catch (error) {
      throw new apiError(500,"error in getting the project details")
      
    }
  }
  projectSchema.methods.GetUpdateProjectDetails = async function(id,body){
    if(!id){
      throw new apiError(400,"give the  id of the student  project details") 
    }
    try {
      if(this.uploadedBy.toString() === id.toString()){
        this.githubRepo = body.githubRepo || this.githubRepo;
        this.status = body.status || this.status;
        this.summary = body.summary || this.summary;
        this.techStack = body.techStack || this.techStack;
        this.domain = body.domain || this.domain;
        await this.save()
        return {"githubRepo":this.githubRepo,"status":this.status,"summary":this.summary,"techStack":this.techStack,"domain":this.domain}
      }
      else{
        throw new apiError(403,"you are not allowed to see the project details because the id is not same")
      }
    } catch (error) {
      throw new apiError(500,"error in getting the project details")
      
    }
  }
  

export const Project = mongoose.model("Project",projectSchema)