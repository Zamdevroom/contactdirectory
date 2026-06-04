import mongoose from "mongoose";
import dotenv from "dotenv";

const connect = async () => {
    try {
        console.log("Connecting to database...");
        const conn = await mongoose.connect(
            "mongodb+srv://testuser:test123@contactdirectory.4uybg87.mongodb.net/contactdirectory?retryWrites=true&w=majority"
        );
        console.log("Database connected successfully.");
        return conn;
    } catch (error) {
        console.error("Error connecting to database:", error);
        throw error; // Rethrow to handle in server.js
    }
};

export default connect;
