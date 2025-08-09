const collegePhoto = require("../models/collegePhoto");
const {uploadImageToCloudinary} = require("../utils/imageUploader");
const imageCategory = require("../models/imageCategory");

require('dotenv').config();

//Function to add image
exports.addPhoto = async(req, res) => {
    try{
        const imageCatId = req.body.imageCategoryId; // ✅ Corrected this line
        //Get the image from request files
        const thumbnail = req.files?.thumbnailImage
        
        //valdiation
        if(!thumbnail || !imageCatId){
            return res.status(404).json({
                success: false,
                message: "Image not found",
            })
        }
        
        //check the category is Vaild or not
        const categoryDetails = await imageCategory.findById(imageCatId)
        if(!categoryDetails){
            return res.status(404).json({
                success: false,
                message: "Image Categroy Details are not found",
            })
        }

        //upload the thumbnail image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(
            thumbnail,
            process.env.FOLDER_NAME
        )
        console.log(thumbnailImage);
        
        //save into DB
        const newImage = await collegePhoto.create({
            thumbnail: thumbnailImage.secure_url,
            imageCategory: categoryDetails._id
        })

        const categoryDetails2 = await imageCategory.findByIdAndUpdate(
            {_id: imageCatId},
            {
                $push: {
                    collegePhoto: newImage._id,
                },
            },
            {new:true}
        )
        console.log(categoryDetails2);
        //return response 
        return res.status(200).json({
            success:true,
            message:"Image add successfully",
            data: newImage,
        })
    }catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

//Delete image
exports.deletePhoto = async (req, res) => {
    try {
        const { photoId } = req.body;

        // Find the image
        const image = await collegePhoto.findById(photoId);
        if (!image) {
            return res.status(404).json({
                success: false,
                message: "Image not found",
            });
        }

        // Delete the image from collegePhoto collection
        await collegePhoto.findByIdAndDelete(photoId);

        // Remove the photoId from imageCategory
        await imageCategory.findOneAndUpdate(
            { collegePhoto: photoId }, // Find the category containing this photo
            { $pull: { collegePhoto: photoId } }, // Remove photoId from the array
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Image deleted successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


exports.getAllPhotos = async(req, res) => {
    try{
        const allImage = await collegePhoto.find({})

        return res.status(200).json({
            success: true,
            message:"All image is fetched successfully",
            data: allImage,
        })
    }catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}