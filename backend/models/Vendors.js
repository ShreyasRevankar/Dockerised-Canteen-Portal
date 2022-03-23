const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const VendorSchema = new Schema({
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
	shop_name: {
		type: String,
		required: true,
		unique: true
	},
	opening_time: {
		type: String,
		required: true
	},
	closing_time: {
		type: String,
		required: true
	},
});

module.exports = Vendor = mongoose.model("Vendors", VendorSchema);