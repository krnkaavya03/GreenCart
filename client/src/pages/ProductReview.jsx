import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaStar } from "react-icons/fa";

const ProductReview = () => {
    const { id } = useParams(); // Get the product ID from the URL
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);
    const [comment, setComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch product details and reviews
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`/api/product/id/${id}`);
                setProduct(data.product);
                setReviews(data.product.reviews || []);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        fetchProduct();
    }, [id]);

    // Handle review submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await axios.post("/api/product/rate", {
                id,
                rating,
                comment,
            });
            setComment("");
            setRating(0);
            setHover(null);

            // Fetch updated reviews
            const { data } = await axios.get(`/api/product/id/${id}`);
            setReviews(data.product.reviews || []);
            setIsSubmitting(false);
        } catch (error) {
            console.error("Error submitting review:", error);
            setIsSubmitting(false);
        }
    };

    // Calculate average rating
    const averageRating =
        reviews.length > 0
            ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
            : 0;

    return (
        <div className="container mx-auto mt-8">
            {product && (
                <>
                    <h1 className="text-3xl font-bold">{product.name}</h1>
                    <img
                        src={product.image[0]}
                        alt={product.name}
                        className="w-64 h-64 object-cover rounded-md my-4"
                    />
                    <p className="text-gray-700">{product.description.join(", ")}</p>

                    {/* Average Rating */}
                    <div className="my-4">
                        <h2 className="text-xl font-semibold">Average Rating</h2>
                        <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, index) => (
                                <FaStar
                                    key={index}
                                    color={index < Math.round(averageRating) ? "#ffc107" : "#e4e5e9"}
                                    size={24}
                                />
                            ))}
                            <p className="ml-2 text-gray-600">({averageRating.toFixed(1)} / 5)</p>
                        </div>
                        <p className="text-gray-600">{reviews.length} reviews</p>
                    </div>

                    {/* Review Form */}
                    <form onSubmit={handleSubmit} className="my-8">
                        <h2 className="text-xl font-semibold">Leave a Review</h2>
                        <div className="flex items-center gap-1 my-2">
                            {[...Array(5)].map((_, index) => (
                                <button
                                    type="button"
                                    key={index}
                                    onClick={() => setRating(index + 1)}
                                    onMouseEnter={() => setHover(index + 1)}
                                    onMouseLeave={() => setHover(null)}
                                    className="focus:outline-none"
                                >
                                    <FaStar
                                        size={32}
                                        color={index < (hover || rating) ? "#ffc107" : "#e4e5e9"}
                                    />
                                </button>
                            ))}
                        </div>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Write your review..."
                            className="w-full border border-gray-300 rounded-md p-2"
                            rows="4"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-primary text-white py-2 px-4 rounded-md mt-4"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Submitting..." : "Submit Review"}
                        </button>
                    </form>

                    {/* Review List */}
                    <div>
                        <h2 className="text-xl font-semibold">Customer Reviews</h2>
                        {reviews.length > 0 ? (
                            reviews.map((review, index) => (
                                <div key={index} className="border rounded-md p-4 my-4">
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar
                                                key={i}
                                                color={i < review.rating ? "#ffc107" : "#e4e5e9"}
                                                size={20}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-gray-600 mt-2">{review.comment}</p>
                                    <p className="text-sm text-gray-400 mt-1">
                                        {new Date(review.createdAt).toLocaleString()}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600 mt-4">No reviews yet. Be the first to review this product!</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default ProductReview;