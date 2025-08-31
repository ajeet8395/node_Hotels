const express = require("express");
const app = express();
const db = require("./db"); // Import the database connection
require("dotenv").config(); // Load environment variables from .env file
const passport = require("./auth"); // Import the configured passport instance

const bodyParser = require("body-parser");
app.use(bodyParser.json()); // Middleware to parse JSON bodies (req.body)
const PORT = process.env.PORT || 3000; // Use PORT from .env or default to 3000

// Middleware function to log requests
const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Request: ${req.originalUrl}`);
  next(); // Call the next middleware or route handler
};
app.use(logRequest);

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate("local", { session: false });

app.get("/", (req, res) => {
  res.send("Welcome to our Hotel.");
});

const personRoutes = require("./routes/personRoutes"); // Import the person routes
app.use("/person",localAuthMiddleware, personRoutes); // Use the person routes

const menuRoutes = require("./routes/menuRoutes");
app.use("/menu", menuRoutes);

app.listen(PORT, () => {
  console.log("Server is Running...");
});
