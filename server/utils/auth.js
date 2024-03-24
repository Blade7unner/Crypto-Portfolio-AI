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
};
