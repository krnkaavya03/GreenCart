import jwt from 'jsonwebtoken';

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

    // Attach user ID to request object (not req.body)
    req.user = { _id: decoded.id };

    next(); // Continue to the next middleware/controller
  } catch (error) {
    console.error("Auth Error:", error.message);
    return res.status(401).json({
      success: false,
      message: error.name === 'TokenExpiredError' ? 'Session expired. Please log in again.' : 'Authentication failed',
    });
  }
};

export default authUser;
