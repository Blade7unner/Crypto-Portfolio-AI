const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

const expiration = '2h';

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  signToken: function ({ email, userId }) {
    const payload = { email, userId };
    console.log("Payload to be signed:", payload);
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expiration });
    console.log("Generated Token:", token);
    return token;
  },
  authMiddleware: async (req) => {
    // Extract token from Authorization header
    const token = req.headers.authorization?.split(' ').pop().trim();
    if (!token) return { user: null };

    try {
      // Decode the token
      const { userId } = jwt.verify(token, process.env.JWT_SECRET);
      // If token is valid, attach userId to context
      return { user: { userId } };
    } catch (error) {
      console.error(`Authentication token error: ${error}`);
      // In case of error, return null user in context
      return { user: null };
    }
  },
};
