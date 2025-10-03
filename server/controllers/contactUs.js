const { contactUsEmail } = require("../mail/templates/contactFormRes");
const mailSender = require("../utils/mailSender");
const contactUs = require("../models/contactUs");

require("dotenv").config();

exports.contactUs = async (req, res) => {
  try {
    //fetch data from req body
    const {
      firstName,
      lastName,
      email,
      subject,
      contactNumber,
      city,
      state,
      pincode,
      inquiry,
      countryCode,
    } = req.body;

    //validation
    if (
      !firstName ||
      !lastName ||
      !email ||
      !subject ||
      !contactNumber ||
      !city ||
      !state ||
      !pincode ||
      !inquiry ||
      !countryCode
    ) {
      return res.status(404).json({
        success: false,
        message: "All fields are required fill for contact us",
      });
    }

    //Save new inquiry to DB
    const newContact = await contactUs({
      firstName,
      lastName,
      email,
      subject,
      inquiry,
      contactNumber,
      city,
      state,
      pincode,
      countryCode,
    });

    await newContact.save();

    try {
      await mailSender(
        email,
        "Contact confirmation mail",
        contactUsEmail(
          `${firstName}`,
          `${lastName}`,
          `${email}`,
          `${subject}`,
          `${inquiry}`,
          `${contactNumber}`,
          `${city}`,
          `${state}`,
          `${pincode}`,
          `${countryCode}`
        )
      );
    } catch (error) {
      console.error("Error in sending mail", error);
    }
    //return response
    return res.status(200).json({
      success: true,
      message: "Email Sent Sucessfully",
      data: newContact,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.editContactUs = async (req, res) => {
  try {
    const { contactId, status } = req.body;

    const ContactUs = await contactUs.findById(contactId);

    if (!ContactUs) {
      return res.status(404).json({
        success: false,
        message: "Could not found Contact Id",
      });
    }

    if (status !== undefined) ContactUs.status = status;

    await ContactUs.save();

    const updatedContact = await contactUs.findById(contactId);

    return res.status(200).json({
      success: true,
      message: "Contact Details updated successfully",
      data: updatedContact,
    });
  } catch (error) {
    console.error("Error while changing contact details : ", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//get all contact us inquiry
exports.getAllContact = async (req, res) => {
  try {
    const allContact = await contactUs.find();

    if (!allContact || allContact.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No contacts found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "All contacts fetched successfully",
      data: allContact,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching the inquiries",
    });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const { contactId } = req.body;

    const contactUsDetails = await contactUs.findById(contactId);
    if (!contactUsDetails) {
      return res.status(404).json({
        success: false,
        message: "Contact ID not found",
      });
    }

    await contactUs.findByIdAndDelete(contactId);

    return res.status(200).json({
      success: true,
      message: "Contact details deleted successfully",
    });
  } catch (error) {
    console.error("Error while deleting the Contact Details:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getContactCounts = async (req, res) => {
  try {
    const ContactCount = await contactUs.countDocuments();

    const PendingContactCount = await contactUs.countDocuments({
      status: "Pending",
    });

    const ResolvedContactCount = await contactUs.countDocuments({
      status: "Resolved",
    });

    return res.status(200).json({
      success: true,
      data: {
        ContactCount,
        PendingContactCount,
        ResolvedContactCount,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getContactDetails = async (req, res) => {
  try {
    const { contactId } = req.body;
    const contactDetails = await contactUs.findOne({
      _id: contactId,
    });

    if (!contactDetails) {
      return res.status(404).json({
        success: false,
        message: "Could not found contact details",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Contact Details fetched successfully",
      data: contactDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getUnseenContact = async (req, res) => {
  try {
    const recentNotification = await contactUs.find().sort({ createdAt: -1 });
    const unseenCount = await contactUs.countDocuments({ seen: false });

    return res.status(200).json({
      success: true,
      message: "Count of contact notification",
      data: {
        recentNotification,
        unseenCount,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.MarkingSeenContact = async (req, res) => {
  try {
    const response = await contactUs.updateMany(
      { seen: false },
      { $set: { seen: true } }
    );

    return res.status(200).json({
      success: true,
      message: "Notification marked seen",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
