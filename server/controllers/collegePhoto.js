const collegePhoto = require("../models/collegePhoto");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const ImagePhotoCategory = require("../models/imageCategory");

require("dotenv").config();

//Function to add image
exports.addPhoto = async (req, res) => {
  try {
    const { name, imageCategory } = req.body;
    // const imageCategory = req.body.imageCategoryId; // ✅ Corrected this line
    const thumbnail = req.files?.thumbnailImage;

    //valdiation
    if (!name || !thumbnail || !imageCategory) {
      return res.status(404).json({
        success: false,
        message: "Details not found",
      });
    }

    //check the category is Vaild or not
    const categoryDetails = await ImagePhotoCategory.findById(imageCategory);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Image Categroy Details are not found",
      });
    }

    //upload the thumbnail image to cloudinary
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );
    console.log(thumbnailImage);

    //save into DB
    const newImage = await collegePhoto.create({
      name: name,
      thumbnail: thumbnailImage.secure_url,
      imageCategory: categoryDetails._id,
    });

    const categoryDetails2 = await ImagePhotoCategory.findByIdAndUpdate(
      { _id: imageCategory },
      {
        $push: {
          collegePhoto: newImage._id,
        },
      },
      { new: true }
    );
    console.log(categoryDetails2);
    //return response
    return res.status(200).json({
      success: true,
      message: "Image add successfully",
      data: newImage,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.editPhoto = async (req, res) => {
  try {
    const { photoId, name } = req.body;
    const Photo = await collegePhoto.findById(photoId);

    if (!Photo) {
      return res.status(404).json({
        success: false,
        message: "Photo id is not found",
      });
    }

    if (name !== undefined) {
      Photo.name = name;
    }

    if (req.files) {
      console.log("Image update");
      const thumbnail = req.files.thumbnailImage;
      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      );
      if (thumbnailImage && thumbnailImage.secure_url) {
        Photo.thumbnail = thumbnailImage.secure_url;
      }
    }

    await Photo.save();

    const updatedPhoto = await collegePhoto
      .findOne({
        _id: photoId,
      })
      .populate({
        path: "imageCategory",
      })
      .exec();

    return res.status(200).json({
      success: true,
      message: "College Photo updated successfully",
      data: updatedPhoto,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Delete image
exports.deletePhoto = async (req, res) => {
  try {
    const { photoId } = req.body;
    // Find the image
    const image = await collegePhoto.findById(photoId);
    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image id not found",
      });
    }

    // Delete the image from collegePhoto collection
    await collegePhoto.findByIdAndDelete(photoId);

    // Remove the photoId from imageCategory
    await ImagePhotoCategory.findOneAndUpdate(
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

exports.getAllPhotos = async (req, res) => {
  try {
    const allImage = await collegePhoto.find({});

    return res.status(200).json({
      success: true,
      message: "All image is fetched successfully",
      data: allImage,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getPhotosCount = async (req, res) => {
  try {
    const photoCount = await collegePhoto.countDocuments();
    const imageCategoryCount = await ImagePhotoCategory.countDocuments();

    return res.status(200).json({
      success: true,
      data: {
        photoCount,
        imageCategoryCount,
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

exports.getPhotosDetails = async (req, res) => {
  try {
    const { photoId } = req.body;
    const PhotoDetails = await collegePhoto
      .findOne({
        _id: photoId,
      })
      .populate("imageCategory")
      .exec();

    if (!PhotoDetails) {
      return res.status(404).json({
        success: false,
        message: "Could not found college photos details",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Details fetched successfully",
      data: PhotoDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
