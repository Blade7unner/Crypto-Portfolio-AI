require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const cors = require('cors');
const apiRoutes = require('./routes/api');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const { authMiddleware } = require('./utils/auth');

const PORT = process.env.PORT || 3001;
const app = express();

if (process.env.NODE_ENV !== 'production') {
  const corsOptions = {
    origin: ['http://localhost:5173'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
  };
  app.use(cors(corsOptions));
} else {
  app.use(cors({
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    // Ensure 'req' is defined and then pass it to authMiddleware
    if (!req) {
      console.error('Request object is undefined in context setup');
      throw new Error('Request object is undefined');
    }
    return await authMiddleware(req);
  },
});

const startApolloServer = async () => {
  await server.start();
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use('/api', apiRoutes);
  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req }) => await authMiddleware(req),
      cors: false,
    })
  );

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();
