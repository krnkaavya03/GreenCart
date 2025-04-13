import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// ✅ Register User : /api/user/register
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite:"None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      user: { name: user.name, email: user.email },
    });

  } catch (error) {
    console.log('Register Error:', error.message);
    res.json({ success: false, message: 'Internal Server Error' });
  }
};

// ✅ Login User : /api/user/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ success: false, message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite:"None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      user: { name: user.name, email: user.email },
    });

  } catch (error) {
    console.log('Login Error:', error.message);
    res.json({ success: false, message: 'Internal Server Error' });
  }
};

// ✅ Check Auth : /api/user/is-auth
export const isAuth = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.json({ success: false, message: 'Unauthorized' });

    const user = await User.findById(userId).select("-password");
    if (!user) return res.json({ success: false, message: 'User not found' });

    return res.json({ success: true, user });

  } catch (error) {
    console.log('Auth Check Error:', error.message);
    res.json({ success: false, message: 'Internal Server Error' });
  }
};

// ✅ Logout User : /api/user/logout
export const logout = (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure:true,
      sameSite:"None",
    });

    return res.json({ success: true, message: "Logged out successfully" });

  } catch (error) {
    console.log('Logout Error:', error.message);
    res.json({ success: false, message: 'Internal Server Error' });
  }
};

// ✅ Update Profile : /api/user/update-profile
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { name, email } = req.body;

    if (!userId || !name || !email) {
      return res.json({ success: false, message: 'Name and email are required' });
    }

    const existingEmailUser = await User.findOne({ email });
    if (existingEmailUser && existingEmailUser._id.toString() !== userId.toString()) {
      return res.json({ success: false, message: 'Email already in use' });
    }

    const user = await User.findById(userId);
    if (!user) return res.json({ success: false, message: 'User not found' });

    user.name = name;
    user.email = email;
    await user.save();

    return res.json({
      success: true,
      message: "Profile updated successfully",
      user: { name: user.name, email: user.email },
    });

  } catch (error) {
    console.log('Update Profile Error:', error.message);
    res.json({ success: false, message: 'Internal Server Error' });
  }
};

// ✅ Change Password : /api/user/change-password
export const changePassword = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { oldPassword, newPassword } = req.body;

    if (!userId || !oldPassword || !newPassword) {
      return res.json({ success: false, message: 'Old and new passwords are required' });
    }

    const user = await User.findById(userId);
    if (!user) return res.json({ success: false, message: 'User not found' });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.json({ success: false, message: 'Old password is incorrect' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.json({ success: true, message: "Password changed successfully" });

  } catch (error) {
    console.log('Change Password Error:', error.message);
    res.json({ success: false, message: 'Internal Server Error' });
  }
};
