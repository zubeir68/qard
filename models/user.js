const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    socials: {
        type: Map,
        required: true,
        default: {},
    },
    code: {
        type: String,
        required: true,
        default: 'code',
    },
});

module.exports = mongoose.model('User', UserSchema);
