var nodemailer = require("nodemailer");

module.exports = function sendEmail(userInfo, subject, body) {
  console.log(userInfo);
  var transporter = nodemailer.createTransport({
    //creating transport obfject for nodemailer
    host: "smtp.gmail.com",
    port: "465",
    secure: true,
    service: "gmail",
    auth: {
      user: "DocsCoder123@gmail.com",
      pass: "CodingIsFun"
    }
  });

  var mailOptions = {
    //nodemailer email
    from: "DocsCoder123@gmail.com",
    to: userInfo.email,
    subject: subject,
    html: body
  };
  console.log("sending mail!");

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
