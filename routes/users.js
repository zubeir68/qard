const express = require('express');
const asyncHandler = require('express-async-handler');
const exjwt = require('express-jwt');
const usersController = require('../controllers/user');

const router = express.Router();

const jwtMW = exjwt({
    secret: process.env.JWT_SECRET,
});

router.get('/users/:id', jwtMW, asyncHandler(usersController.get));
router.post('/users', jwtMW, asyncHandler(usersController.add));

module.exports = router;
