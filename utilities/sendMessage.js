require("dotenv").config();
const nodemailer = require("nodemailer")
async function sendMessage(body) {
    const output = `
        <p>You have a new contact information</p>
        <h3>Contact Details</h3>
        <ul>
        <li>Name: ${body.name}</li>
        <li>Email: ${body.email}</li>
        <li>Phone: ${body.phone}</li>
        <li>Interest: ${body.interest}</li>
        <li>Date: ${new Date()}</li>
        </ul>
        <h3>Message:</h3>
        <p>${body.message}</p>
        `
    let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    transporter.verify((err, success) => {
        if (err) {
            console.log(err)
        }
        return console.log('serveris ready to receive message ' + success);
    })


    let info = await transporter.sendMail({
        from: `"Custom Street Analysts Website Contact", <${process.env.EMAIL_USER}>`,
        to: 'oladipo@eqfiglobal.com',
        subject: "Customer Street Analyst Contact",
        html: output // html body
    },
        function (err, info) {
            if (err) {
                console.log(err)
                return
            }
            console.log("Email sent")
            return 'Email Sent'
        })
}

async function sendNewStudentAlert(body) {
  const output = `
      <p>You have a new student</p>
      <h3>Profile Details</h3>
      <ul>
      <li>Name: ${body.fname} ${body.lname}</li>
      <li>Email: ${body.email}</li>
      <li>Phone: ${body.phone}</li>
      <li>Amount Paid: ${body.amount} </li>
      <li>Payment Type: ${body.paymentType}</li>
      <li>Date: ${new Date()}</li>
      </ul>
      <h3>Message:</h3>
      <p>Please Proceed to add their email to the slack workspace</p>
      `
  let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true,
      auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
      },
      tls: {
          rejectUnauthorized: false
      }
  });
  transporter.verify((err, success) => {
      if (err) {
          console.log(err)
      }
      return console.log('serveris ready to receive message ' + success);
  })


  let info = await transporter.sendMail({
      from: `"New Student Registration", <${process.env.EMAIL_USER}>`,
      to: 'oladipo@eqfiglobal.com',
      subject: "New Student Alert - Customer Street Analyst",
      html: output // html body
  },
      function (err, info) {
          if (err) {
              console.log(err)
              return
          }
          console.log("Email sent")
          return 'Email Sent'
      })
}


async function sendWelcomeMessage(data) {
    const output = `
    <html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="x-apple-disable-message-reformatting" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="color-scheme" content="light dark" />
<meta name="supported-color-schemes" content="light dark" />
<title></title>
<style type="text/css" rel="stylesheet" media="all">
/* Base ------------------------------ */

@import url("https://fonts.googleapis.com/css?family=Nunito+Sans:400,700&display=swap");
body {
width: 100% !important;
height: 100%;
margin: 0;
-webkit-text-size-adjust: none;
}

a {
color: #3869D4;
}

a img {
border: none;
}

td {
word-break: break-word;
}

.preheader {
display: none !important;
visibility: hidden;
mso-hide: all;
font-size: 1px;
line-height: 1px;
max-height: 0;
max-width: 0;
opacity: 0;
overflow: hidden;
}
/* Type ------------------------------ */

body,
td,
th {
font-family: "Nunito Sans", Helvetica, Arial, sans-serif;
}

h1 {
margin-top: 0;
color: #333333;
font-size: 22px;
font-weight: bold;
text-align: left;
}

h2 {
margin-top: 0;
color: #333333;
font-size: 16px;
font-weight: bold;
text-align: left;
}

h3 {
margin-top: 0;
color: #333333;
font-size: 14px;
font-weight: bold;
text-align: left;
}

td,
th {
font-size: 16px;
}

p,
ul,
ol,
blockquote {
margin: .4em 0 1.1875em;
font-size: 16px;
line-height: 1.625;
}

p.sub {
font-size: 13px;
}
/* Utilities ------------------------------ */

.align-right {
text-align: right;
}

.align-left {
text-align: left;
}

.align-center {
text-align: center;
}

.u-margin-bottom-none {
margin-bottom: 0;
}
/* Buttons ------------------------------ */

.button {
background-color: #3869D4;
border-top: 10px solid #3869D4;
border-right: 18px solid #3869D4;
border-bottom: 10px solid #3869D4;
border-left: 18px solid #3869D4;
display: inline-block;
color: #FFF;
text-decoration: none;
border-radius: 3px;
box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16);
-webkit-text-size-adjust: none;
box-sizing: border-box;
}

.button--green {
background-color: #22BC66;
border-top: 10px solid #22BC66;
border-right: 18px solid #22BC66;
border-bottom: 10px solid #22BC66;
border-left: 18px solid #22BC66;
}

.button--red {
background-color: #FF6136;
border-top: 10px solid #FF6136;
border-right: 18px solid #FF6136;
border-bottom: 10px solid #FF6136;
border-left: 18px solid #FF6136;
}

@media only screen and (max-width: 500px) {
.button {
width: 100% !important;
text-align: center !important;
}
}
/* Attribute list ------------------------------ */

.attributes {
margin: 0 0 21px;
}

.attributes_content {
background-color: #F4F4F7;
padding: 16px;
}

.attributes_item {
padding: 0;
}
/* Related Items ------------------------------ */

.related {
width: 100%;
margin: 0;
padding: 25px 0 0 0;
-premailer-width: 100%;
-premailer-cellpadding: 0;
-premailer-cellspacing: 0;
}

.related_item {
padding: 10px 0;
color: #CBCCCF;
font-size: 15px;
line-height: 18px;
}

.related_item-title {
display: block;
margin: .5em 0 0;
}

.related_item-thumb {
display: block;
padding-bottom: 10px;
}

.related_heading {
border-top: 1px solid #CBCCCF;
text-align: center;
padding: 25px 0 10px;
}
/* Discount Code ------------------------------ */

.discount {
width: 100%;
margin: 0;
padding: 24px;
-premailer-width: 100%;
-premailer-cellpadding: 0;
-premailer-cellspacing: 0;
background-color: #F4F4F7;
border: 2px dashed #CBCCCF;
}

.discount_heading {
text-align: center;
}

.discount_body {
text-align: center;
font-size: 15px;
}
/* Social Icons ------------------------------ */

.social {
width: auto;
}

.social td {
padding: 0;
width: auto;
}

.social_icon {
height: 20px;
margin: 0 8px 10px 8px;
padding: 0;
}
/* Data table ------------------------------ */

.purchase {
width: 100%;
margin: 0;
padding: 35px 0;
-premailer-width: 100%;
-premailer-cellpadding: 0;
-premailer-cellspacing: 0;
}

.purchase_content {
width: 100%;
margin: 0;
padding: 25px 0 0 0;
-premailer-width: 100%;
-premailer-cellpadding: 0;
-premailer-cellspacing: 0;
}

.purchase_item {
padding: 10px 0;
color: #51545E;
font-size: 15px;
line-height: 18px;
}

.purchase_heading {
padding-bottom: 8px;
border-bottom: 1px solid #EAEAEC;
}

.purchase_heading p {
margin: 0;
color: #85878E;
font-size: 12px;
}

.purchase_footer {
padding-top: 15px;
border-top: 1px solid #EAEAEC;
}

.purchase_total {
margin: 0;
text-align: right;
font-weight: bold;
color: #333333;
}

.purchase_total--label {
padding: 0 15px 0 0;
}

body {
background-color: #F2F4F6;
color: #51545E;
}

p {
color: #51545E;
}

.email-wrapper {
width: 100%;
margin: 0;
padding: 0;
-premailer-width: 100%;
-premailer-cellpadding: 0;
-premailer-cellspacing: 0;
background-color: #F2F4F6;
}

.email-content {
width: 100%;
margin: 0;
padding: 0;
-premailer-width: 100%;
-premailer-cellpadding: 0;
-premailer-cellspacing: 0;
}
/* Masthead ----------------------- */

.email-masthead {
padding: 25px 0;
text-align: center;
}

.email-masthead_logo {
width: 94px;
}

.email-masthead_name {
font-size: 16px;
font-weight: bold;
color: #A8AAAF;
text-decoration: none;
text-shadow: 0 1px 0 white;
}
/* Body ------------------------------ */

.email-body {
width: 100%;
margin: 0;
padding: 0;
-premailer-width: 100%;
-premailer-cellpadding: 0;
-premailer-cellspacing: 0;
}

.email-body_inner {
width: 570px;
margin: 0 auto;
padding: 0;
-premailer-width: 570px;
-premailer-cellpadding: 0;
-premailer-cellspacing: 0;
background-color: #FFFFFF;
}

.email-footer {
width: 570px;
margin: 0 auto;
padding: 0;
-premailer-width: 570px;
-premailer-cellpadding: 0;
-premailer-cellspacing: 0;
text-align: center;
}

.email-footer p {
color: #A8AAAF;
}

.body-action {
width: 100%;
margin: 30px auto;
padding: 0;
-premailer-width: 100%;
-premailer-cellpadding: 0;
-premailer-cellspacing: 0;
text-align: center;
}

.body-sub {
margin-top: 25px;
padding-top: 25px;
border-top: 1px solid #EAEAEC;
}

.content-cell {
padding: 45px;
}
/*Media Queries ------------------------------ */

@media only screen and (max-width: 600px) {
.email-body_inner,
.email-footer {
width: 100% !important;
}
}

@media (prefers-color-scheme: dark) {
body,
.email-body,
.email-body_inner,
.email-content,
.email-wrapper,
.email-masthead,
.email-footer {
background-color: #333333 !important;
color: #FFF !important;
}
p,
ul,
ol,
blockquote,
h1,
h2,
h3,
span,
.purchase_item {
color: #FFF !important;
}
.attributes_content,
.discount {
background-color: #222 !important;
}
.email-masthead_name {
text-shadow: none !important;
}
}

:root {
color-scheme: light dark;
supported-color-schemes: light dark;
}
</style>
<!--[if mso]>
<style type="text/css">
.f-fallback  {
font-family: Arial, sans-serif;
}
</style>
<![endif]-->
</head>
<body>
<!-- <span class="preheader">Thanks for trying out Iprospa. We’ve pulled together some information and resources to help you get started.</span> -->
<table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0" role="presentation">
<tr>
<td align="center">
  <table class="email-content" width="100%" cellpadding="0" cellspacing="0" role="presentation">
    <tr>
      <td class="email-masthead">
        <a href="https://example.com" class="f-fallback email-masthead_name">
          <img src="http://customstreetanalysts.com/images/EQFI2.png" width="150px" height="70px">
         
      </a>
      </td>
    </tr>
    <!-- Email Body -->
    <tr>
      <td class="email-body" width="570" cellpadding="0" cellspacing="0">
        <table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0" role="presentation">
          <!-- Body content -->
          <tr>
            <td class="content-cell">
              <div class="f-fallback">
                <h1>Hi ${data.fname} ${data.lname}!</h1>
                <p> You have started your journey to financial stability and that’s a big deal!</p>
                <p> Over the next six months you will be undergoing training on the following courses</p>
                <table class="attributes" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                    <tr>
                      <td class="attributes_content">
                        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                          <tr>
                            <td class="attributes_item">
                              <span class="f-fallback">
                            <li>Equity Valuation, Research and Trading</li> 
                            </span>
                            </td>
                          </tr>
                          <tr>
                            <td class="attributes_item">
                              <span class="f-fallback">
                               <li>Fixed Income Valuation and Trading</li> 
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td class="attributes_item">
                              <span class="f-fallback">
                           <li>Commodities Trading and Valuation</li> 
                            </span>
                            </td>
                          </tr>
                          <tr>
                            <td class="attributes_item">
                              <span class="f-fallback">
                           <li>Currency Trading and Valuation</li> 
                            </span>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                  <p>WIthin the next 24 hours you will receive an invitation to our slack group channel which is our main training workspace.</p>
                  <p>All of our graduates have accomplished so much since taking this course and you can too.</p>
                 
                  <p><i>Can’t wait to see all the financial goals you accomplish as well.</i> </p>
                  <!-- <p>Ready to get started? Then click the button below.</p> -->
                  <!-- Action -->
                  <!-- <p style="font-size: 13px;">If you’re having trouble with the button above, copy and paste the URL below into your web browser.</p>
                  <p class="f-fallback sub"></p>
                   -->
                 
          
                <p>With Love,
                  <br><b> Dipo from Custom Street Analysts </b></p>
              </div>
            </td>
          </tr>
          <tr>
            <td class="content-cell" align="center" style="padding-top:0 ;">
                <p class="f-fallback sub align-center" style="margin: 0; ">  
                 <a style="text-decoration: none; color:#222">Powered by Eqfi Global</a>
                </p>
                <!-- <p style="font-size: 8px; margin: 0;">18, Afolabi Aina St, Allen, Ikeja, Lagos</p> -->
                <p style="font-size: 10px; padding-top: 5px;">You are receiving this message because you signed up on Custom Street Analyst. If you would like to stop receiving tips on financial literacy, you can opt out by clicking <a href="">unsubscribe</a>. For more information about how we process data, please see our <a href="">Privacy Policy</a> 
              </td>
          </tr>
        </table>
      </td>

  </table>
</td>
</tr>
</table>
</body>
</html>   

        `
    let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    transporter.verify((err, success) => {
        if (err) {
            console.log(err)
        }
        return console.log('serveris ready to receive message ' + success);
    })


    let info = await transporter.sendMail({
        from: `"Custom Street Analysts", <${process.env.EMAIL_USER}>`,
        to: `${data.email}`,
        subject: "Welcome to Custome Street Analysts Training",
        html: output // html body
    },
        function (err, info) {
            if (err) {
                console.log(err)
                return
            }
            console.log("Email sent")
            return 'Email Sent'
        })
}

module.exports = {
    sendMessage: sendMessage,
    sendWelcomeMessage: sendWelcomeMessage,
    sendNewStudentAlert: sendNewStudentAlert
};