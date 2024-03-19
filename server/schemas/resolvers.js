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
  },
};

module.exports = resolvers;
