const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Inquiry = require('../models/Inquiry');
const Property = require('../models/Property');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_change_in_production';

// Middleware to verify Token
const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

// @route   POST /api/inquiries
// @desc    Create a new inquiry
// @access  Private (User)
router.post('/', auth, async (req, res) => {
    try {
        const { propertyId, message } = req.body;

        // Get property to find the agent
        const property = await Property.findById(propertyId);
        if (!property) return res.status(404).json({ msg: 'Property not found' });

        const inquiry = new Inquiry({
            user: req.user.user.id,
            property: propertyId,
            agent: property.agent, // Can be null if admin owned
            message
        });

        await inquiry.save();
        res.json(inquiry);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/inquiries/user
// @desc    Get all inquiries for the logged-in user
// @access  Private (User)
router.get('/user', auth, async (req, res) => {
    try {
        if (!req.user.user) {
            return res.status(403).json({ msg: 'Access denied' });
        }
        const inquiries = await Inquiry.find({ user: req.user.user.id })
            .populate('property', 'title location image')
            .populate('agent', 'name email phone')
            .sort({ created_at: -1 });
        res.json(inquiries);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/inquiries/agent
// @desc    Get all inquiries for the logged-in agent (or admin)
// @access  Private (Agent/Admin)
router.get('/agent', auth, async (req, res) => {
    try {
        // If Agent
        if (req.user.agent) {
            const inquiries = await Inquiry.find({ agent: req.user.agent.id })
                .populate('user', 'username email phone')
                .populate('property', 'title')
                .sort({ created_at: -1 });
            return res.json(inquiries);
        }

        // If Admin (Optional: Admin sees all or just their own?)
        // For now let's assume Admin sees inquiries for properties without agents (Admin properties)
        if (req.user.admin) {
            const inquiries = await Inquiry.find({ agent: null })
                .populate('user', 'username email phone')
                .populate('property', 'title')
                .sort({ created_at: -1 });
            return res.json(inquiries);
        }

        return res.status(403).json({ msg: 'Access denied' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
