const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader.startsWith("Bearer")) {
    // auth header always starts with Bearer, so extract token first
    token = authHeader.split(" ")[1]; // split by space so Bearer and Token separates, 2nd entity with index 1 is key so used here

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      // takes 3 params i.e. token, key and callback fn for error & decode
      if (err) {
        res.status(401);
        throw new Error("User is not authorized");
      }
      // console.log(decoded); // if token is correct then display user info
      req.user = decoded.user; // attached decoded information of user in req.user, making it accessible to later middleware and route handlers.
      next(); // passes control to next middleware or handler
    });

    if (!token) {
      res.status(401);
      throw new Error("User is not authorized or Token is not provided !");
    }
  }
});

module.exports = validateToken;
