require('dotenv').config();
const mongoose = require('mongoose');

const mongoConnect = async () => {
  try {
    const url = process.env.MONGODB_CONNECT_URL;
    if (!url) {
      throw new Error('MONGODB_CONNECT_URL is not defined in the environment variables');
    }
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 20000,
    });
    console.log("Mongo is connected successfully");
  } catch (error) {
    console.error("Mongo connection error:", error.message);
    process.exit(1);
  }
};

module.exports = { mongoConnect };
