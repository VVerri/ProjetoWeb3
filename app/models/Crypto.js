const mongoose = require('mongoose');

const { Schema } = mongoose;

const cryptoSchema = new Schema({

    fromCurrency: {
        type: String,
        required: true
    },

    toCurrency: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    pairName: {
        type: String,
        required: true
    },

    askPrice: {
        type: Number,
        required: true
    },

}, {
    timestamps: true
});

const Crypto = mongoose.model("Crypto", cryptoSchema)

module.exports = Crypto;