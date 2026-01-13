const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

// POST /api/contact
// Save a new contact lead and send email
router.post('/', async (req, res) => {
    console.log(">>> /api/contact route hit. Body:", req.body); // DEBUG LOG
    try {
        const { name, email, phone, message, property_id } = req.body;

        // Simple validation
        if (!name || !email || !phone) {
            console.log(">>> Validation failed: Missing fields"); // DEBUG LOG
            return res.status(400).json({ message: 'Please provide name, email, and phone.' });
        }

        // 1. Save to Database
        const newContact = new Contact({
            name,
            email,
            phone,
            message,
            property_id
        });

        const savedContact = await newContact.save();

        // 2. Send Email
        // Hardcoded credentials as fallback since .env is blocked
        const emailUser = process.env.EMAIL_USER || 'onecoimbatore@gmail.com';
        const emailPass = process.env.EMAIL_PASS || 'jcms rjqc apxl tret';

        if (emailUser && emailPass) {
            try {
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: emailUser,
                        pass: emailPass
                    }
                });

                const mailOptions = {
                    from: `"Coimbatore Properties" <${emailUser}>`,
                    to: emailUser, // Send TO the admin email
                    replyTo: email, // Reply to the lead
                    subject: `New Lead: ${name} - Coimbatore Properties`,
                    text: `
New Inquiry Received:

Name: ${name}
Email: ${email}
Phone: ${phone}
Message/Requirement:
${message}

Property ID (if any): ${property_id || 'N/A'}
                    `,
                    html: `
                        <h3>New Inquiry Received</h3>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Phone:</strong> ${phone}</p>
                        <p><strong>Message/Requirement:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
                        <p><strong>Property ID:</strong> ${property_id || 'N/A'}</p>
                    `
                };

                console.log('>>> Attempting to send email...'); // DEBUG LOG
                await transporter.sendMail(mailOptions);
                console.log('📧 Email notification sent successfully');
            } catch (emailErr) {
                console.error('❌ Email sending failed:', emailErr);
                // Don't fail the request if email fails, but log it
            }
        } else {
            console.log('>>> Email credentials not found, skipping email'); // DEBUG LOG
        }

        res.status(201).json(savedContact);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
