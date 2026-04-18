import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000
    });

    console.log("✅ MongoDB Connected:", conn.connection.host);

  } catch (error) {
    console.error("❌ MongoDB Connection Error:");
    console.error(error.message);

    process.exit(1); // stop server if DB fails
  }
};

export default connectDB;