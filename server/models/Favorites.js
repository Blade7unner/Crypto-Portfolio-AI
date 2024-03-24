const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  favItem: {
    type: String,
    required: true,
  },
  // If you want to link favorites to users directly, consider adding a reference here
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming your User model is named 'User'
  },
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
