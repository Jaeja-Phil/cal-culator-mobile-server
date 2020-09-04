const graphql = require('graphql');
const bcrypt = require('bcryptjs');
const { Foods, FoodUsers, Users } = require('../models');
const { getLastDayOfMonth, getMondayOfNthWeek } = require('./helperFunctions');
const addFoodToDB = require('../api_getter/food_info');
const { deleteOne } = require('../models/Foods');

const {
	GraphQLObjectType,
	GraphQLSchema,
	GraphQLID,
	GraphQLInt,
	GraphQLFloat,
	GraphQLString,
	GraphQLNonNull,
	GraphQLList,
	GraphQLScalarType,
	GraphQLInputObjectType,
} = graphql;

const DateType = new GraphQLScalarType({
	name: 'Date',
	description: 'Date Type',
	serialize: value => {
		const date = new Date(value);
		if (date.toString() === 'invalid Date') {
			return null;
		}
		return date;
	},
});

const FoodUserInput = new GraphQLInputObjectType({
	name: 'FooduserInput',
	fields: () => ({
		date: { type: new GraphQLNonNull(DateType) },
		amount: { type: new GraphQLNonNull(GraphQLInt) },
		user_id: { type: new GraphQLNonNull(GraphQLID) },
		food_id: { type: new GraphQLNonNull(GraphQLID) },
	}),
});

const UserType = new GraphQLObjectType({
	name: 'Users',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		password: { type: GraphQLString },
		email: { type: GraphQLString },
		gender: { type: GraphQLString },
		age: { type: GraphQLInt },
	}),
});

const FoodType = new GraphQLObjectType({
	name: 'Foods',
	fields: () => ({
		id: { type: GraphQLID },
		image: { type: GraphQLString },
		name: { type: GraphQLString },
		calories: { type: GraphQLFloat },
		fat: { type: GraphQLFloat },
		carbohydrate: { type: GraphQLFloat },
		sugar: { type: GraphQLFloat },
		protein: { type: GraphQLFloat },
		sodium: { type: GraphQLFloat },
		cholesterol: { type: GraphQLFloat },
		iron: { type: GraphQLFloat },
		calcium: { type: GraphQLFloat },
		zinc: { type: GraphQLFloat },
		vitamin_a: { type: GraphQLFloat },
		vitamin_d: { type: GraphQLFloat },
	}),
});

const FoodUserType = new GraphQLObjectType({
	name: 'FoodUsers',
	fields: () => ({
		id: { type: GraphQLID },
		date: { type: DateType },
		amount: { type: GraphQLInt },
		user_id: { type: GraphQLID },
		food_id: { type: GraphQLID },
		foods: {
			type: FoodType,
			resolve(parent) {
				return Foods.findById(parent.food_id);
			},
		},
	}),
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		users: {
			type: new GraphQLList(UserType),
			resolve() {
				return Users.find({});
			},
		},
		foods: {
			type: FoodType,
			args: {
				name: { type: GraphQLString },
			},
			async resolve(_, args) {
				let result = await Foods.find({ name: args.name });
				if (result.length === 0) {
					let newFood = await addFoodToDB(args.name);
					return new Foods(newFood).save();
				} else {
					return result[0];
				}
			},
		},
		foodusers: {
			type: new GraphQLList(FoodUserType),
			resolve() {
				return FoodUsers.find({});
			},
		},
		foodusersDate: {
			type: new GraphQLList(FoodUserType),
			args: {
				user_id: { type: GraphQLID },
				date: { type: DateType },
				dwm: { type: GraphQLString },
			},
			resolve(_, { user_id, date, dwm }) {
				if (dwm === 'daily') {
					return FoodUsers.find({ user_id, date });
				} else if (dwm === 'range') {
					const [startDate, endDate] = date.split(' ');
					return FoodUsers.find({
						user_id,
						date: {
							$gte: startDate,
							$lte: endDate,
						},
					});
				} else {
					const lastDayOfMonth = getLastDayOfMonth(date);
					return FoodUsers.find({
						user_id,
						date: {
							$gte: `${date}-01`,
							$lte: `${date}-${lastDayOfMonth}`,
						},
					});
				}
			},
		},
	},
});

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		login: {
			type: UserType,
			args: {
				password: { type: new GraphQLNonNull(GraphQLString) },
				email: { type: new GraphQLNonNull(GraphQLString) },
			},
			async resolve(_, args) {
				const { email, password } = args;
				let user = await Users.findOne({ email });

				if (!user) {
					return false;
				} else {
					if (bcrypt.compareSync(password, user.password)) {
						console.log(user.password);
						return user;
					} else {
						return false;
					}
				}
			},
		},
		addUser: {
			type: UserType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				password: { type: new GraphQLNonNull(GraphQLString) },
				email: { type: new GraphQLNonNull(GraphQLString) },
				gender: { type: new GraphQLNonNull(GraphQLString) },
				age: { type: new GraphQLNonNull(GraphQLInt) },
			},
			async resolve(_, args) {
				const { name, password, email, gender, age } = args;

				let user = await Users.findOne({ email });
				if (user) {
					return false;
				} else {
					await bcrypt.hash(password, 10, function (err, passwordHash) {
						const newUser = {
							name,
							password: passwordHash,
							email,
							gender,
							age,
						};
						return Users(newUser).save();
					});
				}
			},
		},
		addFood: {
			type: FoodType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				calories: { type: new GraphQLNonNull(GraphQLFloat) },
				fat: { type: new GraphQLNonNull(GraphQLFloat) },
				carbohydrate: { type: new GraphQLNonNull(GraphQLFloat) },
				sugar: { type: new GraphQLNonNull(GraphQLFloat) },
				protein: { type: new GraphQLNonNull(GraphQLFloat) },
				sodium: { type: new GraphQLNonNull(GraphQLFloat) },
				cholesterol: { type: new GraphQLNonNull(GraphQLFloat) },
				iron: { type: new GraphQLNonNull(GraphQLFloat) },
				calcium: { type: new GraphQLNonNull(GraphQLFloat) },
				zinc: { type: new GraphQLNonNull(GraphQLFloat) },
				vitamin_a: { type: new GraphQLNonNull(GraphQLFloat) },
				vitamin_d: { type: new GraphQLNonNull(GraphQLFloat) },
			},
			resolve(_, args) {
				return new Foods(args).save();
			},
		},
		addFoodUser: {
			type: FoodUserType,
			args: {
				list: { type: new GraphQLList(FoodUserInput) },
			},
			resolve(_, args) {
				FoodUsers.insertMany(args.list);
				return;
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation,
});
