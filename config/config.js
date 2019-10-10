require('dotenv').config();
const mongoose = require('mongoose');

module.exports = {
    connectDb() {
        const { DB } = process.env;
        mongoose
            .connect(DB, { useNewUrlParser: true })
            .then(() => console.log('Qard database connected...'))
            .catch((err) => console.log(err));
    },
};
