const checkAdmin = () => {
  return (req, res, next) => {
    if (req.user.role !== "Admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admins only.",
      });
    }
    next();
  };
};

module.exports = checkAdmin;
