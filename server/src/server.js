require("dotenv").config();

const app = require("./app");
const connectDatabase = require("./config/db");
const { port } = require("./config/env");
const seedAdmin = require("./seeders/seedAdmin");
const seedJobRoles = require("./seeders/seedJobRoles");

async function startServer() {
  try {
    // 1. Connect to MongoDB
    await connectDatabase();
    console.log("Database connected successfully");

    // 2. Run seeders (initial data setup)
    await seedAdmin();
    await seedJobRoles();
    console.log("Seeders executed successfully");

    // 3. Start server
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
}

startServer();