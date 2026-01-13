const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'onecoimbatore@gmail.com',
        pass: 'jcms rjqc apxl tret'
    }
});

const mailOptions = {
    from: 'onecoimbatore@gmail.com',
    to: 'onecoimbatore@gmail.com',
    subject: 'Test Email from Helper',
    text: 'If you see this, the credentials are working!'
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log('Error:', error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});
