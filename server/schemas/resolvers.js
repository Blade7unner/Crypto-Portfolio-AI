const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return await User.find({});
    },
    user: async (_, { email }) => {
      const user = await User.findOne({ email });
      if (!user) {
        return null;
      }
      return user;
    },
    favorites: async (_, __, { user }) => {
      if (!user || !user.userId) {
        throw new Error("Authentication required");
      }

      try {
        const userData = await User.findById(user.userId);
        if (!userData) {
          throw new Error("User not found");
        }
        return userData.favorites;
      } catch (error) {
        console.error(`Error fetching user favorites: ${error}`);
        throw new Error("Failed to fetch favorites");
      }
    },
  },
  Mutation: {
    signup: async (_, { email, password }) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('User already exists with that email');
      }

      const user = await User.create({ email, password });
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

      const token = signToken({ userId: user._id, email: user.email });

      return {
        token,
        user,
      };
    },

    addFavorite: async (_, { stockName }, context) => {
      const { user } = context;
      if (!user || !user.userId) {
        throw new Error('Authentication required');
      }
    
      const foundUser = await User.findById(user.userId);
      if (!foundUser) {
        throw new Error('User not found');
      }
      
      if (!foundUser.favorites.includes(stockName)) { 
        foundUser.favorites.push(stockName);
        await foundUser.save();
      }
      
      return foundUser;
    },
    
    removeFavorite: async (_, { stockName }, context) => {
      const { user } = context;
      if (!user || !user.userId) {
        throw new Error('Authentication required');
      }
    
      const foundUser = await User.findById(user.userId);
      if (!foundUser) {
        throw new Error('User not found');
      }
    
      const updatedFavorites = foundUser.favorites.filter(fav => fav !== stockName);
      foundUser.favorites = updatedFavorites;
      await foundUser.save();
    
      return foundUser;
    },    
  },
};

module.exports = resolvers;