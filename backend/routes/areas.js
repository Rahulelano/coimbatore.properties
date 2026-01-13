const express = require('express');
const router = express.Router();
const Property = require('../models/Property');

// Get all unique areas
router.get('/', async (req, res) => {
    try {
        // Find distinct areas from properties collection
        const areas = await Property.distinct('area');
        // Filter out any null/empty values and sort
        const cleanAreas = areas.filter(a => a).sort();
        res.json(cleanAreas);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
