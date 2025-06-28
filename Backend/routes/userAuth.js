const jwt =require("jsonwebtoken");
const authenticate = (req, res, next) => {// Middleware function to authenticate user requests
  // Check for the presence of an Authorization header
  const authHeader = req.headers ["authorization"];
  const token = authHeader &&authHeader.split(" ")[1]; // Extract token from Authorization header
  if (!token) {
    return res.status(401).json({ message: "Authentication token required" });
  }

  jwt.verify(token, "bookstore123", (err, user) => { // Verify the token
    if (err) {
      return res.status(403).json({ message: "Token expired please sign in" });
    }
    req.user = user; // Attach user info to request object
    next(); // Proceed to the next middleware or route handler
  });
};
module.exports = authenticate; // Export the middleware for use in other files
// This middleware checks for a valid JWT token in the request headers and decodes it to attach user information to the request object. If the token is missing or invalid, it responds with an appropriate error message.
// It can be used in routes to protect them from unauthorized access by requiring a valid token for access. For example, you can use it like this in your route definitions: