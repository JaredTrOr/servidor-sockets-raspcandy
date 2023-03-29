const mongoose = require('mongoose');

const candySchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Candy', candySchema);