const { uploadImageToCloudinary } = require("../utils/imageUploader");
const User = require("../models/User");
const teachCategory = require("../models/teachCategory");

require("dotenv").config();

// Create Category
exports.createCategory = async (req, res) => {
  try {
    const { name, description, branch } = req.body;
    const userId = req.user.id;
    const image = req.files?.image;
    const landingImage = req.files?.landingImage; // <-- added this

    if (!name || !description || !image || !branch) {
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

    // Upload landingImage if exists
    let landingImageUrl = "";
    if (landingImage) {
      const uploadedLandingImage = await uploadImageToCloudinary(
        landingImage,
        process.env.FOLDER_NAME
      );
      landingImageUrl = uploadedLandingImage.secure_url;
    }

    // Create the category
    const CategorysDetails = await teachCategory.create({
      name: name,
      description: description,
      branch: branch,
      image: imageCategory.secure_url,
      landingImage: landingImageUrl, // <-- added this
    });

    await User.findByIdAndUpdate(
      { _id: userId },
      {
        $push: { teachCat: CategorysDetails._id },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Teacher Category Created Successfully",
      data: CategorysDetails,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Edit Category
exports.editCategory = async (req, res) => {
  try {
    const { categoryId, name, description, branch } = req.body;
    const category = await teachCategory.findById(categoryId);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category ID not found",
      });
    }

    if (name !== undefined) category.name = name;
    if (description !== undefined) category.description = description;
    if (branch !== undefined) category.branch = branch;

    if (req.files) {
      // Update image if new image uploaded
      if (req.files.image) {
        const image = req.files.image;
        if (!image.tempFilePath) {
          return res.status(404).json({
            success: false,
            message: "Uploaded file is missing tempFilePath",
          });
        }
        const uploadedImage = await uploadImageToCloudinary(
          image,
          process.env.FOLDER_NAME
        );
        category.image = uploadedImage.secure_url;
      }

      // Update landingImage if new landingImage uploaded
      if (req.files.landingImage) {
        const landingImage = req.files.landingImage;
        if (!landingImage.tempFilePath) {
          return res.status(404).json({
            success: false,
            message: "Uploaded landing image is missing tempFilePath",
          });
        }
        const uploadedLandingImage = await uploadImageToCloudinary(
          landingImage,
          process.env.FOLDER_NAME
        );
        category.landingImage = uploadedLandingImage.secure_url;
      }
    }

    await category.save();

    const updatedCategory = await teachCategory
      .findOne({
        _id: categoryId,
      })
      .populate({ path: "Section" })
      .exec();

    return res.status(200).json({
      success: true,
      message: "Teacher Category is edited successfully",
      data: updatedCategory,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Show All Categories
exports.showAllCategories = async (req, res) => {
  try {
    const allCategorys = await teachCategory.find({});
    return res.status(200).json({
      success: true,
      data: allCategorys,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Category
exports.deleteCategory = async (req, res) => {
  try {
    const { teachCategoryId } = req.body;

    const category = await teachCategory.findById(teachCategoryId);
    if (!category) {
      return res.status(200).json({
        success: false,
        message: "Teach Category not found",
      });
    }

    await teachCategory.findByIdAndDelete(teachCategoryId);

    return res.status(200).json({
      success: true,
      message: "Teach Category Deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Category Page Details
exports.categoryPageDetails = async (req, res) => {
  try {
    const { teachCategoryId } = req.body;

    if (!teachCategoryId) {
      return res.status(404).json({
        success: false,
        message: "Category ID is required",
      });
    }

    const selectedCategory = await teachCategory
      .findById(teachCategoryId)
      .populate({
        path: "Section",
        model: "teacherSection",
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
        !selectedCategory.Section || selectedCategory.Section.length === 0
          ? "No Teacher found for this category, but category details are returned."
          : "Teacher Category details retrieved successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
