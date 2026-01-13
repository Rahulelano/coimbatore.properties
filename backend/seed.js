const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Property = require('./models/Property');

dotenv.config();

const properties = [
    // Saravanampatti
    {
        title: "Luxurious 3BHK Apartment in Saravanampatti",
        description: "Spacious 3BHK flat near KGISL Tech Park with modern amenities and great connectivity.",
        price: "65 Lacs",
        location: "Near KGISL",
        area: "Saravanampatti",
        city: "Coimbatore",
        type: "Apartment",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
        bedrooms: "3 BHK",
        bathrooms: 3,
        sqft: "1450 sqft",
        possession: "Ready to Move",
        builder: "Casagrand",
        amenities: ["Swimming Pool", "Gym", "Clubhouse", "24/7 Security"],
        rating: 4.8,
        reviews: 24,
        status: "Available",
        is_featured: true
    },
    {
        title: "Premium Villa Community in Saravanampatti",
        description: "Independent 4BHK Villa with private garden in a gated community.",
        price: "1.2 Cr",
        location: "Saravanampatti Main Road",
        area: "Saravanampatti",
        city: "Coimbatore",
        type: "Villa",
        image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?w=800&q=80",
        bedrooms: "4 BHK",
        bathrooms: 4,
        sqft: "2200 sqft",
        possession: "Dec 2024",
        builder: "G Square",
        amenities: ["Park", "Jogging Track", "Community Hall"],
        rating: 4.9,
        reviews: 15,
        status: "Under Construction",
        is_featured: true
    },
    // Peelamedu
    {
        title: "Smart Home Apartment in Peelamedu",
        description: "High-end 2BHK apartment walkable from PSG Tech.",
        price: "55 Lacs",
        location: "Avinashi Road",
        area: "Peelamedu",
        city: "Coimbatore",
        type: "Apartment",
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
        bedrooms: "2 BHK",
        bathrooms: 2,
        sqft: "1100 sqft",
        possession: "Ready to Move",
        builder: "Puravankara",
        amenities: ["Rooftop Garden", "Gym", "Covered Parking"],
        rating: 4.6,
        reviews: 18,
        status: "Available",
        is_featured: false
    },
    {
        title: "Commercial Space on Avinashi Road",
        description: "Prime commercial office space suitable for IT startups.",
        price: "2.5 Cr",
        location: "Peelamedu",
        area: "Peelamedu",
        city: "Coimbatore",
        type: "Commercial",
        image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80",
        sqft: "3000 sqft",
        possession: "Immediate",
        builder: "Sobha",
        amenities: ["Power Backup", "Lift", "Parking"],
        rating: 5.0,
        reviews: 8,
        status: "Available",
        is_featured: true
    },
    // R.S. Puram
    {
        title: "Ultra Luxury Condo in R.S. Puram",
        description: "Elite 4BHK residence in the most prestigious neighborhood of Coimbatore.",
        price: "3.5 Cr",
        location: "D.B. Road",
        area: "R.S. Puram",
        city: "Coimbatore",
        type: "Apartment",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
        bedrooms: "4 BHK",
        bathrooms: 5,
        sqft: "3500 sqft",
        possession: "Ready to Move",
        builder: "Risely",
        amenities: ["Concierge", "Infinity Pool", "Spa"],
        is_featured: true
    },
    {
        title: "Heritage Row House in R.S. Puram",
        description: "Beautifully restored vintage row house with modern interiors.",
        price: "2.8 Cr",
        location: "West Periasamy Road",
        area: "R.S. Puram",
        city: "Coimbatore",
        type: "Row House",
        image: "https://images.unsplash.com/photo-1600596542815-2495db98dada?w=800&q=80",
        bedrooms: "3 BHK",
        bathrooms: 3,
        sqft: "2400 sqft",
        possession: "Immediate",
        is_featured: false
    },
    // Gandhipuram
    {
        title: "Affordable 2BHK in Gandhipuram",
        description: "Centrally located apartment near Cross Cut Road, ideal for families.",
        price: "45 Lacs",
        location: "Cross Cut Road",
        area: "Gandhipuram",
        city: "Coimbatore",
        type: "Apartment",
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
        bedrooms: "2 BHK",
        bathrooms: 2,
        sqft: "950 sqft",
        possession: "Ready to Move",
        builder: "Jain Housing",
        amenities: ["Water Supply", "Lift"],
        is_featured: false
    },
    // Vadavalli
    {
        title: "Hill View Villa in Vadavalli",
        description: "Serene 3BHK villa with a stunning view of the Western Ghats.",
        price: "90 Lacs",
        location: "Maruthamalai Road",
        area: "Vadavalli",
        city: "Coimbatore",
        type: "Villa",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
        bedrooms: "3 BHK",
        bathrooms: 3,
        sqft: "1800 sqft",
        possession: "March 2025",
        builder: "Sree Daksha",
        amenities: ["Garden", "Clubhouse", "Temple"],
        is_featured: true
    },
    {
        title: "Residential Plot in Vadavalli",
        description: "Approved plot in a rapidly developing residential area.",
        price: "35 Lacs",
        location: "Thondamuthur Road",
        area: "Vadavalli",
        city: "Coimbatore",
        type: "Plot",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
        sqft: "1500 sqft",
        possession: "Immediate",
        is_featured: false
    },
    // Singanallur
    {
        title: "Lakeview Apartment in Singanallur",
        description: "Modern apartment complex facing Singanallur lake.",
        price: "50 Lacs",
        location: "Trichy Road",
        area: "Singanallur",
        city: "Coimbatore",
        type: "Apartment",
        image: "https://images.unsplash.com/photo-1484154218962-a1c002085d2f?w=800&q=80",
        bedrooms: "2 BHK",
        bathrooms: 2,
        sqft: "1050 sqft",
        possession: "Ready to Move",
        builder: "TVH",
        amenities: ["Jogging Track", "Play Area"],
        is_featured: false
    },
    // Podanur
    {
        title: "Budget Homes in Podanur",
        description: "Value for money 1BHK and 2BHK apartments near Railway station.",
        price: "32 Lacs",
        location: "Chettipalayam Road",
        area: "Podanur",
        city: "Coimbatore",
        type: "Apartment",
        image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
        bedrooms: "2 BHK",
        bathrooms: 1,
        sqft: "800 sqft",
        possession: "Ready to Move",
        builder: "Provident",
        amenities: ["Gated Community", "Security"],
        is_featured: false
    },
    // Kovaipudur
    {
        title: "Resort Style Villa in Kovaipudur",
        description: "A getaway home in 'Little Ooty' with cool climate all year round.",
        price: "1.1 Cr",
        location: "Kovaipudur",
        area: "Kovaipudur",
        city: "Coimbatore",
        type: "Villa",
        image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
        bedrooms: "3 BHK",
        bathrooms: 3,
        sqft: "2000 sqft",
        possession: "Ready to Move",
        builder: "Rakindo",
        amenities: ["Nature Trail", "Clubhouse"],
        is_featured: true
    },
    // Thudiyalur
    {
        title: "Gated Community Plots in Thudiyalur",
        description: "DTCP approved plots near Mettupalayam Road.",
        price: "25 Lacs",
        location: "Mettupalayam Road",
        area: "Thudiyalur",
        city: "Coimbatore",
        type: "Plot",
        image: "https://images.unsplash.com/photo-1628624747186-a941c476b7ef?w=800&q=80",
        sqft: "1200 sqft",
        possession: "Immediate",
        is_featured: false
    },
    // Ganapathy
    {
        title: "Compact 2BHK in Ganapathy",
        description: "Ideally located close to IT parks and shopping centers.",
        price: "48 Lacs",
        location: "Sathy Road",
        area: "Ganapathy",
        city: "Coimbatore",
        type: "Apartment",
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
        bedrooms: "2 BHK",
        bathrooms: 2,
        sqft: "1000 sqft",
        possession: "Pre Launch",
        builder: "Srivari",
        is_featured: true
    }
];

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/homznspace')
    .then(async () => {
        console.log('✅ Connected to MongoDB...');

        // Clear existing data
        await Property.deleteMany({});
        console.log('🗑️ Existing properties cleared');

        // Insert new data
        await Property.insertMany(properties);
        console.log('🌱 Data seeded successfully (Coimbatore Areas)');

        process.exit();
    })
    .catch(err => {
        console.error('❌ Error seeding data:', err);
        process.exit(1);
    });
