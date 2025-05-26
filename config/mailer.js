const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: 'expsoltechfeedback@gmail.com',
    pass: 'vwgempvhjtjpwkxq'
  }
});

const mailOptions = {
  from: 'expsoltechfeedback@gmail.com',
  to: 'Daniel@expsoltechs.com'
};

module.exports = { transporter, mailOptions };
