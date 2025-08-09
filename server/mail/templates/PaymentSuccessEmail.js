exports.paymentSuccessEmail = (
    firstName,
    lastName,
    email,
    number,
    amount,
    comment,
    paymentId
  ) => {
    return `<!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <title>Payment Successful</title>
      <style>
          body {
              background-color: #F5EFE0;
              font-family: "InterVariable", -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif;
              font-size: 16px;
              line-height: 1.5;
              color: #4A2C2A;
              margin: 0;
              padding: 0;
              text-align: center;
          }
  
          .container {
              max-width: 600px;
              margin: 50px auto;
              padding: 30px;
              background: #EDE0C8;
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
              color: #6a001f;
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
          <div class="message">Payment Successful</div>
          <div class="body">
              <p>Dear <span class="highlight">${firstName} ${lastName}</span>,</p>
              <p>Thank you for your payment. We have successfully received your transaction.</p>
              <p><span class="highlight">Here are the payment details:</span></p>
              <p><strong>Name:</strong> ${firstName} ${lastName}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone Number:</strong> ${number}</p>
              <p><strong>Amount Paid:</strong> ₹${amount}</p>
              <p><strong>Comment:</strong> ${comment || "N/A"}</p>
              <p><strong>Payment ID:</strong> ${paymentId}</p>
              <p>We appreciate your trust in Shri Bhawani Niketan College.</p>
          </div>
          <div class="support">
              If you have any questions, please contact us at 
              <a href="mailto:info@shribhawaniniketan.com">info@shribhawaniniketan.com</a>.
          </div>
      </div>
  </body>
  </html>`
  }
  