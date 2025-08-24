const courseCategory = require("../models/courseCategory");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const User = require("../models/User");
const CategoryProgram = require("../models/CategoryProgram")
const Course = require("../models/Course")

require('dotenv').config();

function getRandomInt(max){
    return Math.floor(Math.random() * max)
}

exports.createCategory = async(req, res) => {
    try{
        const{ name, description, catProgramId} = req.body;
        const image = req.files.thumbnailImage;
        const userId = req.user.id;

        if(!name || !description || !image || !catProgramId){
            return res.status(404).json({
                success:false,
                message:"All fields are required to create Category for course",
            })
        }

        const adminDetails = await User.findById(userId,{
            accountType:"Admin",
        })

        if(!adminDetails){
            return res.status(404).json({
                success: false,
                message: "Admin details are not found",
            })
        }

        const programDetails = await CategoryProgram.findById(catProgramId)
        if(!programDetails){
            return res.status(404).json({
                success: false,
                message: "Category Program does not exist",
            })
        }

        const thumbnailImage = await uploadImageToCloudinary(
            image,
            process.env.FOLDER_NAME
        )
        console.log(thumbnailImage);

        const CategorysDetails = await courseCategory.create({
            name: name,
            description: description,
            image: thumbnailImage.secure_url,
            categoryProgram: programDetails._id 
        });

        await CategoryProgram.findByIdAndUpdate(
            {
                _id: catProgramId,
            },
            {
                $push:{
                    category: CategorysDetails._id
                },
            },
            {new: true},
        )
        return res.status(200).json({
            success:true,
            message:"Category created successfully",
            data: CategorysDetails,
        })
    }catch(error){
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Something went wrong while creating the category"
        })
    }
}

exports.editCategory = async(req, res) => {
    try{
        const {categoryId, name, description} = req.body
        const category = await courseCategory.findById(categoryId);

        if(!category){
            return res.status(404).json({
                success: false,
                message:"Category id is not found",
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
            console.log("Image Update")
            const image = req.files.thumbnailImage
            const thumbnailImage = await uploadImageToCloudinary(
                image,
                process.env.FOLDER_NAME
            )
            category.image = thumbnailImage.secure_url
        }

        await category.save();

        const updatedCategory = await courseCategory.findOne({
            _id: categoryId
        })
        .populate({
            path: "courses"
        }).populate({
            path: "categoryProgram"
        })
        .exec()

        return res.status(200).json({
            success: true,
            message: "Course Category is Edited Successfully",
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
        const allCategorys = await courseCategory.find({});
        res.status(200).json({
            success:true,
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

exports.categoryPageDetails = async (req, res) => {
    try {
        const { categoryId } = req.body;

        if (!categoryId) {
            return res.status(400).json({
                success: false,
                message: "Category ID is required",
            });
        }

        // Find the selected category and populate courses
        const selectedCategory = await courseCategory.findById(categoryId)
            .populate({
                path: "courses",
                model: "Course", // Ensure correct reference to Course model
            })
            .populate({
                path: "categoryProgram"
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
            message: selectedCategory.courses.length === 0
                ? "No courses found for this category, but category details are returned."
                : "Category details retrieved successfully.",
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

exports.deleteCategory = async(req, res) => {
    try{
        const {courseCategoryId} = req.body;

        //Find the category
        const category = await courseCategory.findById(courseCategoryId)
        if(!category){
            return res.status(404).json({
                success: false,
                message: "Course Category not found",
            })
        }

        //Delete category
        await courseCategory.findByIdAndDelete(courseCategoryId)

        if(courseCategory.courses){
            await Course.findByIdAndDelete(courseCategory.courses)
        }

        if(courseCategory.categoryProgram){
            await CategoryProgram.findByIdAndUpdate(
                courseCategory.categoryProgram,
                {
                    $pull: { category: courseCategoryId }
                },
                {new: true}
            )
        }

        //return response
        return res.status(200).json({
            success: true,
            message: "Course Category deleted successfully",
        })
    }catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.getCourseCounts = async (req, res) => {
    try{
        const courseCount = await courseCategory.countDocuments()

        return res.status(200).json({
            success: true,
            data:{
                courseCount
            }
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}