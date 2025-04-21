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
      throw new apiError(400,"give the  id of the project details")
    }
  }
   

export const Project = mongoose.model("Project",projectSchema)