/** @format */

const mongoose = require("mongoose");
const { use } = require("../routes/tasks");

// Important here to keep your password URI encoded.

const connectdb = (url) => {
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    });
}

module.exports = connectdb;