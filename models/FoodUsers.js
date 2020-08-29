const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodUsersSchema = new Schema({
	amount: Number,
	date: String,
	user_id: Number,
	food_id: Number,
});

module.exports = mongoose.model('FoodUsers', FoodUsersSchema);
