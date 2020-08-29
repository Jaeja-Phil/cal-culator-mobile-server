const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodsSchema = new Schema({
	name: String,
	calorie: Number,
	fat: Number,
	carbohydrate: Number,
	sugar: Number,
	protein: Number,
	sodium: Number,
	chloesterol: Number,
	iron: Number,
	calcium: Number,
	zinc: Number,
	vitamin_a: Number,
	vitamin_b: Number,
	vitamin_c: Number,
});

module.exports = mongoose.model('Foods', FoodsSchema);
