const express = require("express");
const app = express();

const database = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudinary");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const achievementRoute = require("./routes/Achievement");
const contactUsRoute = require("./routes/ContactUs");
const courseRoute = require("./routes/Course");
const newsRoute = require("./routes/News");
const photoRoute = require("./routes/Photo");
const profileRoute = require("./routes/Profile");
const teacherRoute = require("./routes/Teacher");
const userRoute = require("./routes/User");
const paymentRoute = require("./routes/Payment");
const eventRoute = require("./routes/Events");

// Load config from file
const PORT = process.env.PORT || 4000;

// Connect to the database
database.connect();

// Connect to Cloudinary
cloudinaryConnect();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Mount all API routes
app.use("/api/v1/auth", userRoute);
app.use("/api/v1/profile", profileRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/reach", contactUsRoute);
app.use("/api/v1/achievement", achievementRoute);
app.use("/api/v1/news", newsRoute);
app.use("/api/v1/images", photoRoute);
app.use("/api/v1/staff", teacherRoute);
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1/event", eventRoute);

// Server response check
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is running...",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`App is listening at ${PORT}`);
});
