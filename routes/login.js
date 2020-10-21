const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/Users');

router.post('/findUser', async (req, res) => {
	const { email } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			res.status(201).json({ 'GO TO REGISTER :': user });
			// console.log(user);
		} else if (user) {
			res.status(200).json({ 'EMAIL ALREADY EXIST :': user });
			// console.log(user);
		}
	} catch (err) {
		res.status(400).json({ message: err });
	}
});

router.post('/loginedUser', async (req, res) => {
	const { userId } = req.body;
	try {
		const user = await User.find({ _id: userId });
		res.status(200).json(user);
	} catch (err) {
		res.status(400).json({ message: err });
	}
});

router.post('/login', async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			res.status(404).json('USER NOT EXIST');
		} else if (bcrypt.compareSync(password, user.password)) {
			console.log('LOGIN SUCCESS');
			req.session.userId = user._id;
			console.log(req.session);
			res.status(200).json(user);
		}
	} catch (error) {
		res.status(400).json({ 'LOGIN FAIL': error });
	}
});

router.post('/logout', async (req, res) => {
	try {
		const { id } = req.body;
		const { userId } = req.session;
		if (id === userId) {
			req.session.destroy(err => {
				if (err) {
					throw new Error('SESSION ERROR');
				} else {
					console.log('SUCCESSFULLY LOGOUT');
					res.status(200).json('SUCCESSFULLY LOGOUT');
				}
			});
		}
	} catch (err) {
		res.status(400).json({ message: err });
	}
});

router.post('/addUser', async (req, res) => {
	const { email, password, name, age, gender } = req.body;
	const user = new User({
		email,
		password,
		name,
		age,
		gender,
	});
	try {
		const addedUser = await user.save();
		res.status(201).json(addedUser);
	} catch (err) {
		res.status(400).json({ message: err });
	}
});

router.delete('/deleteUser', async (req, res) => {
	const { id } = req.body;
	try {
		const deletedUser = await User.deleteOne({ _id: id });
		res.status(200).json(deletedUser);
	} catch (err) {
		res.status(400).json({ message: err });
	}
});

router.post('/updateUser', async (req, res) => {
	const { userId } = req.body;
	const params = {
		userId: req.body.userId,
		name: req.body.name,
		age: req.body.age,
		gender: req.body.gender,
		height: req.body.height,
		weight: req.body.weight,
	};
	for (let prop in params) {
		if (!params[prop]) {
			delete params[prop];
		}
	}

	try {
		const updatedUser = await User.findOneAndUpdate(
			{ _id: userId },
			{
				$set: params,
			},
		);
		res.status(201).json(updatedUser);
	} catch (err) {
		res.status(400).json({ message: err });
	}
});
module.exports = router;
