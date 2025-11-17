exports.passwordReset = (url, email) => {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Password Reset</title>
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
      margin: 12px 0;
    }

    .button {
      display: inline-block;
      margin: 20px 0;
      padding: 14px 28px;
      background: #2563eb;
      color: #ffffff !important;
      text-decoration: none !important;
      font-size: 16px;
      font-weight: 500;
      border-radius: 8px;
      transition: background 0.3s ease;
    }

    .button:hover {
      background: #1d4ed8;
    }

    .highlight {
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
    <img class="logo" src="https://res.cloudinary.com/dlxddzakp/image/upload/v1761587433/SBN/aihsw9o7xxn6pmcojsjk.png" alt="Shri Bhawani Niketan College Logo">
    
    <div class="message">Password Reset Request</div>
    
    <div class="body">
      <p>Hello,</p>
      <p>We received a request to reset the password for your Admin account.</p>
      <p>Click the button below to reset your password. This link will be valid for <span class="highlight">2 hours</span>.</p>
      
      <a href="${url}" class="button">Reset Password</a>
      
      <p><strong>Your Email:</strong> ${email}</p>
      <p>If you did not request this, please ignore this email. Your password will remain unchanged.</p>
    </div>
    
    <div class="support">
      Need help? Contact us at  
      <a href="mailto:info@shribhawaniniketan.com">info@shribhawaniniketan.com</a>
    </div>
  </div>
</body>
</html>
`;
};
