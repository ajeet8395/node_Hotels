const express = require("express");
const router = express.Router();
const Person = require("../models/person"); // Import the Person model
const { jwtAuthMiddleware, generateToken } = require("../jwt")

// POST route to create a new person
router.post("/signup", async (req, res) => {
  try {
    const data = req.body; // Get the data from the request body

    // Create a new instance of the Person model with the data
    const newPerson = new Person(data);

    // Save the new person to the database
    const response = await newPerson.save();
    console.log("Person created");

    const payload = {
      id: response.id,
      username: response.username,
    }
    const token = generateToken(payload);

    res.status(200).json({response: response, token: token});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create person" });
  }
});

// Login Routes
router.post("/login", async (req, res) => {
  try {
    // Extract username and password from request body
    const { username, password } = req.body;

    // Find the user by username
    const user = await Person.findOne({ username: username });

    // If user does not exist or password does not match, return error
    if (!user || !(await user.comparePassword(password))) {
      return res.status(404).json({ error: "Invalid username or password" });
    }

    // generate token
    const payload = {
      id: user.id,
      username: user.username,
    }

    const token = generateToken(payload);

    // return token as response
    res.json({token});
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Internal server error" });
  }
});

// Profile Route
router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    // req.user is set by jwtAuthMiddleware
    const userId = req.user.id;
    const user = await Person.findById(userId);

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET method to get the person
router.get("/",jwtAuthMiddleware, async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data Fetched");
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to Fetched data" });
  }
});

// Get person by work type
router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType; // Get the work type from the URL parameter
    if (workType == "chef" || workType == "waiter" || workType == "manager") {
      const response = await Person.find({ work: workType });
      console.log("response Fetched");
      res.status(200).json(response);
    } else {
      return res.status(404).json({ error: "Invalid work type" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch person by work type" });
  }
});

// UPDATE method to update a person by ID
router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id; // Get the person ID from the URL parameter
    const updatePersonData = req.body; // Get the data to update from the request body

    const response = await Person.findByIdAndUpdate(
      personId,
      updatePersonData,
      { new: true, runValidators: true }
    ); // Update the person and return the updated document

    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }

    console.log("Person updated");
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update person" });
  }
});

// DELETE method to delete a person by ID
router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;

    const response = await Person.findByIdAndDelete(personId); // Delete the person by ID
    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("Person deleted");
    res.status(200).json({ message: "Person deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete person" });
  }
});

module.exports = router;
