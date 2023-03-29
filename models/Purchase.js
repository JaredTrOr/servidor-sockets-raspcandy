const mongoose = require('mongoose');

const purchaseSchema = mongoose.Schema({
    candyId:{
        type: String,
        required: true
    },
    candyName: {
        type: String,
        required: true
    },
    size:{
        type: String,
        required: true
    },
    userId:{
        type: String,
        required: true
    },
    dateOfPurchase: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Purchase', purchaseSchema);
