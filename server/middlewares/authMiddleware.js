const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function authMiddleware(req, res, next) {
  try {
    console.log(req.headers);

    //get the authorization header from the request
    const authorizationHeader = req.headers.authorization;

    // Check if exists
    if (!authorizationHeader) {
      return res.status(400).json({ message: "No authorization found" });
    }

    // Remove the "Bearer " prefix from the authorization header to extract the token
    const token = authorizationHeader.replace("Bearer ", "");

    // Verify the JWT token using the provided secret key
    const payload = jwt.verify(token, process.env.TOKEN_SECRET, {
      algorithms: ["HS256"],
    });
    console.log(payload);

    // Find the user associated with the decoded user ID from the token
    const user = await User.findById(payload._id);
    if (!user) {
      return res.status(401).json({ message: "Denied!" });
    }

    // Attach the user object to the request object
    req.user = user;
    // Call the next middleware or route handler in the chain
    next();
  } catch (error) {
    next(error);
  }
}
module.exports = authMiddleware;

//The middleware extracts the user's ID from the JWT and adds it to the request object (req.user),
//allowing middleware functions or route handlers to access the authenticated user's ID.;
