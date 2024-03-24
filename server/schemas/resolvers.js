const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Favorite } = require('../models'); // Assuming you have User and Favorite models

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
    favorites: async (_, { email }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('User not found');
      }
      return await Favorite.find({
        '_id': { $in: user.favorites }
      });
    },
    favorite: async (_, { favoriteId }) => {
      return await Favorite.findById(favoriteId);
    },
  },
  Mutation: {
    signup: async (_, { email, password }) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('User already exists with that email');
      }
      
      const user = await User.create({ email, password });
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
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

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw new Error('Invalid password');
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      return {
        token,
        user,
      };
    },
    addFavorite: async (_, { favItem, email }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('User not found');
      }
      
      const favorite = await Favorite.create({ favItem });
      user.favorites.push(favorite._id);
      await user.save();
      
      return favorite;
    },
    removeFavorite: async (_, { favoriteId }) => {
      const favorite = await Favorite.findById(favoriteId);
      if (!favorite) {
        throw new Error('Favorite not found');
      }
      
      await User.updateMany({}, { $pull: { favorites: favorite._id } });
      await favorite.remove();
      
      return favorite;
    },
  },
  User: {
    favorites: async (user) => {
      return await Favorite.find({
        '_id': { $in: user.favorites }
      });
    },
  },
};

module.exports = resolvers;