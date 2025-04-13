import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: Array, required: true },
        price: { type: Number, required: true },
        offerPrice: { type: Number, required: true },
        image: { type: Array, required: true },
        category: { type: String, required: true },
        inStock: { type: Boolean, default: true },
        averageRating: { type: Number, default: 0 }, // Default average rating
        reviews: [
            {
                rating: { type: Number, required: true }, // User's rating (1-5 stars)
                comment: { type: String }, // User's optional comment
                createdAt: { type: Date, default: Date.now }, // Timestamp of the review
            },
        ],
    },
    { timestamps: true }
);

// Pre-save hook to calculate averageRating automatically
productSchema.pre("save", function (next) {
    if (this.reviews.length > 0) {
        const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
        this.averageRating = totalRating / this.reviews.length;
    } else {
        this.averageRating = 0;
    }
    next();
});

const Product = mongoose.models.product || mongoose.model("product", productSchema);

export default Product;