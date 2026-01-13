const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/homznspace')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const createAdmin = async () => {
    try {
        const username = 'admin@coimbatore.com'; // Using email as username per user request
        const password = 'coimbatore@properties';

        let admin = await Admin.findOne({ username });
        if (admin) {
            console.log('Admin already exists. Updating password...');
        } else {
            admin = new Admin({ username });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        admin.password = hashedPassword;

        await admin.save();
        console.log('Admin registered/updated successfully');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

createAdmin();
