require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const typeDefs = require('./schemas/typeDefs');
const resolvers = require('./resolvers/authResolvers');

const startApolloServer = async () => {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const token = req.headers.authorization || '';
      if (token) {
        try {
          const decoded = jwt.verify(token.split(' ')[1], JWT_SECRET);
          return { user: { userId: decoded.userId } };
        } catch (e) {
          throw new Error('Invalid Token');
        }
      }
    },
  });

  await server.start();
  server.applyMiddleware({ app });

  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`));
};

startApolloServer().catch(error => console.error(error));
