const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodsSchema = new Schema({
	name: String,
	image: String,
	calories: Number,
	fat: Number,
	carbohydrate: Number,
	sugar: Number,
	protein: Number,
	sodium: Number,
	cholesterol: Number,
	iron: Number,
	calcium: Number,
	zinc: Number,
	vitamin_a: Number,
	vitamin_d: Number,
});

module.exports = mongoose.model('Foods', FoodsSchema);
