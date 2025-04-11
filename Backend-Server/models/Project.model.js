import mongoose from "mongoose";

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

export const Project = mongoose.model("Project",projectSchema)