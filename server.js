require("dotenv").config();
const express = require("express");
const contactRoute = require("./routes/contact.route");
const userRoute = require("./routes/user.route");
const errorHandler = require("./middleware/errorHandler.middleware");
const connectDb = require("./config/dbConnection");
// const dotenv = require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());

// mongoose connection
connectDb();

app.use("/api/contacts", contactRoute); // or directly instead of contactRoute, paste require("./routes/contact.route")
app.use("/api/users", userRoute);
app.use(errorHandler); // directly use middleware here

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`Server started running on port ${port}`);
});
