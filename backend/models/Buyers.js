const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BuyerSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		unique: true,
		required: true
	},
	contact_number: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	age: {
		type: Number,
		required: true
	},
	batch: {
		type: Number,
		required: true
	},
	money: {
		type: Number,
		default: 0
	},
	fav: [{
		type: String
	}]
});


module.exports = Buyer = mongoose.model("Buyers", BuyerSchema);