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
        // fs.unlinkSync(localFilePath)
        //file uploaded succesfully
        console.log("File is uploaded on cloudinary", response.url)
        return response
    } catch (error) {
        console.log("Failed to upload file to cloudinary", error)
    }

    if(!existsSync(localFilePath)){
        fs.unlinkSync(localFilePath)
    }
    return null
}

export{uploadOnCloudniary}