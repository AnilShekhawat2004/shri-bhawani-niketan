const Course = require("../models/Course");
const User = require("../models/User");
const Category = require("../models/courseCategory");

require("dotenv").config();

//Fucntion to create a course
exports.createCourse = async (req, res) => {
  try {
    //Fetch user id from request object
    const userId = req.user.id;

    //get all required fields from request body
    let {
      courseName,
      courseDescription,
      duration,
      fees,
      semesterFees,
      instructorName,
      category,
      status,
    } = req.body;

    //Validation
    if (
      !courseName ||
      !courseDescription ||
      !category ||
      !duration ||
      !instructorName
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required to create course",
      });
    }

    if (typeof fees === "string") {
      try {
        fees = JSON.parse(fees);
      } catch (err) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid fees format" });
      }
    }

    if (typeof semesterFees === "string") {
      try {
        semesterFees = JSON.parse(semesterFees);
      } catch (err) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid semesterFees format" });
      }
    }

    if (status) {
      if (status.toLowerCase() === "published") status = "Published";
      else if (status.toLowerCase() === "draft") status = "Draft";
    }

    if (!status || status == undefined) {
      status = "Draft";
    }

    //check if the user is Admin
    const adminDetails = await User.findById(userId);
    if (!adminDetails || adminDetails.accountType !== "Admin") {
      return res.status(404).json({
        success: false,
        message: "Only Admin can create a course",
      });
    }

    //Check the category is vaild or not
    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Categroy Details are not found",
      });
    }

    if (!Array.isArray(fees)) {
      fees = [fees];
    }

    if (!Array.isArray(semesterFees)) {
      semesterFees = [semesterFees];
    }

    const newCourse = await Course.create({
      courseName: courseName,
      courseDescription: courseDescription,
      duration: duration,
      status: status,
      fees,
      semesterFees,
      instructorName: instructorName,
      category: categoryDetails._id,
    });

    // Add the new course to the Categories
    await Category.findByIdAndUpdate(
      { _id: categoryDetails._id },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      data: newCourse,
      message: "Course Details Created Successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating a course",
    });
  }
};

//Edit Course
exports.editCourse = async (req, res) => {
  try {
    const {
      courseId,
      courseName,
      courseDescription,
      duration,
      fees,
      semesterFees,
      instructorName,
      status,
    } = req.body;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course Id not found",
      });
    }

    //update Course name
    if (courseName !== undefined) {
      course.courseName = courseName;
    }

    //update the course Decription
    if (courseDescription !== undefined) {
      course.courseDescription = courseDescription;
    }

    //updating the aboutJob of the course
    if (duration !== undefined) {
      course.duration = duration;
    }

    if (instructorName !== undefined) {
      course.instructorName = instructorName;
    }

    if (status !== undefined) {
      course.status = status;
    }

    if (fees !== undefined) {
      if (!Array.isArray(fees)) {
        return res
          .status(400)
          .json({ success: false, message: "Fees must be an array" });
      }
      if (duration !== undefined && fees.length !== duration) {
        return res.status(400).json({
          success: false,
          message: "Fees array length must match course duration",
        });
      }
      course.fees = fees;
    }

    if (semesterFees !== undefined) {
      if (!Array.isArray(semesterFees)) {
        return res
          .status(400)
          .json({ success: false, message: "Semester Fees must be an array" });
      }
      const count = (duration || course.duration) * 2; // use updated or existing duration
      if (semesterFees.length !== count) {
        return res.status(400).json({
          success: false,
          message: `Semester Fees must have ${count} entries`,
        });
      }
      course.semesterFees = semesterFees;
    }

    await course.save();

    const updatedCourse = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "category",
      })
      .exec();

    return res.status(200).json({
      success: true,
      message: "Course edited successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while editing the Course",
    });
  }
};

//Delete Course
exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    //Find the Course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    //Delete course
    await Course.findByIdAndDelete(courseId);

    return res.status(200).json({
      success: true,
      message: "Course Deleted Successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Soemthing went while deleting the course",
    });
  }
};

//Get All Course
exports.getAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find({ status: "Published" });

    return res.status(200).json({
      success: true,
      data: allCourses,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fecthing the all course detalis",
    });
  }
};

//Course Details
exports.getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;
    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate("category")
      .exec();

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: `Could not find the course with id: ${courseId}`,
      });
    }

    return res.status(200).json({
      success: true,
      data: courseDetails,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: true,
      message: error.message,
    });
  }
};

exports.getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;
    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate("category")
      .exec();

    return res.status(200).json({
      success: true,
      data: courseDetails,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
