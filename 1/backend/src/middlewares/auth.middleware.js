const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({
      success: false,
      message: "unAuthorized access",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.json({
        success: false,
        message: "unAuthorized access",
      });
    }
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = authMiddleware;
