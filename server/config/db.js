import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const connection = await mongoose.connect(process.env.MONGO_DB_URI);
    console.log(`MongoDB Connected:  ${connection.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
