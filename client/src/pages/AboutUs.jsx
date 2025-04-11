import React from 'react';
import './AboutUs.css'; // Optional: create this for styling

const AboutUs = () => {
    return (
      <div className="about-us-container px-6 md:px-16 lg:px-24 xl:px-32 py-10 text-gray-800">
        <h1 className="text-3xl font-bold mb-4">About Us</h1>
  
        <p className="mb-4 text-lg font-medium">
          Welcome to <span className="text-green-600 font-bold">GreenCart</span> — Your Everyday Grocery Partner!
        </p>
  
        <p className="mb-4">
          GreenCart was born in 2025 with a simple idea: what if getting fresh groceries could be as easy and dependable as ordering a cup of coffee? 
          Started from a small garage with a laptop and a big dream, our journey began with a mission to bring freshness, quality, and convenience 
          right to your doorstep — without compromising on affordability.
        </p>
  
        <p className="mb-4">
          Today, GreenCart has grown into a dedicated team of global innovators, delivery partners, farmers, developers, logistics managers, and 
          customer support heroes — all working together to redefine how shopping for groceries works. From sourcing directly from trusted farms 
          and markets across the globe to ensuring 30-mins delivery within select cities, we’ve stayed committed to our core belief: 
          <strong> freshness is a promise, not a luxury.</strong>
        </p>
  
        <p className="mb-4">
          With thousands of satisfied customers, a growing catalog of daily essentials as freshly imported products, and a commitment to eco-friendly packaging, 
          we’re not just delivering groceries — we’re delivering trust, time savings, and peace of mind.
        </p>
  
        <p className="mb-4">
          Whether it’s your morning vegetables, weekly grocery list, or last-minute kitchen needs — 
          <strong> GreenCart is here to make your life easier, fresher, and better.</strong>
        </p>
  
        <h2 className="text-xl font-semibold mt-8 mb-4">Why GreenCart?</h2>
        <p>🛒 Wide Selection of fruits, vegetables, staples, dairy, snacks & more</p>
        <p>⏱️ Express Delivery within hours</p>
        <p>🥬 Farm-Fresh Quality straight from the source</p>
        <p>🌍 Imported Products from trusted global suppliers</p>
        <p>💵 Affordable Prices every day</p>
        <p>♻️ Eco-Friendly Practices because we care about our planet</p>
  
        <p className="mt-6 text-lg font-medium">
          From our cart to your kitchen — <span className="text-green-600 font-semibold">GreenCart</span> is your new habit for smart grocery shopping.
        </p>
        <p className="mt-2">Thank you for letting us be a part of your everyday life!</p>
      </div>
    );
};  

export default AboutUs;
