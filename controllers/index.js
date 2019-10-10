/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const errorMessage = 'Server Error! We will fix this as soon as possible. If you have any questions, send an email at zubeir.mohamed@outlook.de. Thank you ';


module.exports = {
    async token(req, res, next) {
        try {
            const { username, password, grant_type } = req.body;
            if (grant_type === 'password') {
                const findAccount = await User.findOne({ username });
                if (findAccount) {
                    if (bcrypt.compareSync(password, findAccount.password)) {
                        const payload = {
                            id: findAccount._id,
                        };
                        const token = await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
                        res.status(200).send(`{ "access_token": "${token}"}`);
                    } else {
                        res.status(401).send('Wrong credentials');
                        next();
                    }
                } else {
                    res.status(401).send('Username not found');
                    next();
                }
            } else {
                res.status(400).send('{"error": "invalid_grant"}');
                next(errorMessage);
            }
        } catch (error) {
            console.log(error);
            res.status(400).send('{ "error": "unsupported_grant_type" }');
            next(errorMessage);
        }
    },
};
