import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudniary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const registerUser = asyncHandler( async(req,res) =>{
    // get user details from frontend
    // validate data - not empty
    // check if user exist in database - username,email
    // check for images
    // check for avatar
    // upload to cloudinary , avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return response
    const {fullName, email, username, password} = req.body
    // console.log("email:", email)
    // console.log("fullName:", fullName)
    // console.log("password:", password)
    // console.log("username:", username)


    // if(fullName === ""){
    //     throw new ApiError(400,"fullName is required")
    // }

    if(
        [username,fullName,email,password].some((field) => field?.trim() ==="")
    ){
        throw new ApiError(400,"All fields are required")
    }

    

    const existedUser = await User.findOne({
        $or:[{ username } , { email }]
    })

    if(existedUser){
        throw new ApiError(409, "User with email or username already exist")
    }
    const avatarAtLocalPath = req.files?.avatar[0]?.path
    // console.log(avatarAtLocalPath)
    // const coverImageLocalPath = req.files?.coverImage[0]?.path

    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length >0){
        coverImageLocalPath = req.files.coverImage[0].path
    }

    if(!avatarAtLocalPath){
        throw new ApiError(400,"Avatar is required")
    }

    const avatar = await uploadOnCloudniary(avatarAtLocalPath)
    const coverImage = await uploadOnCloudniary(coverImageLocalPath)

    if(!avatar)
    {
        throw new ApiError(400,"Avatar is required")
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username:username.trim().toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering the user")
    }

    return res.status(200).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )

})

export {registerUser}