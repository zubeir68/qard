const express = require('express');
const asyncHandler = require('express-async-handler');
const exjwt = require('express-jwt');
const usersController = require('../controllers/user');

const router = express.Router();

const jwtMW = exjwt({
    secret: process.env.JWT_SECRET,
});

router.get('/users/:id', asyncHandler(usersController.get));
router.post('/users', jwtMW, asyncHandler(usersController.add));
router.patch('/users/:id', jwtMW, asyncHandler(usersController.update));
router.delete('/users/:id', jwtMW, asyncHandler(usersController.delete));

module.exports = router;
