const imageCategory = require("../models/imageCategory");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

require("dotenv").config()

exports.createCategory = async(req, res) => {
    try{
        const {name, description} = req.body;
        const image = req.files?.image;
        const userId = req.user.id

        if(!name || !description || !image){
            return res.status(404).json({
                success: false,
                message: "All fields are required",
            })
        }

        const adminDetails = await User.findById(userId, {
            accountType: "Admin",
        })

        if(!adminDetails){
            return res.status(404).json({
                success: false,
                message: "Admin Details are not found",
            })
        }

        const imageCat = await uploadImageToCloudinary(
            image,
            process.env.FOLDER_NAME
        )
        console.log(imageCat);

        const CategorysDetails = await imageCategory.create({
            name:name,
            description: description,
            image: imageCat.secure_url,
        })

        await User.findByIdAndUpdate(
            {
                _id: userId,
            },
            {
                $push: {
                    imageCat: CategorysDetails._id
                },
            },
            {new: true},
        )
        return res.status(200).json({
            success:true,
            message:"Image Category created successfully",
            data: CategorysDetails,
        })
    }catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.editCategory = async(req, res) => {
    try{
        const {categoryId, name, description} = req.body
        const category = await imageCategory.findById(categoryId)

        if(!category){
            return res.status(404).json({
                success: false,
                message: "Category id not found",
            })
        }

        //update the name 
        if(name !== undefined){
            category.name = name
        }

        if(description !== undefined){
            category.description = description
        }

        if(req.files){
            console.log("image update")
                const image = req.files.thumbnailImage
                const thumbnailImage = await uploadImageToCloudinary(
                    image,
                    process.env.FOLDER_NAME
                )
            category.image = thumbnailImage.secure_url
        }

        await category.save();

        
        const updatedCategory = await imageCategory.findOne({
            _id: categoryId
        })
        .populate({
            path: "collegePhoto"
        })
        .exec()
        
        return res.status(200).json({
            success: true,
            message: "Teacher Category is Edited successfully",
            data: updatedCategory,
        })
    }catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.showAllCategories = async(req, res) => {
    try{
        const allCategorys = await imageCategory.find({});
        res.status(200).json({
            success: true,
            data: allCategorys,
        });
    }catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.deleteCategory = async(req, res) => {
    try{
        const {imageCategoryId} = req.body;

        //Find the category
        const category = await imageCategory.findById(imageCategoryId)
        if(!category){
            return res.status(404).json({
                success: false,
                message: "Image Category not found",
            })
        }

        //Delete category
        await imageCategory.findByIdAndDelete(imageCategoryId)

        //return response
        return res.status(200).json({
            success: true,
            message: "Image Category deleted successfully",
        })
    }catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.categoryPageDetails = async (req, res) => {
    try {
        const { imageCategoryId } = req.body;

        if (!imageCategoryId) {
            return res.status(400).json({
                success: false,
                message: "Category ID is required",
            });
        }

        const selectedCategory = await imageCategory
            .findById(imageCategoryId)
            .populate({
                path: "collegePhoto",
                model: "collegePhoto",
            })
            .exec();

        if (!selectedCategory) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        console.log("Fetched Category:", selectedCategory);

        return res.status(200).json({
            success: true,
            data: {
                selectedCategory,
            },
            message:
                !selectedCategory.collegePhoto || selectedCategory.collegePhoto.length === 0
                    ? "No photos found for this category, but category details are returned."
                    : "Image Category details retrieved successfully.",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
}