const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).send({ error: 'Invalid or missing authorization header.' });
    }
    
    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).send({ error: 'User not found.' });
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).send({ error: 'Invalid token.' });
    } else if (error.name === 'TokenExpiredError') {
      return res.status(401).send({ error: 'Token expired.' });
    }
    return res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = authMiddleware;
