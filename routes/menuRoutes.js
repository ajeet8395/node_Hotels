const express = require("express");
const router = express.Router();
const MenuItem = require("../models/menuItem"); // Import the MenuItem model

// POST method to create a new menu item
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenuItem = new MenuItem(data); 

    const response = await newMenuItem.save();
    console.log("Menu item created");
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create menu item" });
  }
})

// GET method to get the menu items
router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("data Fetched");
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to Fetched data" });
  }
})

// GET method to get menu items by taste
router.get("/:taste", async (req, res) => {
    try {
        const taste = req.params.taste; // Get the taste from the URL parameter
        if(taste === "spicy" || taste === "sweet" || taste === "sour" || taste === "bitter" || taste === "salty") {
           const response = await MenuItem.find({taste: taste}); // Find menu items with the specified taste
           console.log("response Fetched");
            res.status(200).json(response);
        } else {
            return res.status(404).json({ error: "Invalid taste type" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch menu items by taste" });
    }
})

// PUT method to update a menu item by ID
router.put("/:id", async (req, res) => {
    try {
        const menuItemId = req.params.id;
        const updateMenuItemData = req.body;

        const response = await MenuItem.findByIdAndUpdate(menuItemId, updateMenuItemData, {
            new: true,
            runValidators: true
        })

        if (!response) {
            return res.status(404).json({ error: "Menu item not found" });
        }

        console.log("Menu item updated");
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update menu item" });
    }
})

// DELETE method to delete a menu item by ID
router.delete("/:id", async (req,res) => {
    try {
        const menuItemId = req.params.id; 

        const response = await MenuItem.findByIdAndDelete(menuItemId);

        if (!response) {
            return res.status(404).json({ error: "Menu item not found" });
        }
        console.log("Menu item deleted");
        res.status(200).json({ message: "Menu item deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete menu item" });
    }
})

module.exports = router;