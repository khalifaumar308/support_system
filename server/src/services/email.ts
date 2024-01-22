// const hbs = require('nodemailer-express-handlebars')
// const nodemailer = require('nodemailer')
// const path = require('path')
import hbs from 'nodemailer-express-handlebars';
import nodemailer from 'nodemailer';
import path from 'path';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAILPASS
  }
});
const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve('./views/'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./views/'),
};

// transporter.use('compile', hbs(handlebarOptions))
transporter.use('compile', hbs({
    viewEngine: {
        extname: '.hbs',
        layoutsDir: './src/views/',
        defaultLayout: false,
        partialsDir: './src/views/',
    },
    viewPath: './src/views/',
    extName: '.hbs'
}));

export const sendMail = (recipeint: { email: string, adminName: string, schoolName: string }) => {
  console.log(process.env.EMAIL, process.env.EMAIL)
  const mailOptions = {
    from: process.env.EMAIL,
    template: "email",
    to: recipeint.email,
    subject: `Welcome to Zenkleus, ${recipeint.schoolName}`,
    context: {
      email: recipeint.email,
      name: recipeint.adminName,
      link: " http://localhost:5173/admin-login",
    },
  };
  try { 
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error)
        throw error;
      }
      else {
      console.log(`Email sent to ${recipeint.email}: ` + info.response);
      return true}
  });
  } catch (error) {
    return error
  }
}

// module.exports = sendMail
// module.exports = sendMail