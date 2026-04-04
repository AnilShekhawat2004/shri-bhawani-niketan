const teacherSection = require("../models/teacherSection");
const teachCategory = require("../models/teachCategory");
const teacherSubSection = require("../models/teacherSubSection");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

require("dotenv").config();

// function for create section
exports.createSection = async (req, res) => {
  try {
    let {
      name,
      designation,
      teachCat,
      contactNumber,
      email,
      startingYear,
      experience,
      educationHistory,
      strengths,
      hobbies,
      professionalHistory,
      love,
    } = req.body;

    const image = req.files?.thumbnailImage;

    //validation
    if (
      !name ||
      !designation ||
      !teachCat ||
      !image ||
      !contactNumber ||
      !email ||
      !startingYear ||
      !experience ||
      !love
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (typeof educationHistory === "string") {
      try {
        educationHistory = JSON.parse(educationHistory);
      } catch (err) {
        return res.status(400).json({
          success: false,
          message: "Invalid Education history format",
        });
      }
    }

    if (typeof strengths === "string") {
      try {
        strengths = JSON.parse(strengths);
      } catch (err) {
        return res.status(400).json({
          success: false,
          message: "strengths are required",
        });
      }
    }

    if (typeof hobbies === "string") {
      try {
        hobbies = JSON.parse(hobbies);
      } catch (err) {
        return res.status(400).json({
          success: false,
          message: "hobbies are required",
        });
      }
    }

    if (typeof professionalHistory === "string") {
      try {
        professionalHistory = JSON.parse(professionalHistory);
      } catch (err) {
        return res.status(400).json({
          success: false,
          message: "Invalid Professional history format",
        });
      }
    }

    //check the teach category is valid or not
    const categoryDetails = await teachCategory.findById(teachCat);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Teach Category not found",
      });
    }

    //upload the thumbnail image to cloudinary
    const thumbnailImage = await uploadImageToCloudinary(
      image,
      process.env.FOLDER_NAME,
    );

    //cerate a new course with the given details
    const newSection = await teacherSection.create({
      name,
      designation,
      image: thumbnailImage.secure_url,
      teachCat: categoryDetails._id,
    });

    //Add the new Course to the categories
    await teachCategory.findByIdAndUpdate(
      { _id: teachCat },
      {
        $push: {
          Section: newSection._id,
        },
      },
      { new: true },
    );

    const newSubSection = await teacherSubSection.create({
      contactNumber: contactNumber,
      email: email,
      startingYear: startingYear,
      experience: experience,
      educationHistory: educationHistory,
      strengths: strengths,
      hobbies: hobbies,
      professionalHistory: professionalHistory,
      love: love,
      teacherSection: newSection._id,
    });

    const updatedSection = await teacherSection
      .findByIdAndUpdate(
        { _id: newSection._id },
        {
          $push: {
            SubSection: newSubSection._id,
          },
        },
        { new: true },
      )
      .populate("SubSection");

    return res.status(201).json({
      success: true,
      message: "Section is Created Successfully",
      data: updatedSection,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.editSection = async (req, res) => {
  try {
    const {
      sectionId,
      subSectionId,
      educationHistory,
      strengths,
      hobbies,
      professionalHistory,
    } = req.body;
    const section = await teacherSection.findById(sectionId);
    const subSection = await teacherSubSection.findById(subSectionId);

    if (!section || !subSection) {
      return res.status(404).json({
        success: false,
        message: "Faculty not found",
      });
    }

    const sectionField = ["name", "designation", "teachCat"];

    sectionField.forEach((field) => {
      if (req.body[field] !== undefined) {
        section[field] = req.body[field];
      }
    });

    //if thumbanil image is found, update it
    if (req.files) {
      const image = req.files?.thumbnailImage;
      const thumbnailImage = await uploadImageToCloudinary(
        image,
        process.env.FOLDER_NAME,
      );
      if (thumbnailImage && thumbnailImage?.secure_url) {
        section.image = thumbnailImage?.secure_url;
      }
    }

    const subSectionField = [
      "contactNumber",
      "email",
      "startingYear",
      "experience",
      "love",
    ];

    subSectionField.forEach((field) => {
      if (req.body[field] !== undefined) {
        subSection[field] = req.body[field];
      }
    });

    if (educationHistory !== undefined) {
      const parsedEducation =
        typeof educationHistory === "string"
          ? JSON.parse(educationHistory)
          : educationHistory;

      if (!Array.isArray(parsedEducation)) {
        return res.status(400).json({
          success: false,
          message: "Education history must be an array",
        });
      }

      subSection.educationHistory = parsedEducation;
    }

    if (strengths !== undefined) {
      const parsedStrength =
        typeof strengths === "string" ? JSON.parse(strengths) : strengths;

      if (!Array.isArray(parsedStrength)) {
        return res.status(400).json({
          success: false,
          message: "Strengths must be an array",
        });
      }

      subSection.strengths = parsedStrength;
    }

    if (hobbies !== undefined) {
      const parsedHobbies =
        typeof hobbies === "string" ? JSON.parse(hobbies) : hobbies;

      if (!Array.isArray(parsedHobbies)) {
        return res.status(400).json({
          success: false,
          message: "Hobbies must be an array",
        });
      }

      subSection.hobbies = parsedHobbies;
    }

    if (professionalHistory !== undefined) {
      const parsedProfession =
        typeof professionalHistory === "string"
          ? JSON.parse(professionalHistory)
          : professionalHistory;

      if (!Array.isArray(parsedProfession)) {
        return res.status(400).json({
          success: false,
          message: "Professional history must be an array",
        });
      }

      subSection.professionalHistory = parsedProfession;
    }

    await section.save();
    await subSection.save();

    const updatedSection = await teacherSection
      .findOne({
        _id: sectionId,
      })
      .populate({
        path: "teachCat",
      })
      .populate({
        path: "SubSection",
      })
      .exec();

    return res.status(200).json({
      success: true,
      message: "Faculty is edited successfully",
      data: updatedSection,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllSection = async (req, res) => {
  try {
    const allSection = await teacherSection
      .find()
      .select("name designation image teachCat");

    return res.status(200).json({
      success: true,
      data: allSection,
    });
  } catch {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    const { sectionId } = req.body;

    //Find the section
    const section = await teacherSection.findById(sectionId);
    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    //Delete the Section
    if (section.teachCat?.length > 0) {
      for (const catId of section.teachCat) {
        await teachCategory.findByIdAndUpdate(catId, {
          $pull: { Section: sectionId },
        });
      }
    }

    if (section.SubSection) {
      await teacherSubSection.findByIdAndDelete(section.SubSection);
    }

    await teacherSection.findByIdAndDelete(sectionId);

    return res.status(200).json({
      success: true,
      message: "Section deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getCounts = async (req, res) => {
  try {
    const teacherSectionCount = await teacherSection.countDocuments();
    const teachCategoryCount = await teachCategory.countDocuments();

    return res.status(200).json({
      success: true,
      data: {
        teacherSectionCount,
        teachCategoryCount,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getTeachDetails = async (req, res) => {
  try {
    const { teachId } = req.body;
    const teachDetails = await teacherSection
      .findOne({
        _id: teachId,
      })
      .populate("SubSection")
      .populate("teachCat")
      .exec();

    if (!teachDetails) {
      return res.status(404).json({
        success: false,
        message: "Could not found teacher details",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Details fetched successfully",
      data: teachDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
