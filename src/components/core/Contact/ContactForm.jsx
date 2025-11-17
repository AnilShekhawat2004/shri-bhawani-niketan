import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CountryCode from "../../../data/countryCode.json";
import { submitContactForm } from "../../../services/operations/contactUs";
import SButton from "../../Common/Buttons/mButton";

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

  const submitContactDetails = async (data) => {
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("contactNumber", data.contactNumber);
    formData.append("city", data.city);
    formData.append("state", data.state);
    formData.append("pincode", data.pincode);
    formData.append("subject", data.subject);
    formData.append("inquiry", data.inquiry);
    formData.append("countryCode", data.countryCode);

    const res = await submitContactForm(formData);
    if (res) {
      setLoading(true);
    }
    setLoading(false);
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
        subject: "",
        inquiry: "",
        CountryCode: "+91",
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <form
      onSubmit={handleSubmit(submitContactDetails)}
      className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-bhawaniDark to-bhawaniDark2 xl:py-6 lg:py-6 md:py-5 sm:py-4 xs:py-3 px-8">
        <h2 className="text-white xl:text-3xl lg:text-3xl md:text-2xl text-xl font-bold">Get In Touch</h2>
        <p className="text-white xl:text-sm lg:text-sm text-[12px]">We'd love to hear from you!</p>
      </div>

      {/* Body */}
      <div className="p-8 space-y-6">
        {/* First & Last Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <label
              htmlFor="firstName"
              className="text-sm font-medium text-gray-700"
            >
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              id="firstName"
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
            <label
              htmlFor="lastName"
              className="text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              placeholder="Enter your last name"
              className="form-input-style"
              {...register("lastName")}
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
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
          <label
            htmlFor="contactNumber"
            className="text-sm font-medium text-gray-700"
          >
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
              id="contactNumber"
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
            <label htmlFor="city" className="text-sm font-medium text-gray-700">
              City
            </label>
            <input
              id="city"
              type="text"
              placeholder="Your City"
              className="form-input-style"
              {...register("city")}
            />
          </div>
          <div>
            <label
              htmlFor="state"
              className="text-sm font-medium text-gray-700"
            >
              State
            </label>
            <input
              id="state"
              type="text"
              placeholder="Your State"
              className="form-input-style"
              {...register("state")}
            />
          </div>
          <div>
            <label
              htmlFor="pincode"
              className="text-sm font-medium text-gray-700"
            >
              Pincode
            </label>
            <input
              id="pincode"
              type="number"
              placeholder="123456"
              className="form-input-style"
              {...register("pincode")}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="subject"
            className="text-sm font-medium text-gray-700"
          >
            Message subject <span className="text-red-500">*</span>
          </label>
          <input
            id="subject"
            type="subject"
            placeholder="Enter subject"
            className="form-input-style"
            {...register("subject", { required: true })}
          />
          {errors.subject && (
            <span className="text-red-500 text-sm">Enter a valid subject.</span>
          )}
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="inquiry"
            className="text-sm font-medium text-gray-700"
          >
            Your Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="inquiry"
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
