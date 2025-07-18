const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/Menuitem');

// Get all menu items
router.get('/', async (req, res) => {
  try {
    const response = await MenuItem.find();
    console.log("Menu item data fetched");
    res.status(200).json(response);
  } catch (error) {
    console.error("Data not fetched:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get menu items by taste
router.get('/:tasteType', async (req, res) => {
  try {
    const tasteType = req.params.tasteType.toLowerCase();

    if (['sweet', 'spicy', 'sour'].includes(tasteType)) {
      const response = await MenuItem.find({ taste: tasteType });
      console.log("Specific taste data fetched:", response);
      res.status(200).json(response);
    } else {
      console.warn("Invalid taste type requested:", tasteType);
      res.status(404).json({ error: 'Invalid taste type' });
    }
  } catch (error) {
    console.error("Error fetching by taste:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Create a new menu item
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newMenuItem = new MenuItem(data);
    const response = await newMenuItem.save();
    console.log("Menu item saved");
    res.status(201).json(response); // ✅ 201 Created
  } catch (error) {
    console.error("Data not saved:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update a menu item by ID
router.put('/:id', async (req, res) => {
  try {
    const menuItemId = req.params.id;
    const updateData = req.body;

    const response = await MenuItem.findByIdAndUpdate(menuItemId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!response) {
      return res.status(404).json({ error: "Menu item not found" });
    }

    console.log("Data updated successfully");
    res.status(200).json(response);
  } catch (error) {
    console.error("Update failed:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// Delete a menu item by ID
router.delete('/:id', async (req, res) => {
  try {
    const menuItemId = req.params.id;

    const response = await MenuItem.findByIdAndDelete(menuItemId);

    if (!response) {
      return res.status(404).json({ error: "Menu item not found" });
    }

    console.log("Menu item deleted");
    res.status(200).json({ message: "Menu item deleted successfully", data: response });
  } catch (error) {
    console.error("Delete failed:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
