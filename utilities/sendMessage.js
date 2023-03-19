require("dotenv").config();
const nodemailer = require("nodemailer")
async function sendMessage(body) {
    const output = `
        <p>You have a new contact information</p>
        <h3>Contact Details</h3>
        <ul>
        <li>Name: ${body.name}</li>
        <li>Email: ${body.email}</li>
        <li>Email: ${body.phone}</li>
        <li>Email: ${body.interest}</li>
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
        from: '"Customer Street Analyst Website Contact", <mail@customstreetanalysts.com>',
        to: 'progresseze@gmail.com',
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

async function makePaymeny(){

}

module.exports = {
    sendMessage: sendMessage
};