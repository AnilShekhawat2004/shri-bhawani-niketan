import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { apiConnector } from "../../../services/apiconnector";
import { contactusEndpoints } from "../../../services/apis";
import CountryCode from "../../../data/countryCode.json";
import SButton from "../../Common/Buttons/mButton"

const ContactForm = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      CountryCode: "+91",
    },
  });

  const submitContactForm = async (data) => {
    try {
      setLoading(true);
      const res = await apiConnector(
        "POST",
        contactusEndpoints.CONTACT_US_API,
        data
      );

      if (res?.status === 200 || res?.data?.success) {
        toast.success("Your message has been sent successfully!");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error in Submit Contact -", error.message);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstName: "",
        lastName: "",
        contactNumber: "",
        city: "",
        state: "",
        pincode: "",
        inquiry: "",
        CountryCode: "+91",
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <form
      onSubmit={handleSubmit(submitContactForm)}
      className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-bhawaniDark to-bhawaniDark2 py-6 px-8">
        <h2 className="text-white text-3xl font-bold">Get In Touch</h2>
        <p className="text-white text-sm">We'd love to hear from you!</p>
      </div>

      {/* Body */}
      <div className="p-8 space-y-6">
        {/* First & Last Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <label className="text-sm font-medium text-gray-700">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your first name"
              className="form-input-style"
              {...register("firstName", { required: true })}
            />
            {errors.firstName && (
              <span className="text-red-500 text-sm">Required field</span>
            )}
          </div>

          <div className="relative">
            <label className="text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Enter your last name"
              className="form-input-style"
              {...register("lastName")}
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            placeholder="example@domain.com"
            className="form-input-style"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">Enter a valid email.</span>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4">
            <select
              className="w-20 form-input-style"
              {...register("CountryCode", { required: true })}
            >
              {CountryCode.map((ele, i) => (
                <option key={i} value={ele.code}>
                  {ele.code} - {ele.country}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="12345 67890"
              className="flex-1 form-input-style"
              {...register("contactNumber", {
                required: {
                  value: true,
                  message: "Phone number required.",
                },
                maxLength: { value: 12, message: "Too long" },
                minLength: { value: 10, message: "Too short" },
              })}
            />
          </div>
          {errors.contactNumber && (
            <span className="text-red-500 text-sm">
              {errors.contactNumber.message}
            </span>
          )}
        </div>

        {/* City/State/Pincode */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              placeholder="Your City"
              className="form-input-style"
              {...register("city")}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">State</label>
            <input
              type="text"
              placeholder="Your State"
              className="form-input-style"
              {...register("state")}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Pincode</label>
            <input
              type="number"
              placeholder="123456"
              className="form-input-style"
              {...register("pincode")}
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Your Message <span className="text-red-500">*</span>
          </label>
          <textarea
            rows="5"
            placeholder="Type your question or message here..."
            className="form-input-style"
            {...register("inquiry", { required: true })}
          />
          {errors.inquiry && (
            <span className="text-red-500 text-sm">
              Please enter your message.
            </span>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <SButton
            type="submit"
            disabled={loading}
            className="w-full  py-3 rounded-lg text-lg font-semibold"
          >
            {loading ? "Sending..." : "Send Message"}
          </SButton>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
