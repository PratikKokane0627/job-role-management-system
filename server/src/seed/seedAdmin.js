const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const User = require("../models/User");

async function createAdmin() {
  await mongoose.connect(process.env.MONGODB_URI);

  const existing = await User.findOne({ email: process.env.ADMIN_EMAIL });

  if (!existing) {
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    await User.create({
      name: process.env.ADMIN_NAME,
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword
    });

    console.log("Admin created successfully");
  } else {
    console.log("Admin already exists");
  }

  process.exit();
}

createAdmin();