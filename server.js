const express = require("express");
const app = express();
const db = require("./db"); // Import the database connection
require("dotenv").config(); // Load environment variables from .env file

const bodyParser = require("body-parser");
app.use(bodyParser.json()); // Middleware to parse JSON bodies (req.body)
const PORT = process.env.PORT || 3000; // Use PORT from .env or default to 3000

app.get("/", (req, res) => {
  res.send("Welcome to our Hotel.");
});

const personRoutes = require("./routes/personRoutes"); // Import the person routes
app.use("/person", personRoutes); // Use the person routes

const menuRoutes = require("./routes/menuRoutes"); 
app.use("/menu", menuRoutes); 

app.listen(PORT, () => {
  console.log("Server is Running...");
});
