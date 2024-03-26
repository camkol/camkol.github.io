// Install nodemailer using npm: npm install nodemailer

const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
const port = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Define route to handle form submission
app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  // Create a transporter to send emails
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "your-email@gmail.com", // Your email address
      pass: "your-password", // Your email password
    },
  });

  // Email options
  const mailOptions = {
    from: "your-email@gmail.com",
    to: "your-email@gmail.com", // Your email address where you want to receive messages
    subject: "New message from portfolio website",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error sending message");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Message sent successfully");
    }
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
