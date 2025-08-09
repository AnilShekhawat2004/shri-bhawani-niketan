exports.contactUsEmail = (
    firstName,
    lastName,
    email,
    inquiry,
    contactNumber,
    city,
    state,
    pincode,
    countryCode,    
  ) => {
    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Contact Form Confirmation</title>
    <style>
        body {
            background-color: #F5EFE0; /* Soft beige background */
            font-family: "InterVariable", -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif;
            font-size: 16px;
            line-height: 1.5;
            color: #4A2C2A; /* Dark maroon for text */
            margin: 0;
            padding: 0;
            text-align: center;
        }

        .container {
            max-width: 600px;
            margin: 50px auto;
            padding: 30px;
            background: #EDE0C8; /* Light beige */
            border-radius: 12px;
            box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.1);
        }

        .logo {
            max-width: 180px;
            margin-bottom: 20px;
        }

        .message {
            font-size: 28px;
            font-weight: bold;
            color: #6A1B1A; /* Strong maroon */
            margin-bottom: 15px;
        }

        .body {
            background-color: #D6C3A5;
            padding: 20px;
            border-radius: 10px;
            font-size: 16px;
            color: #3D1F1E;
            box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
            text-align: left;
        }

        .body p {
            margin: 8px 0;
        }

        .highlight {
            font-weight: bold;
            color: #6A1B1A;
        }

        .support {
            font-size: 14px;
            color: #6A1B1A;
            margin-top: 15px;
        }

        .support a {
            color: #4A2C2A;
            font-weight: bold;
            text-decoration: none;
        }

        .support a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <a href=""><img class="logo" src="https://res.cloudinary.com/dlxddzakp/image/upload/v1741791186/SBN/kexe4sv2xrzyczuqxcqg.png" alt="Shri Bhawani Niketan College Logo"></a>
        <div class="message">Contact Form Confirmation</div>
        <div class="body">
            <p>Dear <span class="highlight">${firstName} ${lastName}</span>,</p>
            <p>Thank you for contacting us. We have received your message and will respond to you as soon as possible.</p>
            <p><span class="highlight">Here are the details you provided:</span></p>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone Number:</strong> ${contactNumber}</p>
            <p><strong>Address:</strong> ${city}, ${state}, ${pincode}</p>
            <p><strong>Message:</strong> ${inquiry}</p>
            <p>We appreciate your interest and will get back to you shortly.</p>
        </div>
        <div class="support">
            If you have any further questions or need immediate assistance, please contact us at 
            <a href="mailto:info@shribhawaniniketan.com">info@shribhawaniniketan.com</a>. We are here to help!
        </div>
    </div>
</body>
</html>
`
  }