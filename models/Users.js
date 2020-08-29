const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
	name: String,
	password: String,
	email: String,
	gender: String,
	age: Number,
});

module.exports = mongoose.model('Users', UsersSchema);
