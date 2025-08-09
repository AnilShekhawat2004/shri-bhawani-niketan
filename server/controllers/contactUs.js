const {contactUsEmail} = require("../mail/templates/contactFormRes");
const mailSender = require("../utils/mailSender");
const contactUs = require("../models/contactUs");

require('dotenv').config();

exports.contactUs = async(req, res) => {
    try{
        //fetch data from req body
        const{firstName, lastName, email, contactNumber, city, state, pincode, inquiry, countryCode} = req.body

        //validation
        if( !firstName ||
            !lastName ||
            !email ||
            !contactNumber ||
            !city ||
            !state ||
            !pincode ||
            !inquiry ||
            !countryCode
        ){
            return res.status(404).json({
                success: false,
                message: "All fields are required fill for contact us",
            })
        }

        //Save new inquiry to DB
        const newContact = await contactUs({
            firstName,
            lastName,
            email,
            inquiry,
            contactNumber,
            city,
            state,
            pincode,
            countryCode,
        })

        await newContact.save();

        try{
            await mailSender(
                email,
                "Contact confirmation mail",
                contactUsEmail(
                    `${firstName}`,
                    `${lastName}`,
                    `${email}`,
                    `${inquiry}`,
                    `${contactNumber}`,
                    `${city}`,
                    `${state}`,
                    `${pincode}`,
                    `${countryCode}`
                )
            );
        }catch(error){
            console.error("Error in sending mail", error);
        }
        //return response
        return res.status(200).json({
            success: true,
            message: "Email Sent Sucessfully",
            data: newContact,
        })
    }catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message: error.message,
        })
    }
}

//get all contact us inquiry
exports.getAllContact = async (req, res) => { 
    try {
        const allContact = await contactUs.find({}, 'firstName lastName email contactNumber');

        if (!allContact || allContact.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No contacts found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "All contacts fetched successfully",
            data: allContact
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while fetching the inquiries",
        });
    }
};
