let mongoose = require('mongoose');

let userShema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    token: {
        type: String,
        default: 0
    }
})

module.exports = mongoose.model('User', userShema)