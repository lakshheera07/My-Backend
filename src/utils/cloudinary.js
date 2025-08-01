import {v2 as cloudinary} from 'cloudinary'
import fs, { existsSync } from "fs"

cloudinary.config({ 
        cloud_name: `${process.env.CLOUD_NAME}`, 
        api_key: `${process.env.CLOUDINARY_API_KEY}`, 
        api_secret: `${process.env.CLOUDINARY_API_SECRET}` 
    });


const uploadOnCloudniary = async (localFilePath) =>{
    try {
        if(!localFilePath) return null
        //upload file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        fs.unlinkSync(localFilePath)
        return response
    } catch (error) {
        console.log("Failed to upload file to cloudinary", error)
        fs.unlinkSync(localFilePath)
    }

    if(!existsSync(localFilePath)){
        fs.unlinkSync(localFilePath)
    }
    return null
}

export{uploadOnCloudniary}