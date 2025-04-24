import mongoose from "mongoose";
import { apiError } from "../utils/apiError.utils";
import { upload } from "../middlewares/multer.middleware";
const roadmapSchema = new mongoose.Schema({
    task:[{
        type:String,

    }],
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student' 
    },
})
roadmapSchema.methods.GetInfoRoadmapDetails = async function(id){
    if(!id){
        throw new apiError(400,"give the  id of the roadmap details")
    }
    const roadmap = await Roadmap.findById(id).populate("uploadedBy")
    if(!roadmap){
        throw new apiError(404,"No roadmap found with this id")
    }
    return roadmap
}
roadmapSchema.methods.UpdateTask = async function(id,taskmap){
    if(!taskmap){
        throw new apiError(400,"give the  taskmap of the roadmap details")
    }
    const roadmap = await Roadmap.findByIdAndUpdate(id,{task:taskmap
        
    },{new:true})
    if(!roadmap){
        throw new apiError(404,"No roadmap found with this id")
    }
    return roadmap
}
const Roadmap = mongoose.model("Roadmap",roadmapSchema)