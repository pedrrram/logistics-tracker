const jwt = require("jsonwebtoken");
const User = require("../../models/User");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({
      message: "No token provided",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("username role");
    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }
    req.user = { id: user._id, username: user.username, role: user.role };
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

module.exports = authMiddleware;
