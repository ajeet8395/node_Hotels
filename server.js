const express = require("express");
const app = express();
const db = require("./db"); // Import the database connection

const bodyParser = require("body-parser");
app.use(bodyParser.json()); // Middleware to parse JSON bodies (req.body)

app.get("/", (req, res) => {
  res.send("Welcome to our Hotel.");
});

const personRoutes = require("./routes/personRoutes"); // Import the person routes
app.use("/person", personRoutes); // Use the person routes

const menuRoutes = require("./routes/menuRoutes"); 
app.use("/menu", menuRoutes); 

app.listen(3000, () => {
  console.log("Server is Running...");
});
