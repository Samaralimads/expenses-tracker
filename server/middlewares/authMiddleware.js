const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // Get token from header
  const token = req.header("Authorization");

  // Check if token doesn't exist
  if (!token) {
    return res
      .status(401)
      .json({ msg: "Authorization denied. No token provided." });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add user from payload
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Authorization denied. Invalid token." });
  }
};

module.exports = verifyToken;
