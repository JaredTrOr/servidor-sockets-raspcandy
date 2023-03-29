const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        require: true
    },
    favorite_candy: {
        type: String,
        require: false,
        default: ''
    },
});

module.exports = mongoose.model('User', userSchema);