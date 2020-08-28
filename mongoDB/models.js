import mongoose from 'mongoose';
export const User = mongoose.model('User', {
	name: String,
	password: String,
	email: String,
	gender: String,
	age: Number,
	created_At: Date,
});

export const Food = mongoose.model('Food', {
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
	created_At: Date,
});

export const FoodUser = mongoose.model('FoodUser', {
	amount: Number,
	date: String,
	user_id: Number,
	food_id: Number,
	created_At: Date,
});
