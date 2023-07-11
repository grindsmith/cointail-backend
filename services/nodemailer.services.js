"use strict";
const nodemailer = require("nodemailer");

require('dotenv').config();

function constructHTMLDocument(walletAddress) { 
  return (
    `<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>
    <html xmlns='http://www.w3.org/1999/xhtml' lang='en-GB'> 
      <head>
        <meta http-equiv='Content-Type' content='text/html; charset=UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>CoinTail App</title>
      </head>
      <body>
        <div>New Transaction from ${walletAddress}. Check out their list of transactions at cointail.xyz/wallet/${walletAddress}</div>
      </body>
    </html>`
  );
}

function constructSubject(walletAddress) {
  return `Trade Alert: ${walletAddress} has completed a new transaction.`;
}

async function sendEmail(recipient, walletAddress) {
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
        subject: constructSubject(walletAddress),
        text: constructSubject(walletAddress),
        html: constructHTMLDocument(walletAddress)
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log(error);
  }
}

// sendEmail('evsmi111595@gmail.com', '0xEBe035dA5DF98E8297D31cFD1c249732a6d6d3bA');