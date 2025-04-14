import jwt from 'jsonwebtoken';
import User from '../models/user.model.js'; // Optional: if you want to fetch full user

const authUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ success: false, message: 'Access Denied: No Token Provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.id) {
      return res.status(403).json({ success: false, message: 'Access Denied: Invalid Token' });
    }

    // Optional: fetch user from DB to ensure existence and freshness
    const user = await User.findById(decoded.id).select('_id name email isAdmin');
    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found. Please log in again.' });
    }

    req.user = user; // Attach full user (or just ID if preferred)
    next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    return res.status(401).json({
      success: false,
      message: error.name === 'TokenExpiredError'
        ? 'Session expired. Please log in again.'
        : 'Authentication failed',
    });
  }
};

export default authUser;
