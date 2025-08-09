const { uploadImageToCloudinary } = require("../utils/imageUploader");
const User = require("../models/User")
const CategoryProgram = require("../models/CategoryProgram")

require('dotenv').config();

exports.createCatProgram = async(req, res) => {
    try{
        const {name, description} = req.body;
        const userId = req.user.id;
        const image = req.files?.image;
        
        if (!name || !description || !image) {
            return res.status(404).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Check if the user is admin
        const adminDetails = await User.findById(userId, {
            accountType: "Admin",
        });
        
        if (!adminDetails) {
            return res.status(404).json({
                success: false,
                message: "Admin Details are not found",
            });
        }

        // Upload main image
        const imageCategory = await uploadImageToCloudinary(
            image,
            process.env.FOLDER_NAME
        );

        const programDetails = await CategoryProgram.create({
            name: name,
            description: description,
            image: imageCategory.secure_url
        })

        await User.findByIdAndUpdate(
            { _id: userId },
            {
                $push: { courseCatPro: programDetails._id },
            },
            { new: true },
        );

        return res.status(200).json({
            success: true,
            message: "Category Program created Successfully",
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while creating the Catgory Program",
        })
    }
}

exports.editCatProgram = async(req, res) => {
    try{
        const { catProgramId, name, description } = req.body
        const catProgram = await CategoryProgram.findById(catProgramId)

        if(!catProgram){
            return res.status(404).json({
                success: false,
                message: "Category Program id is not found",
            })
        }

        if (name !== undefined) catProgram.name = name;
        if (description !== undefined) catProgram.description = description;

        if (req.files) {
        // Update image if new image uploaded
        if (req.files.image) {
            const image = req.files.image;
            if (!image.tempFilePath) {
                return res.status(400).json({
                    success: false,
                    message: "Uploaded file is missing tempFilePath",
                });
            }
            const uploadedImage = await uploadImageToCloudinary(
                image,
                process.env.FOLDER_NAME
            );
            catProgram.image = uploadedImage.secure_url;
        }

        await catProgram.save();

        const updatedCatProgram = await CategoryProgram.findOne({
            _id: catProgramId
        })
            .populate({ path: "category" })
            .exec();

        return res.status(200).json({
            success: true,
            message: "Category Program is edited successfully",
        });
    }
  }catch(error){
    console.log(error)
    return res.status(500).json({
        success: false,
        message: "Something went wrong while editing the Category Program"
    })
  }
}

exports.showAllCategoryProgram = async (req, res) => {
    try {
        const allCategoryPrograms = await CategoryProgram.find({});
        return res.status(200).json({
            success: true,
            message: "Category fetched successfully",
            data: allCategoryPrograms,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.deleteCatProgram = async (req, res) => {
    try {
        const { catProgramId } = req.body;

        const category = await CategoryProgram.findById(catProgramId);
        if (!category) {
            return res.status(200).json({
                success: false,
                message: "Category program not found",
            });
        }

        await CategoryProgram.findByIdAndDelete(catProgramId);

        return res.status(200).json({
            success: true,
            message: "Category Deleted successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};