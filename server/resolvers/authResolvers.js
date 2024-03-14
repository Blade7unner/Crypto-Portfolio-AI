const jwt = require('jsonwebtoken');
const User = require('../models/User');
const JWT_SECRET = process.env.JWT_SECRET || 'your_very_secret_key';

const createToken = (user) => jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

const resolvers = {
  Query: {
    me: async (_, args, { user }) => {
      if (!user) throw new Error('Not Authenticated');
      return await User.findById(user.userId);
    },
  },
  Mutation: {
    signup: async (_, { email, password }) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) throw new Error('Email already in use');

      const user = new User({ email, password });
      await user.save();

      return { token: createToken(user), user };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user || !(await user.comparePassword(password))) {
        throw new Error('Invalid email or password');
      }

      return { token: createToken(user), user };
    },
  },
};

module.exports = resolvers;
