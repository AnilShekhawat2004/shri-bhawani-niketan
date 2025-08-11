const teacherSubSection = require("../models/teacherSubSection");
const TeacherSection = require("../models/teacherSection")

require('dotenv').config();

exports.createSubSection = async(req, res) => {
    try{
        const { 
            teacherSection, 
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

        if(
            !teacherSection || 
            !contactNumber || 
            !email || 
            !startingYear || 
            !experience ||
            !educationHistory || 
            !strengths ||
            !hobbies || 
            !professionalHistory ||
            !love){
                return res.status(404).json({
                    success: false,
                    message: "All fields are required to create a subsection",
                })
            }

            const sectionDetails = await TeacherSection.findById(teacherSection)
            if(!sectionDetails){
                return res.status(500).json({
                    success: true,
                    message: "Teacher Section not found"
                })
            }

        const existingSubSection = await teacherSubSection.findOne({teacherSubSection:sectionDetails._id})
        if (existingSubSection) {
            return res.status(400).json({
                success: false,
                message: "A SubSection already exists for this TeacherSection."
            });
        }
        
        const SubSectionDetails = await teacherSubSection.create({
            contactNumber: contactNumber,
            email: email,
            startingYear: startingYear,
            experience: experience,
            educationHistory: educationHistory,
            strengths: strengths,
            hobbies: hobbies,
            professionalHistory: professionalHistory,
            love: love,
            teacherSection: sectionDetails._id,
        })

        //Update the section with newly created subsection
        const updatedSection = await TeacherSection.findByIdAndUpdate(
            {_id: teacherSection},
            {$push: {SubSection: SubSectionDetails._id}},
            {new: true}
        ).populate("SubSection")

        //return response
        return res.status(200).json({
            success: true,
            message: "SubSection is created successfully",
            data: updatedSection,
        })
    }catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.editSubSection = async(req, res) => {
    try{
        const{ 
            subteacherSection, 
            teacherSection,  
            contactNumber,
            email,
            startingYear,
            experience,
            educationHistory,
            strengths,
            hobbies,
            professionalHistory,
            love} = req.body

            const SubSection = await teacherSubSection.findById(subteacherSection)

            if(!SubSection){
                return res.status(404).json({
                    success: false,
                    message: "SubSection not found "
                })
            }

            if(contactNumber !== undefined){
                SubSection.contactNumber = contactNumber
            }

            if(email !== undefined){
                SubSection.email = email
            }

            if(startingYear !== undefined){
                SubSection.startingYear = startingYear
            }

            if(experience !== undefined){
                SubSection.experience = experience
            }

            if(educationHistory !== undefined){
                SubSection.educationHistory = educationHistory
            }

            if(strengths !== undefined){
                SubSection.strengths = strengths
            }

            if(hobbies !== undefined){
                SubSection.hobbies = hobbies
            }

            if(professionalHistory !== undefined){
                SubSection.professionalHistory = professionalHistory
            }

            if(love !== undefined){
                SubSection.love = love
            }

            await SubSection.save();

            const updatedSection = await TeacherSection.findById(teacherSection).populate("SubSection");

            return res.status(200).json({
                success: true,
                message: "Subsection updated successfully",
                data: updatedSection,
            })
    }catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.deleteSubSection = async(req, res) => {
    try{
        const{subteacherSection} = req.body;

        //validation
        if(!subteacherSection){
            return res.status(404).json({
                success: false,
                message:"Subsection id is not found",
            })
        }

        //checking that subsection is exist or not
        const SubSection = await teacherSubSection.findById(subteacherSection);
        if(!SubSection){
            return res.status(404).json({
                success: false,
                messages: "SubSection is not exist"
            })
        }

        //delete Subsection
        await teacherSubSection.findByIdAndDelete(subteacherSection);

        //return response
        return res.status(200).json({
            success: true,
            message: "Teacher SubSection is Deleted Successfully"
        })
    }catch(error){
        console.error(error)
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.getAllSubSection = async(req, res) => {
    try{
        const allSubSection = await teacherSubSection.find()

        return res.status(200).json({
            success: true,
            data: allSubSection,
        })
    }catch(error){
        console.log("Error while fetching the Teacher SubSection details",error)
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}