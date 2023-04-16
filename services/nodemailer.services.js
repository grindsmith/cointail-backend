"use strict";
const nodemailer = require("nodemailer");

require('dotenv').config();

module.exports = {
  sendOffEmail: async (email, journeyOwner) => {
    try {
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
    
      // send mail with defined transport object
      let info = await transporter.sendMail({
          from: 'The Hero6 App <donotreply@hero6.com>',
          to: email,
          subject: "Notification: " + journeyOwner + " has shared their Hero journey with you!", // Subject line
          text: "You have had a journey shared with you! Go to this url to check it out:" + process.env.ENVIRONMENT_URL, // plain text body
          html: "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'><html xmlns='http://www.w3.org/1999/xhtml' lang='en-GB'>  <head>    <meta http-equiv='Content-Type' content='text/html; charset=UTF-8' />    <title>HERO6</title>    <meta name='viewport' content='width=device-width, initial-scale=1.0' />    <style type='text/css'>      a[x-apple-data-detectors] {        color: inherit !important;      }    </style>  </head>  <body style='margin: 0; padding: 30px 0px;background-color: #efefef;'>    <table role='presentation' border='0' cellpadding='0' cellspacing='0' width='100%'>      <tr>        <td style='padding: 20px 0 30px 0;'>          <table align='center' border='0' cellpadding='0' cellspacing='0' width='700' style='border-collapse: collapse;'>            <tr>              <td align='center' bgcolor='#fff'> <img src='https://qbranch-hero6.herokuapp.com/Images/Banners/HeroBanners-03.png' alt='Meet Astro!' width='100%' height='120' style='display: block;' /> </td>            </tr>            <tr>              <td bgcolor='#ffffff' style='padding: 30px;'>                <table border='0' cellpadding='0' cellspacing='0' width='100%' style='border-collapse: collapse;'>                  <tr>                    <td style='color: #153643; font-family: Arial, sans-serif;'>        <h1 style='font-size: 28px; margin: 0; font-weight: 400;'>Welcome to the <span style='color: #006dcc;'>Hero6</span></h1>             </td>                  </tr>                  <tr>                    <td style='color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; padding: 20px 0 30px 0;'>                      <p style='margin: 0;'><strong>You have been invited to collaborate on a Hero journey! Click the button below to proceed to the Hero6 App to learn more.</strong> The Hero6 App is a great way to align with your team and create a future vision for your account. The Hero6 is the best way to create and align on cross-cloud vision stories and demos!</p>                    </td>                  </tr>                  <tr>                    <td>                      <table border='0' cellpadding='0' cellspacing='0' width='100%' style='border-collapse: collapse;'>                        <tr>                          <td width='260' valign='top' style='text-align: center; vertical-align: middle;'>                            <table border='0' cellpadding='0' cellspacing='0' width='100%' style='border-collapse: collapse;'>                              <tr>                                <td> <a href=" + process.env.ENVIRONMENT_URL + " style='cursor: pointer;'> <button width='260' style='cursor: pointer; padding: 15px 20px; background-color: #006dcc; color: white; border: 1px solid #006dcc; font-size: 18px; font-weight: 500'> Take A Look </button> </a> </td>                              </tr>                            </table>                          </td>                        </tr>                      </table>                    </td>                  </tr>                </table>              </td>            </tr>            <tr>              <td bgcolor='#032d60' style='padding: 30px 30px;'>                <table border='0' cellpadding='0' cellspacing='0' width='100%' style='border-collapse: collapse;'>                  <tr>                    <td style='color: #ffffff; font-family: Arial, sans-serif; font-size: 14px;'>                      <p style='margin: 0;'>Q Branch, Hero6<br /> <a href='https://org62.lightning.force.com/lightning/r/CollaborationGroup/0F93y000000DYglCAG/view' style='color: #ffffff;'>Learn More</a></p>                    </td>                    <td align='right'>                      <table border='0' cellpadding='0' cellspacing='0' style='border-collapse: collapse;'>                        <tr>                          <td> <a href='https://org62.my.trailhead.com/en/content/employee/modules/hero-storytelling-solutions'> <img src='https://qbranch-hero6.herokuapp.com/logos/hero6_badge.png' alt='Twitter.' width='38' height='38' style='display: block;' border='0' /> </a> </td>                          <td style='font-size: 0; line-height: 0;' width='20'> </td>                        </tr>                      </table>                    </td>                  </tr>                </table>              </td>            </tr>          </table>        </td>      </tr>    </table>  </body></html>"
      });

      console.log("Message sent: %s", info.messageId);
    } catch (error) {
      console.log(error);
    }
  },
  sendFeedbackEmail: async (email) => {
    try {
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
    
      // send mail with defined transport object
      let info = await transporter.sendMail({
          from: 'The Hero6 App <donotreply@hero6.com>',
          to: email,
          subject: "We Want Your Feedback! Help Us Shape Our Roadmap", // Subject line
          text: "We Want Your Feedback! Help Us Shape Our Roadmap: https://docs.google.com/forms/d/e/1FAIpQLSffhZ0YIj3kZa2-Q0bepveL6Gn8sciWlPs_ziP8HCSma-aDjA/viewform?usp=sf_link", // plain text body
          html: "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'><html xmlns='http://www.w3.org/1999/xhtml' lang='en-GB'>  <head>    <meta http-equiv='Content-Type' content='text/html; charset=UTF-8' />    <title>Demystifying Email Design</title>    <meta name='viewport' content='width=device-width, initial-scale=1.0' />    <style type='text/css'>      a[x-apple-data-detectors] {        color: inherit !important;      }    </style>  </head>  <body style='margin: 0; padding: 30px 0px;background-color: #efefef;'>    <table role='presentation' border='0' cellpadding='0' cellspacing='0' width='100%'>      <tr>        <td style='padding: 20px 0 30px 0;'>          <table align='center' border='0' cellpadding='0' cellspacing='0' width='600' style='border-collapse: collapse; border: 1px solid #cccccc;'>            <tr>              <td align='center' bgcolor='#032D60' style='padding: 20px 0 20px 0;'> <img src='https://qbranch-hero6.herokuapp.com/Images/astroCircle.png' alt='Meet Astro!' width='120' height='120' style='display: block;border-radius: 100vw;' bgcolor='#a2aba1' /> </td>            </tr>            <tr>              <td bgcolor='#ffffff' style='padding: 40px 30px 40px 30px;'>                <table border='0' cellpadding='0' cellspacing='0' width='100%' style='border-collapse: collapse;'>                  <tr>                    <td style='color: #153643; font-family: Arial, sans-serif;'>                      <h1 style='font-size: 28px; margin: 0;'>Welcome to the Hero6!</h1>                    </td>                  </tr>                  <tr>                    <td style='color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; padding: 20px 0 30px 0;'>                      <p style='margin: 0;'><strong>We appreciate any feedback you have! Click the button below to let us know how we can improve your experience.</strong> The Hero6 App is a great way to align with your team and create a future vision for your account. The Hero6 is the best way to create and align on cross-cloud vision stories and demos!</p>                    </td>                  </tr>                  <tr>                    <td>                      <table border='0' cellpadding='0' cellspacing='0' width='100%' style='border-collapse: collapse;'>                        <tr>                          <td width='260' valign='top' style='text-align: center; vertical-align: middle;'>                            <table border='0' cellpadding='0' cellspacing='0' width='100%' style='border-collapse: collapse;'>                              <tr>                                <td> <a href='https://docs.google.com/forms/d/e/1FAIpQLSffhZ0YIj3kZa2-Q0bepveL6Gn8sciWlPs_ziP8HCSma-aDjA/viewform?usp=sf_link'> <button width='260' style='padding: 15px 20px; background-color: #ee4c50; color: white; border: 1px solid #ee4c50; font-size: 18px; font-weight: 500'>  Give Feedback </button> </a> </td>                              </tr>                            </table>                          </td>                        </tr>                      </table>                    </td>                  </tr>                </table>              </td>            </tr>            <tr>              <td bgcolor='#33505e' style='padding: 30px 30px;'>                <table border='0' cellpadding='0' cellspacing='0' width='100%' style='border-collapse: collapse;'>                  <tr>                    <td style='color: #ffffff; font-family: Arial, sans-serif; font-size: 14px;'>                      <p style='margin: 0;'>Q Branch, Hero6<br /> <a href='https://org62.lightning.force.com/lightning/r/CollaborationGroup/0F93y000000DYglCAG/view' style='color: #ffffff;'>Learn More</a></p>                    </td>                    <td align='right'>                      <table border='0' cellpadding='0' cellspacing='0' style='border-collapse: collapse;'>                        <tr>                          <td> <a href='https://org62.my.trailhead.com/en/content/employee/modules/hero-storytelling-solutions'> <img src='https://qbranch-hero6.herokuapp.com/logos/hero6_badge.png' alt='Twitter.' width='38' height='38' style='display: block;' border='0' /> </a> </td>                          <td style='font-size: 0; line-height: 0;' width='20'> </td>                        </tr>                      </table>                    </td>                  </tr>                </table>              </td>            </tr>          </table>        </td>      </tr>    </table>  </body></html>"
      });

      console.log("Message sent: %s", info.messageId);
    } catch (error) {
      console.log(error);
    }
  }
};
