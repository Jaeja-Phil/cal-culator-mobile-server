const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodUsersSchema = new Schema({
	amount: Number,
	date: Date,
	user_id: String,
	food_id: String,
});

module.exports = mongoose.model('FoodUsers', FoodUsersSchema);
