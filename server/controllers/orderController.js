import Order from "../models/Order.js";
import Product from "../models/Product.js";
import stripe from "stripe";
import User from "../models/User.js";

const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

// ✅ Currency conversion rate
const INR_TO_USD = 1 / 82.5; // 1 INR ≈ 0.0121 USD

// ✅ COD Order Route: /api/order/cod
export const placeOrderCOD = async (req, res) => {
  try {
    const { userId, items, address } = req.body;

    console.log("Received COD order:", req.body);

    if (!userId) return res.status(400).json({ success: false, message: "userId is required" });
    if (!address || !Array.isArray(items) || items.length === 0)
      return res.status(400).json({ success: false, message: "Invalid address or empty items" });

    let amount = 0;

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) return res.status(400).json({ success: false, message: "Invalid product" });
      amount += product.offerPrice * item.quantity;
    }

    amount += Math.floor(amount * 0.02); // 2% tax

    await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "COD",
      isPaid: false,
    });

    return res.json({ success: true, message: "Order Placed Successfully" });
  } catch (error) {
    console.error("COD order error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Stripe Payment Order: /api/order/stripe
export const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, address } = req.body;
    const { origin } = req.headers;

    console.log("Received Stripe order:", req.body);

    if (!userId) return res.status(400).json({ success: false, message: "userId is required" });
    if (!address || !Array.isArray(items) || items.length === 0)
      return res.status(400).json({ success: false, message: "Invalid address or empty items" });

    let amount = 0;
    const productData = [];

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) return res.status(400).json({ success: false, message: "Invalid product" });

      productData.push({
        name: product.name,
        price: product.offerPrice,
        quantity: item.quantity,
      });

      amount += product.offerPrice * item.quantity;
    }

    amount += Math.floor(amount * 0.02); // 2% tax

    const order = await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "Online",
      isPaid: false,
    });

    const line_items = productData.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * INR_TO_USD * 100),
      },
      quantity: item.quantity,
    }));

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
    console.error("Stripe order error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Stripe Webhook: /stripe
export const stripeWebhooks = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  try {
    const event = stripeInstance.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const { orderId, userId } = session.metadata;

        // ✅ Mark the order as paid
        await Order.findByIdAndUpdate(orderId, { isPaid: true });

        // ✅ Clear user cart
        await User.findByIdAndUpdate(userId, { cartItems: {} });

        console.log("Payment successful for order:", orderId);
        break;
      }

      case "checkout.session.expired": {
        const session = event.data.object;
        const { orderId } = session.metadata;

        // ✅ Delete the order on failed/expired payment
        await Order.findByIdAndDelete(orderId);
        console.log("Payment failed, deleted order:", orderId);
        break;
      }

      default:
        console.warn(`Unhandled Stripe event type: ${event.type}`);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error("Stripe Webhook Error:", error.message);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
};

// ✅ Get Orders by User ID: /api/order/user
export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) return res.status(400).json({ success: false, message: "userId is required" });

    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    console.error("Get orders error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
