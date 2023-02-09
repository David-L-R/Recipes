import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const connection = await mongoose.connect(process.env.MONGO_DB_URI);
    console.info(`MongoDB Connected:  ${connection.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
