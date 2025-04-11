import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
  try {
    // ✅ Get token from cookie
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ success: false, message: "Access Denied: No token provided" });
    }

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.id) {
      return res.status(403).json({ success: false, message: "Access Denied: Invalid token" });
    }

    // ✅ Attach user ID to request
    req.user = { _id: decoded.id };
    next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    return res.status(401).json({
      success: false,
      message: error.name === "TokenExpiredError"
        ? "Session expired. Please log in again."
        : "Authentication failed",
    });
  }
};

export default authUser
