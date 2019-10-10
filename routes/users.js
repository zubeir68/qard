const express = require('express');
const asyncHandler = require('express-async-handler');
const exjwt = require('express-jwt');
const usersController = require('../controllers/user');

const router = express.Router();

const jwtMW = exjwt({
    secret: process.env.JWT_SECRET,
});

router.get('/', asyncHandler(usersController.get));
router.post('/', asyncHandler(usersController.add));
router.patch('/:id', jwtMW, asyncHandler(usersController.update));
router.delete('/:id', jwtMW, asyncHandler(usersController.delete));

module.exports = router;
