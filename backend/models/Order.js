const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    buyer: [{
        type: String
    }],
    addOns: [{
        type: String
    }],
    foodItem: [{
        type: String
    }],
    vendor: [{
        type: String
    }],
    quantity: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: "Placed"
    },
    orderDate: {
        type: Date,
        default: Date.now()
    },
    rating: {
        type: Number,
        default: 0
    }
});

module.exports = Order = mongoose.model("Order", OrderSchema);