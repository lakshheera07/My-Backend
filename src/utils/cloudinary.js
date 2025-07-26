import {v2 as cloudinary} from 'cloudinary'
import fs from "fs"

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

        //file uploaded succesfully
        console.log("File is uploaded on cloudinary", response.url)
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath)  // remove the local file from server as upload operation failed
        return null
    }
}

export{uploadOnCloudniary}