exports.contactUsEmail = (
  firstName,
  lastName,
  email,
  subject,
  inquiry,
  contactNumber,
  city,
  state,
  pincode,
) => {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Contact Form Confirmation</title>
  <style>
    body {
      background-color: #f9fafb;
      font-family: "Inter", -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif;
      font-size: 16px;
      line-height: 1.6;
      color: #1f2937;
      margin: 0;
      padding: 0;
    }

    .container {
      max-width: 600px;
      margin: 60px auto;
      padding: 40px;
      background: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
      text-align: center;
    }

    .logo {
      max-width: 150px;
      margin-bottom: 25px;
    }

    .message {
      font-size: 26px;
      font-weight: 600;
      color: #2563eb; /* blue accent */
      margin-bottom: 20px;
    }

    .body {
      text-align: left;
      margin-top: 20px;
    }

    .body p {
      margin: 10px 0;
    }

    .label {
      font-weight: 600;
      color: #111827;
    }

    .support {
      font-size: 14px;
      color: #6b7280;
      margin-top: 25px;
    }

    .support a {
      color: #2563eb;
      text-decoration: none;
      font-weight: 500;
    }

    .support a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    <img class="logo" src="https://res.cloudinary.com/dlxddzakp/image/upload/v1741791186/SBN/kexe4sv2xrzyczuqxcqg.png" alt="Shri Bhawani Niketan College Logo">
    
    <div class="message">Thank You for Contacting Us</div>
    
    <div class="body">
      <p>Dear <span class="label">${firstName} ${lastName}</span>,</p>
      <p>We have received your message and our team will get back to you shortly.</p>
      <p><span class="label">Here are the details you shared:</span></p>
      
      <p><span class="label">Name:</span> ${firstName} ${lastName}</p>
      <p><span class="label">Email:</span> ${email}</p>
      <p><span class="label">Phone Number:</span> ${contactNumber}</p>
      <p><span class="label">Address:</span> ${city}, ${state}, ${pincode}</p>
      <p><span class="label">Subject:</span> ${subject}</p>
      <p><span class="label">Message:</span> ${inquiry}</p>
      
      <p>We appreciate your interest in Shri Bhawani Niketan College and will respond soon.</p>
    </div>
    
    <div class="support">
      Need immediate help? Contact us at  
      <a href="mailto:info@shribhawaniniketan.com">info@shribhawaniniketan.com</a>
    </div>
  </div>
</body>
</html>
`;
};
