exports.passwordUpdated = (email, firstName) => {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Password Update Confirmation</title>
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
    
    <div class="message">🔒 Password Updated</div>
    
    <div class="body">
      <p>Hi <span class="highlight">${firstName}</span>,</p>
      <p>Your password has been successfully updated for the account associated with <span class="highlight">${email}</span>.</p>
      <p>If you did not make this change, please contact us immediately to secure your account.</p>
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
