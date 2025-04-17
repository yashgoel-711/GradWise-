import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY , 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});



const uploadOnCloudinary = async (localFilePath)=>{

    try {        
        if(!localFilePath) return null;
    
        const uploadResult = await cloudinary.uploader.upload(localFilePath , {resource_type : "auto"})
        
        fs.unlinkSync(localFilePath)
        return uploadResult;
    } catch (error) {
        fs.unlinkSync(localFilePath)
        console.log(error);
        return null
    }



}

const deleteUploadOnCloudinary = async(fileUrl)=>{
    try {
        if(!fileUrl){
            return null;
        }
        const publicId = fileUrl.split("/").pop().split(".")[0];
        const deleteResult = await cloudinary.uploader.destroy(publicId)
        return deleteResult;

    } catch (error) {        
        console.log("Error occured while deleting old file on cloudinary",error)
        return null;
    }
}

export{uploadOnCloudinary,deleteUploadOnCloudinary}