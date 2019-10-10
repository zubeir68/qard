const express = require('express');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;
const JSONAPISerializer = require('jsonapi-serializer').Serializer;
const JSONAPIError = require('jsonapi-serializer').Error;
const mongoose = require('mongoose');
const exjwt = require('express-jwt');
const indexController = require('../controllers/index');

const jwtMW = exjwt({
    secret: process.env.JWT_SECRET,
});

const router = express.Router();

router.post('/api/token', asyncHandler(indexController.token));

module.exports = router;
