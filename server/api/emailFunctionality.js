var nodemailer = require('nodemailer');

module.exports = function sendEmail(userInfo){
	console.log(userInfo)
var transporter = nodemailer.createTransport({
	//creating transport obfject for nodemailer
  host: 'smtp.gmail.com',
  port: '465',
  secure: true,
  service: 'gmail',
  auth: {
    user: 'DocsCoder123@gmail.com',
    pass: 'CodingIsFun'
  }
});

var mailOptions = {
	//nodemailer email
  from: 'DocsCoder123@gmail.com',
  to: userInfo.email,
  subject: 'Succesful signup for Doctors Coder',
  text: 'This is an email to let you know that you have succesfully registered for Doctors Coder. \nYour username is: ' + userInfo.userName + '\nYour password is: ' + userInfo.password
};
	console.log('sending mail!')

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } 
  else {
    console.log('Email sent: ' + info.response);
  }
  
});

}