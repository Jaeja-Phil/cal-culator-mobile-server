const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const UsersSchema = new Schema(
	{
		name: String,
		password: String,
		email: String,
		gender: String,
		age: String,
		height: Number,
		weight: Number,
	},
	{ timestamps: true },
);
UsersSchema.plugin(findOrCreate);
UsersSchema.pre('save', async function (next) {
	if (this.isModified('password')) {
		try {
			this.password = await bcrypt.hash(this.password, 10);
			next();
		} catch (err) {
			next(err);
		}
	}
});

module.exports = mongoose.model('Users', UsersSchema);
