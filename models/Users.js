const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const UsersSchema = new Schema(
	{
		name: String,
		password: String,
		email: String,
		gender: String,
		age: Number,
	},
	{ timestamps: true },
);

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
