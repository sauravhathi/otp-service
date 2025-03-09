import mongoose from "mongoose";
declare const connectDB: () => Promise<typeof mongoose>;
export default connectDB;
