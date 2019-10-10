const express = require('express');
const asyncHandler = require('express-async-handler');
const indexController = require('../controllers/index');

const router = express.Router();

router.post('/api/token', asyncHandler(indexController.token));

module.exports = router;
