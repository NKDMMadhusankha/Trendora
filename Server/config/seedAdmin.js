require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected');
    // Clear existing admin user (if any)
    await User.deleteOne({ email: 'admin@gmail.com' });
    console.log('Removed existing admin user if present');
    // Create default admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    await User.create({
      fullName: 'System Admin',
      email: 'admin@gmail.com',
      password: adminPassword
    });
    console.log('Default admin user created (admin@gmail.com / admin123)');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Error:', err);
    process.exit(1);
  });
