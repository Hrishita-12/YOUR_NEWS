const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

// Hardcoded admin credentials (only for development!)
const ADMIN_CREDENTIALS = {
  name: "System Admin",
  email: "admin@newsapp.com", 
  password: "SecureAdminPassword123!" // Will be hashed
};

async function initializeAdmin() {
  try {
    await mongoose.connect('mongodb://localhost:27017/userdb');
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: ADMIN_CREDENTIALS.email });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(ADMIN_CREDENTIALS.password, 10);
      
      await User.create({
        name: ADMIN_CREDENTIALS.name,
        email: ADMIN_CREDENTIALS.email,
        password: hashedPassword,
        isAdmin: true
      });
      
      console.log('✅ Admin account created');
    } else {
      console.log('ℹ️ Admin account already exists');
    }
  } catch (err) {
    console.error('Error creating admin:', err);
  } finally {
    mongoose.disconnect();
  }
}

initializeAdmin();