const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    area: { // New field for Coimbatore areas
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true,
        default: 'Coimbatore'
    },
    type: {
        type: String,
        required: true,
        enum: ['Apartment', 'Villa', 'Plot', 'Row House', 'Villament', 'Commercial'] // Added Commercial
    },
    listingType: {
        type: String,
        required: true,
        enum: ['Sale', 'Rent'],
        default: 'Sale'
    },
    image: {
        type: String,
        required: true
    },
    images: [{
        type: String
    }],
    video: {
        type: String,
        required: false
    },
    bedrooms: {
        type: String,
        required: false
    },
    bathrooms: {
        type: Number,
        required: false
    },
    sqft: {
        type: String,
        required: false
    },
    possession: {
        type: String,
        required: false
    },
    builder: {
        type: String,
        required: false
    },
    amenities: [{
        type: String
    }],
    is_featured: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 4.5
    },
    reviews: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: 'Available'
    },
    whatsapp: {
        type: String, // Admin entry: "9199999999"
        required: false
    },
    booking_url: {
        type: String, // Admin entry: "https://example.com/book"
        required: false
    },
    brochure_url: {
        type: String, // Link to PDF
        required: false
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    agent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agent',
        required: false
    }
});

module.exports = mongoose.model('Property', propertySchema);
