const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

/*
Route:          /api/users/register
Description:    Register a user
Access:         Public
Parameter:      NONE
Methods:        POST
*/

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const userAvailable = await UserModel.findOne({ email });

  if (userAvailable) {
    res.status(400);
    throw new Error("User already available !!!");
  }

  // Hashing password using bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password:", hashedPassword);

  const user = await UserModel.create({
    username,
    email,
    password: hashedPassword,
  });

  console.log(`user created successfully ${user}`);

  if (user) {
    res.status(201).json({ _id: user.id, email: user.email }); // whatever in req.body posted, showing that and LHS is random keyword we use.
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }

  res.json({ msg: "register" });
});

/*
Route:          /api/users/login
Description:    Login user
Access:         Public
Parameter:      NONE
Methods:        POST
*/

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const user = await UserModel.findOne({ email });

  // comparing password and hashed password
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        }, // payload info to store in token, useful for multiple servers
      },
      process.env.ACCESS_TOKEN_SECRET, // secret key we decide as server side password for extra security
      { expiresIn: "15m" } // Expiration time
    );
    res.status(200).json({ accessToken }); // passing access token directly without key when user exists and password matches
    // for user to copy paste and use for login
  } else {
    res.status(401);
    throw new Error("Email or Password is not valid !");
  }
});

/*
Route:          /api/users/current
Description:    Current user info
Access:         Private
Parameter:      NONE
Methods:        GET
*/

const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user); // the info we stored while managing jwt auth in middleware
  // this route is just to check jwt auth working or not in private route access
});

module.exports = { registerUser, loginUser, currentUser };
