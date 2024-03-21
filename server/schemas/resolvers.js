const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key'; // Make sure to use an environment variable for the secret in production

const resolvers = {
  Query: {
    user: async (_, { userId }) => {
      return User.findById(userId);
    },
  },

  Mutation: {
    signup: async (_, { email, password }) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('User already exists with that email');
      }

      const user = await User.create({ email, password });
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: '1h',
      });

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

      const isValid = await user.comparePassword(password);
      if (!isValid) {
        throw new Error('Invalid password');
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: '1h',
      });

      return {
        token,
        user,
      };
    },
    addFavorite: async (_, { userId, favorite }) => {
      if (!userId) {
        throw new Error('User ID is required to add a favorite');
      }

      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      user.favorites.push(favorite);
      await user.save();
      return user;
    },
    removeFavorite: async (_, { userId, favorite }) => {
      if (!userId) {
        throw new Error('User ID is required to remove a favorite');
      }

      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      user.favorites = user.favorites.filter(fav => fav !== favorite);
      await user.save();
      return user;
    }
  },
};

module.exports = resolvers;
