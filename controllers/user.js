/* eslint-disable no-underscore-dangle */
// const jwt = require('jsonwebtoken');
const JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;
const Serializer = require('../serializers/user');
const User = require('../models/user');
const utils = require('../utils/utils');

const errorMessage = 'Server Error! We will fix this as soon as possible. If you have any questions, send an email at zubeir.mohamed@outlook.de. Thank you ';

module.exports = {
    async get(req, res, next) {
        try {
            // jwt
            const user = await User.find({});
            res.status(200).send(Serializer.serialize(user));
            next();
        } catch (error) {
            console.error(error);
            next(errorMessage);
        }
    },

    async add(req, res, next) {
        try {
            const user = await new JSONAPIDeserializer().deserialize(req.body);
            const { username, password, name } = user;

            const findUser = await User.find({ username });
            if (findUser.length === 0) {
                const hash = await utils.hash(password);
                const newUser = await new User({
                    name, username, password: hash,
                }).save();
                newUser.save();
                console.log(newUser);
                res.status(204).send({});
                next();
            } else {
                res.status(401).send('Account exists already');
                next();
            }
        } catch (error) {
            console.error(error);
            next(errorMessage);
        }
    },
};
