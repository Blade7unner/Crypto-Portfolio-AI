const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models'); // Assuming you have User and Favorite models
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return await User.find({});
    },
    user: async (_, { email }) => {
      const user = await User.findOne({ email });
      if (!user) {
        return null; // Handle case where user with provided email is not found
      }
      return user;
    },
  },
  Mutation: {
    signup: async (_, { email, password }) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('User already exists with that email');
      }

      const user = await User.create({ email, password });
      // Using signToken utility function to include both userId and email in the JWT
      const token = signToken({ userId: user._id, email: user.email });

      return {
        token,
        user,
      };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('User not found');
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw new Error('Invalid password');
      }

      // Using signToken utility function to include both userId and email in the JWT
      const token = signToken({ userId: user._id, email: user.email });

      return {
        token,
        user,
      };
    },

    addFavorite: async (_, { stockName }, context) => {
      // Check if user is authenticated and extract userId from context
      const { user } = context;
      if (!user || !user.userId) {
        throw new Error('Authentication required');
      }
    
      // Find the user by userId instead of hardcoded email
      const foundUser = await User.findById(user.userId);
      if (!foundUser) {
        throw new Error('User not found');
      }
      
      // Add stockName to favorites if not already included
      if (!foundUser.favorites.includes(stockName)) { 
        foundUser.favorites.push(stockName);
        await foundUser.save();
      }
      
      return foundUser;
    },
    
    removeFavorite: async (_, { stockName }, context) => {
      // Check if user is authenticated and extract userId from context
      const { user } = context;
      if (!user || !user.userId) {
        throw new Error('Authentication required');
      }
    
      // Find the user by userId instead of hardcoded email
      const foundUser = await User.findById(user.userId);
      if (!foundUser) {
        throw new Error('User not found');
      }
    
      // Remove stockName from favorites
      const updatedFavorites = foundUser.favorites.filter(fav => fav !== stockName);
      foundUser.favorites = updatedFavorites;
      await foundUser.save();
    
      return foundUser;
    },    
  },
};

module.exports = resolvers;