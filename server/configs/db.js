import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/greencart`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 15000
        });

        mongoose.connection.on('connected', () => {
            console.log("MongoDB connected successfully");
        });

    } catch (error) {
        console.error("MongoDB connection error:", error.message);
    }
};

export default connectDB;
