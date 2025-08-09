exports.passwordReset = (url, email) => {
	return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Password Reset</title>
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
        }

        .button {
            display: inline-block;
            padding: 12px 24px;
            background: #6A1B1A; /* Maroon button */
            color: #FFF !important;
            text-decoration: none !important;
            font-size: 16px;
            font-weight: bold;
            border-radius: 8px;
            border: 2px solid #4A2C2A;
            transition: background 300ms ease, transform 200ms ease;
        }

        .button:hover {
            background: #8A2E2A;
            transform: scale(1.05);
        }

        .support {
            font-size: 14px;
            color: #6A1B1A;
            margin-top: 15px;
        }

        .support a {
            color: #6A1B1A !important;
            font-weight: bold;
            text-decoration: none !important;
        }

        .support a:hover {
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <a href=""><img class="logo" src="https://res.cloudinary.com/dlxddzakp/image/upload/v1741791186/SBN/kexe4sv2xrzyczuqxcqg.png" alt="Shri Bhawani Niketan College Logo"></a>
        <div class="message">Password Reset</div>
        <div class="body">
            <p>Trouble accessing your Admin account? No problem, we're here to help.</p>
            <p>Select the button below to reset your password. The link is valid for 2 hours.</p>
            <a href="${url}" class="button">Reset Password</a>
            <p><strong>Your Email:</strong> ${email}</p>
            <p>If you didn't request this, you can safely ignore this email.</p>
        </div>
        <div class="support">
            Need help? Contact us at <a href="mailto:info@shribhawaniniketan.com">info@shribhawaniniketan.com</a>
        </div>
    </div>
</body>
</html>
`;
};