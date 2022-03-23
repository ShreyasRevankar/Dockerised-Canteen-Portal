const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FoodItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    // image // Optional
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: false,
        default: 0
    },
    nonVeg: {
        type: Boolean,
        required: true
    },
    vendor_email: {
        type: String,
        required: true
    },
    tag: [{
        type: String
    }],
    addOnName: [{
        type: String
    }],
    addOnPrice: [{
        type: Number
    }],
    image: {
        type: String,
        default: "https://w7.pngwing.com/pngs/1013/530/png-transparent-cafe-italian-cuisine-breakfast-menu-eat-food-logo-eating-thumbnail.png"
    },
    shop_name: {
        type: String,
        required: true
    }
});

module.exports = FoodItem = mongoose.model("FoodItem", FoodItemSchema);