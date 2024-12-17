const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const { token } = req.cookies;
  if (!token)
    return res
      .status(401)
      .json({ message: "Access Denied. No Token Provided." });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: "Invalid or Expired Token." });
  }
};

module.exports = verifyToken;
