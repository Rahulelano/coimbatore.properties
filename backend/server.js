const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 6005;

// Middleware
app.use(express.json()); // Reordered
app.use(cors()); // Reordered

// Static folder for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/homznspace')
  .then(() => console.log('✅ Connected to MongoDB')) // Changed message
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Routes
const propertyRoutes = require('./routes/properties');
const areaRoutes = require('./routes/areas'); // Renamed/New
const contactRoutes = require('./routes/contact');
const authRoutes = require('./routes/auth'); // Admin Auth
const inquiryRoutes = require('./routes/inquiries'); // Inquiry Routes

app.use('/api/properties', propertyRoutes);
app.use('/api/areas', areaRoutes); // Changed from cities to areas
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/inquiries', inquiryRoutes);

app.get('/', (req, res) => {
  res.send('Homznspace Backend API Running');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT} `);
});
