const router = require('express').Router();
const matchupRoutes = require('./openai-routes.js');

router.use('/openai', openaiRoutes);

module.exports = router;