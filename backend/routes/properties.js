const express = require('express');
const router = express.Router();
const Property = require('../models/Property');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');

// Middleware to verify Token (Admin or Agent)
const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key_change_in_production');

        req.user = decoded; // Generic user object attached to req

        if (decoded.admin) {
            req.admin = decoded.admin;
        }
        if (decoded.agent) {
            req.agent = decoded.agent;
        }
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

// Multer Config for Image Upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Ensure this directory exists or create it. For now assuming 'uploads' exists in root or public.
        // Better to put in 'public/uploads' if serving statically.
        // Let's assume backend/uploads exists.
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// @route   GET /api/properties
// @desc    Get all properties (with filters)
// @access  Public
router.get('/', async (req, res) => {
    try {
        const { city, type, status, minPrice, maxPrice, area, featured } = req.query; // Added area
        let query = {};

        if (city) query.city = new RegExp(city, 'i'); // Case-insensitive
        if (area) query.area = new RegExp(area, 'i'); // Filter by Area
        if (type && type !== 'all') query.type = type; // Exact match for type (enum)
        if (status) query.possession = new RegExp(status, 'i'); // Loose match for status/possession
        if (featured === 'true') query.is_featured = true;

        // Price filtering roughly implemented (assuming stored as string like "1.5 Cr")
        // For precise filtering, price should be stored as Number. 
        // Skipping complex price logic for now as requested to keep it simple or strictly matching provided mock structure.

        const properties = await Property.find(query).sort({ created_at: -1 });
        res.json(properties);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/properties/my-listings
// @desc    Get properties for logged-in Agent
// @access  Private (Agent)
router.get('/my-listings', auth, async (req, res) => {
    try {
        if (!req.agent) {
            return res.status(403).json({ msg: 'Access denied: Agents only' });
        }
        const properties = await Property.find({ agent: req.agent.id }).sort({ created_at: -1 });
        res.json(properties);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/properties/:id
// @desc    Get property by ID
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ msg: 'Property not found' });
        }
        res.json(property);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Property not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/properties
// @desc    Create a new property
// @access  Private (Admin)
router.post('/', auth, upload.fields([{ name: 'images', maxCount: 10 }, { name: 'video', maxCount: 1 }, { name: 'brochure', maxCount: 1 }]), async (req, res) => {
    try {
        const propertyData = JSON.parse(req.body.data); // Expecting JSON string for data

        const baseUrl = req.protocol + '://' + req.get('host');
        propertyData.images = [];

        // Hnadle Images
        if (req.files && req.files.images) {
            req.files.images.forEach(file => {
                propertyData.images.push(baseUrl + '/uploads/' + file.filename);
            });
            // Set cover image to first uploaded image
            if (propertyData.images.length > 0) {
                propertyData.image = propertyData.images[0];
            }
        }

        // Handle Video
        if (req.files && req.files.video) {
            propertyData.video = baseUrl + '/uploads/' + req.files.video[0].filename;
        }

        // Handle Brochure
        if (req.files && req.files.brochure) {
            propertyData.brochure_url = baseUrl + '/uploads/' + req.files.brochure[0].filename;
        }

        // Assign Agent if creating as Agent
        if (req.agent) {
            propertyData.agent = req.agent.id;
        }

        const newProperty = new Property(propertyData);
        const property = await newProperty.save();
        res.json(property);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/properties/:id
// @desc    Update a property
// @access  Private (Admin or Owner Agent)
router.put('/:id', auth, upload.fields([{ name: 'images', maxCount: 10 }, { name: 'video', maxCount: 1 }, { name: 'brochure', maxCount: 1 }]), async (req, res) => {
    try {
        let property = await Property.findById(req.params.id);
        if (!property) return res.status(404).json({ msg: 'Property not found' });

        // Check ownership if Agent
        if (req.agent && property.agent && property.agent.toString() !== req.agent.id) {
            return res.status(401).json({ msg: 'Not authorized to update this property' });
        }
        // Agents cannot edit properties they don't own (and properties without agent are likely Admin's)
        if (req.agent && !property.agent) {
            return res.status(401).json({ msg: 'Not authorized to update this property' });
        }


        const propertyData = JSON.parse(req.body.data);

        const baseUrl = req.protocol + '://' + req.get('host');

        // If new images are uploaded
        if (req.files && req.files.images) {
            if (!propertyData.images) propertyData.images = property.images || [];

            req.files.images.forEach(file => {
                const imgUrl = baseUrl + '/uploads/' + file.filename;
                propertyData.images.push(imgUrl);
            });

            if (!property.image && propertyData.images.length > 0) {
                propertyData.image = propertyData.images[0];
            }
        }

        // If new video is uploaded
        if (req.files && req.files.video) {
            propertyData.video = baseUrl + '/uploads/' + req.files.video[0].filename;
        }

        // If new brochure is uploaded
        if (req.files && req.files.brochure) {
            propertyData.brochure_url = baseUrl + '/uploads/' + req.files.brochure[0].filename;
        }

        property = await Property.findByIdAndUpdate(
            req.params.id,
            { $set: propertyData },
            { new: true }
        );

        res.json(property);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/properties/:id
// @desc    Delete a property
// @access  Private (Admin or Owner Agent)
router.delete('/:id', auth, async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) return res.status(404).json({ msg: 'Property not found' });

        // Check ownership if Agent
        if (req.agent && property.agent && property.agent.toString() !== req.agent.id) {
            return res.status(401).json({ msg: 'Not authorized to delete this property' });
        }
        if (req.agent && !property.agent) {
            return res.status(401).json({ msg: 'Not authorized to delete this property' });
        }

        await Property.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Property removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
