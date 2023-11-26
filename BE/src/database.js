import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js";

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Database is connected");
    } catch (error) {
        console.error(error);
    };
};

export const disconnectDB = async () => {
    try {
        console.log("Disconnecting from database");
        await this.mongoose.disconnect();
        console.log("Database was desconnected");
    } catch (error) {
        console.error(error);
    }
  };