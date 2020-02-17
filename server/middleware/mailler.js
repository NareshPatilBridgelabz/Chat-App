var nodemailer = require('nodemailer')
//nodemailer is a single module with zero dependencies, designed for sending mails
exports.sendMailer = (url, email) => {
    console.log("In mailer", process.env.EMAIL, process.env.PASSWORD)//sets the variables from the env file
    //create a transport instance using nodemailer
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });
//setup mail configuration
    var mailOptions = {
        from: process.env.EMAIL,//sender email
        to: email,//list of receivers
        subject: 'reset password',
        description: 'click to reset your password',
        text: url
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);//gives the response as mail sent
        }
    })
}