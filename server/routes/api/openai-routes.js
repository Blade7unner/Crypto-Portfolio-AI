const router = require('express').Router();
const { sendMessageToAI } = require('../../controllers/openai-controller');


router.route('/').post(sendMessageToAI);

module.exports = router;
