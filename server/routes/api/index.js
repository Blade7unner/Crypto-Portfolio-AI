const router = require('express').Router();
const openaiRoutes = require('./openai-routes.js');

router.use('/openai', openaiRoutes);

module.exports = router;