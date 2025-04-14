import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        trim: true, 
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'] // Email validation
    },
    password: { type: String, required: true },
    cartItems: { type: Object, default: {}, required: false }
}, { 
    minimize: false, 
    timestamps: true, // Automatically add createdAt and updatedAt fields
    versionKey: false  // Remove the __v field
});

// Ensure email uniqueness with better error handling
userSchema.index({ email: 1 }, { unique: true });

const User = mongoose.models.user || mongoose.model('user', userSchema);

export default User;