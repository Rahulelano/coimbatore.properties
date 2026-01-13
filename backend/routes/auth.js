const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const User = require('../models/User');
const Agent = require('../models/Agent');
const nodemailer = require('nodemailer');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_change_in_production';

// Email Configuration
const emailUser = process.env.EMAIL_USER || 'onecoimbatore@gmail.com';
const emailPass = process.env.EMAIL_PASS || 'jcms rjqc apxl tret';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: emailUser,
        pass: emailPass
    }
});

// Register Admin (One-time setup or protected)
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        // Check if admin exists
        let admin = await Admin.findOne({ username });
        if (admin) {
            return res.status(400).json({ msg: 'Admin already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        admin = new Admin({
            username,
            password: hashedPassword
        });

        await admin.save();
        res.status(201).json({ msg: 'Admin registered successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Login Admin
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const payload = {
            admin: {
                id: admin.id
            }
        };

        jwt.sign(
            payload,
            JWT_SECRET,
            { expiresIn: '24h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Register User
router.post('/user/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            JWT_SECRET,
            { expiresIn: '24h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Login User
router.post('/user/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            JWT_SECRET,
            { expiresIn: '24h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// --- AGENT ROUTES ---

// Register Agent
router.post('/agent/register', async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        let agent = await Agent.findOne({ email });
        if (agent) {
            return res.status(400).json({ msg: 'Agent already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        agent = new Agent({
            name,
            email,
            phone,
            password: hashedPassword,
            isApproved: false // Default to false
        });

        await agent.save();

        // --- EMAIL NOTIFICATIONS ---
        if (emailUser && emailPass) {
            // 1. Email to Admin
            const adminEmailOptions = {
                from: `"Coimbatore Properties" <${emailUser}>`,
                to: emailUser,
                subject: `New Agent Application: ${name}`,
                html: `
                    <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
                        <h2 style="color: #eab308;">New Agent Registration Request</h2>
                        <p>A new agent has registered and is waiting for approval.</p>
                        <hr/>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Phone:</strong> ${phone}</p>
                        <hr/>
                        <p>Please log in to the Admin Dashboard to review this application.</p>
                    </div>
                `
            };

            // 2. Welcome Email to Agent
            const agentEmailOptions = {
                from: `"Coimbatore Properties" <${emailUser}>`,
                to: email,
                subject: `Welcome to Coimbatore Properties - Application Received`,
                html: `
                    <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
                        <h2 style="color: #eab308;">Hello ${name},</h2>
                        <p>Thank you for registering as an agent on <strong>Coimbatore Properties</strong>.</p>
                        <p>Your application has been received and is currently <span style="color: #f97316; font-weight: bold;">pending approval</span> from our admin team.</p>
                        <p>We will notify you via email once your account has been approved. Usually, this process takes 24-48 hours.</p>
                        <br/>
                        <p>Best Regards,<br/><strong>Coimbatore Properties Team</strong></p>
                    </div>
                `
            };

            try {
                await transporter.sendMail(adminEmailOptions);
                await transporter.sendMail(agentEmailOptions);
                console.log('📧 Agent registration emails sent');
            } catch (emailErr) {
                console.error('❌ Agent registration emails failed:', emailErr);
            }
        }

        res.status(201).json({ msg: 'Registration successful. Please wait for admin approval.' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Login Agent
router.post('/agent/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const agent = await Agent.findOne({ email });
        if (!agent) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        if (!agent.isApproved) {
            return res.status(403).json({ msg: 'Account pending approval. Please contact admin.' });
        }

        const isMatch = await bcrypt.compare(password, agent.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const payload = {
            agent: {
                id: agent.id
            }
        };

        jwt.sign(
            payload,
            JWT_SECRET,
            { expiresIn: '24h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, agent: { id: agent.id, name: agent.name, email: agent.email } });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// --- ADMIN ROUTES FOR AGENTS ---

// Get Pending Agents
router.get('/admin/pending-agents', async (req, res) => {
    try {
        const agents = await Agent.find({ isApproved: false }).select('-password');
        res.json(agents);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Approve Agent
router.put('/admin/approve-agent/:id', async (req, res) => {
    try {
        let agent = await Agent.findById(req.params.id);
        if (!agent) return res.status(404).json({ msg: 'Agent not found' });

        agent.isApproved = true;
        await agent.save();

        // --- EMAIL NOTIFICATION TO AGENT ---
        if (emailUser && emailPass) {
            const approvalEmailOptions = {
                from: `"Coimbatore Properties" <${emailUser}>`,
                to: agent.email,
                subject: `Account Approved - Coimbatore Properties`,
                html: `
                    <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
                        <h2 style="color: #10b981;">Congratulations ${agent.name}!</h2>
                        <p>Your agent account on <strong>Coimbatore Properties</strong> has been <span style="color: #10b981; font-weight: bold;">approved</span>.</p>
                        <p>You can now log in to your dashboard to post properties and manage your leads.</p>
                        <div style="margin: 30px 0;">
                            <a href="http://localhost:8080/agent/login" style="background-color: #eab308; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Login to Dashboard</a>
                        </div>
                        <p>Best Regards,<br/><strong>Coimbatore Properties Team</strong></p>
                    </div>
                `
            };

            try {
                await transporter.sendMail(approvalEmailOptions);
                console.log('📧 Agent approval email sent');
            } catch (emailErr) {
                console.error('❌ Agent approval email failed:', emailErr);
            }
        }

        res.json({ msg: 'Agent approved successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Reject/Delete Agent
router.delete('/admin/reject-agent/:id', async (req, res) => {
    try {
        await Agent.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Agent rejected/removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// --- PROFILE ROUTES ---

// Get User Profile
router.get('/user/profile', async (req, res) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.user.id).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Update User Profile
router.put('/user/profile', async (req, res) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const { username, phone, favorites } = req.body;

        let user = await User.findById(decoded.user.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });

        if (username) user.username = username;
        if (phone) user.phone = phone;
        if (favorites) user.favorites = favorites;

        await user.save();
        res.json(user);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Get Agent Profile
router.get('/agent/profile', async (req, res) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const agent = await Agent.findById(decoded.agent.id).select('-password');
        res.json(agent);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Update Agent Profile
router.put('/agent/profile', async (req, res) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const { name, phone } = req.body; // Agent email usually static or handled separately

        let agent = await Agent.findById(decoded.agent.id);
        if (!agent) return res.status(404).json({ msg: 'Agent not found' });

        if (name) agent.name = name;
        if (phone) agent.phone = phone;

        await agent.save();
        res.json(agent);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
