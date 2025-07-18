const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true   // ❌ You had "require" instead of "required"
  },
  taste: {
    type: String,
    enum: ['sweet', 'spicy', 'sour'], // ✅ This enum belongs to "taste", not "price"
    required: true
  },
  is_drink: {
    type: Boolean,
    default: false
  },
  ingredients: {
    type: [String],
    default: []
  },
  num_sales: {
    type: Number,
    default: 0
  }
});

// ✅ Correct model creation (schema name should not be in quotes)
const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;
