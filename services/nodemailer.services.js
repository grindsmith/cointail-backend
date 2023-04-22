"use strict";
const nodemailer = require("nodemailer");

require('dotenv').config();

function constructHTMLDocument() { 
  return (
    `<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>
    <html xmlns='http://www.w3.org/1999/xhtml' lang='en-GB'> 
      <head>
        <meta http-equiv='Content-Type' content='text/html; charset=UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>HERO6</title>
      </head>
      <body>
        <div>Hey</div>
      </body>
    </html>`
  );
}

function constructSubject() {
  return "Trade Alert: has shared their Hero journey with you!";
}

async function sendEmail(recipient) {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"CoinTail" <noreply@cointail.xyz>',
        to: recipient,
        subject: constructSubject(),
        text: constructSubject(),
        html: constructHTMLDocument()
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log(error);
  }
}

// sendEmail('esmith.wagmi@gmail.com');

module.exports = {
  sendEmail
};