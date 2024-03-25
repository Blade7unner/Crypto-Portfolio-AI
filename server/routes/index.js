const express = require('express');
const router = express.Router();

const checkoutRoutes = require('./api/checkout').default; 

router.use('/api/checkout', checkoutRoutes); 

module.exports = router;
