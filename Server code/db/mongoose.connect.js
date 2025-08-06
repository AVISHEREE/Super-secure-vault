import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "passwordManager", // optional: can set default DB name here
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.log("MongoDB connection error: ", err.message);
    process.exit(1);
  }
};

export default connectDB;