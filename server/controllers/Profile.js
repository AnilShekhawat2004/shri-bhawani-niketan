const Profile = require("../models/Profile")
const User = require("../models/User");
const {uploadImageToCloudinary} = require("../utils/imageUploader");

require("dotenv").config()

//method for updating profile
exports.updateProfile = async(req, res) => {
    try{
        const{
            firstName = "",
            lastName = "",
            about = "",
            contactNumber = "",
        } = req.body;
    
        const id = req.user.id;
    
        //find the profile by id
        const userDetails = await User.findById(id);
        const profile = await Profile.findById(userDetails.additionalDetails);
    
        const user = await User.findByIdAndUpdate(id, {
            firstName,
            lastName,
        });
        await user.save();
    
        //Update Profile fields
        profile.about = about
        profile.contactNumber = contactNumber
    
        //save the updated profile
        await profile.save();
    
        //find the updated user Details
        const updatedUserDetails = await User.findById(id)
                                        .populate("additionalDetails")
                                        .exec()
    
        //return response
        return res.status(200).json({
            success: true,
            message:"Profile updated successfully",
            updatedUserDetails
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            error : error.message,
        })
    }
}

exports.getAllUserDetails = async(req, res) => {
    try{
        const id = req.user.id
        const userDetails = await User.findById(id)
                                  .populate("additionalDetails")
                                  .exec()

        console.log(userDetails)
        return res.status(200).json({
            success: true,
            message: "User data fetched successfully",
            data: userDetails,
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            error: error.message,
        })
    }
}

exports.updateDisplayPicture = async(req, res) => {
    try{
        const image = req.files.thumbnailImage
        const userId = req.user.id
        const thumbnailImage = await uploadImageToCloudinary(
            image,
            process.env.FOLDER_NAME,
            1000,
            1000
        )
        console.log(thumbnailImage)
        const updatedProfile = await User.findByIdAndUpdate(
            {_id: userId},
            {image: thumbnailImage.secure_url},
            {new: true}
        )

        return res.status(200).json({
            success: true,
            message:"Image Updated Successfully",
            data: updatedProfile,
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}