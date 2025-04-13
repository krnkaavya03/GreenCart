import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const ProductCard = ({ product }) => {
    const { currency, addToCart, removeFromCart, cartItems, navigate } = useAppContext();

    const averageRating = product.averageRating || 0;
    const totalReviews = product.reviews?.length || 0;

    return (
        product && (
            <div
                onClick={() => {
                    navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
                    scrollTo(0, 0);
                }}
                className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white min-w-56 max-w-56 w-full"
            >
                {/* Product Image */}
                <div className="group cursor-pointer flex items-center justify-center px-2">
                    <img
                        className="group-hover:scale-105 transition max-w-26 md:max-w-36"
                        src={product.image[0]}
                        alt={product.name}
                    />
                </div>

                {/* Product Details */}
                <div className="text-gray-500/60 text-sm">
                    <p>{product.category}</p>
                    <p className="text-gray-700 font-medium text-lg truncate w-full">{product.name}</p>

                    {/* Dynamic Star Ratings + Displayed Average */}
                    <div className="flex items-center gap-1">
                        {Array(5).fill("").map((_, i) => (
                            <img
                                key={i}
                                className="md:w-3.5 w-3"
                                src={i < Math.round(averageRating) ? assets.star_icon : assets.star_dull_icon}
                                alt="star"
                            />
                        ))}
                        <span className="text-sm text-yellow-600 font-semibold">({averageRating.toFixed(1)})</span>
                        <p className="text-xs text-gray-400 ml-1">[{totalReviews} reviews]</p>
                    </div>

                    {/* Price and Cart Actions */}
                    <div className="flex items-end justify-between mt-3">
                        {/* Product Price */}
                        <p className="md:text-xl text-base font-medium text-primary">
                            {currency}
                            {product.offerPrice}{" "}
                            <span className="text-gray-500/60 md:text-sm text-xs line-through">
                                {currency}
                                {product.price}
                            </span>
                        </p>

                        {/* Add/Remove from Cart */}
                        <div
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                            className="text-primary"
                        >
                            {!cartItems[product._id] ? (
                                <button
                                    className="flex items-center justify-center gap-1 bg-primary/10 border border-primary/40 md:w-[80px] w-[64px] h-[34px] rounded cursor-pointer"
                                    onClick={() => addToCart(product._id)}
                                >
                                    <img src={assets.cart_icon} alt="cart_icon" />
                                    Add
                                </button>
                            ) : (
                                <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-primary/25 rounded select-none">
                                    <button
                                        onClick={() => {
                                            removeFromCart(product._id);
                                        }}
                                        className="cursor-pointer text-md px-2 h-full"
                                    >
                                        -
                                    </button>
                                    <span className="w-5 text-center">{cartItems[product._id]}</span>
                                    <button
                                        onClick={() => {
                                            addToCart(product._id);
                                        }}
                                        className="cursor-pointer text-md px-2 h-full"
                                    >
                                        +
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default ProductCard;
