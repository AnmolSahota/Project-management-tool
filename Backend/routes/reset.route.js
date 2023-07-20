const otpGenerator = require("otp-generator");
const express = require("express");
const nodemailer = require("nodemailer");
const resetRoute = express.Router();
resetRoute.post("/", async (req, res) => {
  let { email } = req.body;
  let otp = await otpGenerator.generate(4, {
    digits: true,
    alphabets: false,
    upperCase: false,
    specialChars: false,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
  });
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "reactjs043@gmail.com",
      pass: "React@043",
    },
  });

  try {
    const mailOptions = {
      from: "reactjs043@gmail.com",
      to: "anmolsahota057",
      subject: "Hello from Nodemailer",
      text: "This is the email content.",
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
    res.send("OTP email sent successfully");
  } catch (error) {
    console.error("Error sending OTP email:", error);
    res.send("internal error");
  }
});

module.exports = resetRoute;
