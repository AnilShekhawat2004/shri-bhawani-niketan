const courseCategory = require("../models/courseCategory");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const User = require("../models/User");
const CategoryProgram = require("../models/CategoryProgram");
const Course = require("../models/Course");

require("dotenv").config();

exports.createCategory = async (req, res) => {
  try {
    const {
      name,
      description,
      categoryProgram,
      courseName,
      courseDescription,
      duration,
      fees,
      semesterFees,
      instructorName,
    } = req.body;
    const image = req.files.thumbnailImage;

    if (
      !name ||
      !description ||
      !image ||
      !categoryProgram ||
      !courseName ||
      !courseDescription ||
      !duration ||
      !fees ||
      !semesterFees ||
      !instructorName
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required to create course",
      });
    }

    let parsedFees = fees;
    let parsedSemesterFees = semesterFees;

    if (typeof fees === "string") parsedFees = JSON.parse(fees);
    if (typeof semesterFees === "string")
      parsedSemesterFees = JSON.parse(semesterFees);

    const programDetails = await CategoryProgram.findById(categoryProgram);
    if (!programDetails) {
      return res.status(404).json({
        success: false,
        message: "Course category does not exist",
      });
    }

    const thumbnailImage = await uploadImageToCloudinary(
      image,
      process.env.FOLDER_NAME,
    );

    const newCategorysDetails = await courseCategory.create({
      name: name,
      description: description,
      image: thumbnailImage.secure_url,
      categoryProgram: programDetails._id,
    });

    await CategoryProgram.findByIdAndUpdate(
      {
        _id: categoryProgram,
      },
      {
        $push: {
          category: newCategorysDetails._id,
        },
      },
      { new: true },
    );

    const newCourse = await Course.create({
      courseName: courseName,
      courseDescription: courseDescription,
      duration: duration,
      fees: parsedFees,
      semesterFees: parsedSemesterFees,
      instructorName: instructorName,
      category: newCategorysDetails._id,
    });

    const updatedCategoryCourse = await courseCategory
      .findByIdAndUpdate(
        { _id: newCategorysDetails._id },
        {
          $push: {
            courses: newCourse._id,
          },
        },
        { new: true },
      )
      .populate("courses");

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: updatedCategoryCourse,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.editCategory = async (req, res) => {
  try {
    const { courseCategoryId, courseId, fees, semesterFees, duration } =
      req.body;
    const category = await courseCategory.findById(courseCategoryId);
    const course = await Course.findById(courseId);

    if (!category || !course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const courseCategoryField = ["name", "description", "categoryProgram"];

    courseCategoryField.forEach((field) => {
      if (req.body[field] !== undefined) {
        category[field] = req.body[field];
      }
    });

    if (req.files) {
      const image = req.files.thumbnailImage;
      const thumbnailImage = await uploadImageToCloudinary(
        image,
        process.env.FOLDER_NAME,
      );
      category.image = thumbnailImage.secure_url;
    }

    const courseField = ["courseName", "courseDescription", "instructorName"];

    courseField.forEach((field) => {
      if (req.body[field] !== undefined) {
        course[field] = req.body[field];
      }
    });

    if (duration !== undefined) {
      course.duration = duration;
    }

    if (fees !== undefined) {
      const parsedFees = typeof fees === "string" ? JSON.parse(fees) : fees;

      if (!Array.isArray(parsedFees)) {
        return res.status(400).json({
          success: false,
          message: "Fees must be an array",
        });
      }
      if (duration !== undefined && fees.length !== duration) {
        return res.status(400).json({
          success: false,
          message: "Fees array length must match course duration",
        });
      }
      course.fees = parsedFees;
    }

    if (semesterFees !== undefined) {
      const parsedSemesterFees =
        typeof semesterFees === "string"
          ? JSON.parse(semesterFees)
          : semesterFees;

      if (!Array.isArray(parsedSemesterFees)) {
        return res.status(400).json({
          success: false,
          message: "Semester fees must be an array",
        });
      }
      if (duration !== undefined && semesterFees.length !== duration) {
        return res.status(400).json({
          success: false,
          message: "Semester fees array length must match course duration",
        });
      }
      course.semesterFees = parsedSemesterFees;
    }

    await category.save();
    await course.save();

    const updatedCategory = await courseCategory
      .findOne({
        _id: courseCategoryId,
      })
      .populate({
        path: "categoryProgram",
      })
      .populate({
        path: "courses",
      })
      .exec();

    return res.status(200).json({
      success: true,
      message: "Course is Edited Successfully",
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

exports.showAllCategories = async (req, res) => {
  try {
    const allCategorys = await courseCategory.find({});
    res.status(200).json({
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

exports.deleteCategory = async (req, res) => {
  try {
    const { courseId } = req.body;

    //Find the category
    const category = await courseCategory.findById(courseId);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    if (category.categoryProgram?.length > 0) {
      for (const catId of category.categoryProgram) {
        await courseCategory.findByIdAndDelete(catId, {
          $pull: { category: courseId },
        });
      }
    }

    if (category.courses) {
      await Course.findByIdAndDelete(category.courses);
    }

    //Delete category
    await courseCategory.findByIdAndDelete(courseId);

    //return response
    return res.status(200).json({
      success: true,
      message: "Course Category deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getCourseCounts = async (req, res) => {
  try {
    const courseCount = await courseCategory.countDocuments();
    const categoryCount = await CategoryProgram.countDocuments();

    return res.status(200).json({
      success: true,
      data: {
        courseCount,
        categoryCount,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getCourseCategoryDetails = async (req, res) => {
  try {
    const { courseId } = req.body;
    const courseDetails = await courseCategory
      .findOne({
        _id: courseId,
      })
      .populate("courses")
      .populate("categoryProgram")
      .exec();

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Could not found course details",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Details fetched successfully",
      data: courseDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
