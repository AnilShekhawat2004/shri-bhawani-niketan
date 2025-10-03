const teacherSection = require("../models/teacherSection");
const teachCategory = require("../models/teachCategory");
const teacherSubSection = require("../models/teacherSubSection");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

require("dotenv").config();

//function for create section
exports.createSection = async (req, res) => {
  try {
    let { name, designation, teachCat } = req.body;

    const image = req.files.thumbnailImage;

    //validation
    if (!name || !designation || !teachCat || !image) {
      return res.status(404).json({
        success: false,
        message: "All fields are required",
      });
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
      process.env.FOLDER_NAME
    );
    console.log(thumbnailImage);

    //cerate a new course with the given details
    const newSection = await teacherSection.create({
      name,
      designation,
      image: thumbnailImage.secure_url,
      teachCat: categoryDetails._id,
    });

    //Add the new Course to the categories
    const categoryDetails2 = await teachCategory.findByIdAndUpdate(
      { _id: teachCat },
      {
        $push: {
          Section: newSection._id,
        },
      },
      { new: true }
    );
    console.log(categoryDetails2);

    return res.status(200).json({
      success: true,
      message: "Section is Created Successfully",
      data: newSection,
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
    const { sectionId, name, designation } = req.body;
    const section = await teacherSection.findById(sectionId);

    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section id is not found",
      });
    }

    //update course name
    if (name !== undefined) {
      section.name = name;
    }

    if (designation !== undefined) {
      section.designation = designation;
    }

    //if thumbanil image is found, update it
    if (req.files) {
      console.log("image update");
      const image = req.files.thumbnailImage;
      const thumbnailImage = await uploadImageToCloudinary(
        image,
        process.env.FOLDER_NAME
      );
      if (thumbnailImage && thumbnailImage.secure_url) {
        section.image = thumbnailImage.secure_url;
      }
    }

    await section.save();

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
      message: "Section is edited successfully",
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
    await teacherSection.findByIdAndDelete(sectionId);

    if (section.SubSection) {
      await teacherSubSection.findByIdAndDelete(section.SubSection);
    }

    if (section.teachCat) {
      await teachCategory.findByIdAndUpdate(
        section.teachCat,
        {
          $pull: { Section: sectionId },
        },
        { new: true }
      );
    }

    return res.status(200).json({
      success: true,
      message: "Section and related SubSection are deleted successfully",
    });
  } catch (error) {
    console.log(error);
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
