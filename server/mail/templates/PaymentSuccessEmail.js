exports.paymentSuccessEmail = (
  firstName,
  lastName,
  email,
  number,
  amount,
  comment
) => {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Payment Successful</title>
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
      color: #059669; /* green accent */
      margin-bottom: 20px;
    }

    .details {
      text-align: left;
      margin-top: 25px;
    }

    .details p {
      margin: 8px 0;
    }

    .label {
      font-weight: 600;
      color: #374151;
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
    
    <div class="message">✅ Payment Successful</div>
    
    <p>Thank you, <strong>${firstName} ${lastName}</strong>.  
    We’ve received your payment successfully.</p>
    
    <div class="details">
      <p><span class="label">Name:</span> ${firstName} ${lastName}</p>
      <p><span class="label">Email:</span> ${email}</p>
      <p><span class="label">Phone:</span> ${number}</p>
      <p><span class="label">Amount Paid:</span> ₹${amount}</p>
      <p><span class="label">Comment:</span> ${comment || "N/A"}</p>
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
