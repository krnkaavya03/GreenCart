import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import Stripe from "stripe";

// ✅ Currency conversion rate
const INR_TO_USD = 1 / 82.5; // 1 INR ≈ 0.0121 USD

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

// ----------------------------
// ✅ PLACE ORDER - CASH ON DELIVERY
// ----------------------------
export const placeOrderCOD = async (req, res) => {
    try {
        const { userId, items, address } = req.body;

        if (!userId || !address || !items || items.length === 0) {
            return res.status(400).json({ success: false, message: "Invalid request data." });
        }

        let amount = 0;

        for (const item of items) {
            const product = await Product.findById(item.product);
            if (!product) continue;
            amount += product.offerPrice * item.quantity;
        }

        // Add 2% tax
        amount += Math.floor(amount * 0.02);

        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "COD",
        });

        return res.json({ success: true, message: "✅ Order placed successfully (COD)." });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// ----------------------------
// ✅ PLACE ORDER - STRIPE
// ----------------------------
export const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, address } = req.body;
        const { origin } = req.headers;

        if (!userId || !address || !items || items.length === 0) {
            return res.status(400).json({ success: false, message: "Invalid request data." });
        }

        let amount = 0;
        const productData = [];

        for (const item of items) {
            const product = await Product.findById(item.product);
            if (!product) continue;

            const priceWithTax = product.offerPrice + product.offerPrice * 0.02;
            amount += product.offerPrice * item.quantity;

            productData.push({
                name: product.name,
                quantity: item.quantity,
                price: product.offerPrice,
                priceWithTax,
            });
        }

        // Add 2% tax
        amount += Math.floor(amount * 0.02);

        const order = await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "Online",
        });

        const line_items = productData.map(item => {
            const priceInUSD = Math.round(item.priceWithTax * INR_TO_USD * 100); // cents
            return {
                price_data: {
                    currency: "usd",
                    product_data: { name: item.name },
                    unit_amount: priceInUSD,
                },
                quantity: item.quantity,
            };
        });

        const session = await stripeInstance.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${origin}/loader?next=my-orders`,
            cancel_url: `${origin}/cart`,
            metadata: {
                orderId: order._id.toString(),
                userId,
            },
        });

        return res.json({ success: true, url: session.url });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// ----------------------------
// ✅ STRIPE WEBHOOK - VERIFY PAYMENT
// ----------------------------
export const stripeWebhooks = async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
        event = stripeInstance.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (error) {
        return res.status(400).send(`❌ Webhook Error: ${error.message}`);
    }

    switch (event.type) {
        case "checkout.session.completed": {
            const session = event.data.object;
            const { orderId, userId } = session.metadata;

            await Order.findByIdAndUpdate(orderId, { isPaid: true });
            await User.findByIdAndUpdate(userId, { cartItems: {} });

            break;
        }

        case "checkout.session.async_payment_failed": {
            const session = event.data.object;
            const { orderId } = session.metadata;

            await Order.findByIdAndDelete(orderId);
            break;
        }

        default:
            console.log(`⚠️ Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
};

// ----------------------------
// ✅ GET USER ORDERS
// ----------------------------
export const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID required." });
        }

        const orders = await Order.find({
            userId,
            $or: [{ paymentType: "COD" }, { isPaid: true }]
        })
            .populate("items.product")
            .populate("address")
            .sort({ createdAt: -1 });

        return res.json({ success: true, orders });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// ----------------------------
// ✅ GET ALL ORDERS (Admin / Seller)
// ----------------------------
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            $or: [{ paymentType: "COD" }, { isPaid: true }]
        })
            .populate("items.product")
            .populate("address")
            .sort({ createdAt: -1 });

        return res.json({ success: true, orders });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
