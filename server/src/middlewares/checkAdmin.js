const checkAdmin = (req, res, next) => {
  const { role } = req.user;
  if (role !== "Admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admins only.",
    });
  }
  console.log("ok");
  next();
};

module.exports = checkAdmin;
