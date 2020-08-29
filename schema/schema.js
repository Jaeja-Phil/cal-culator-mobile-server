const graphql = require('graphql');
const { Foods, FoodUsers, Users } = require('../models');

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
		vitamin_b: { type: GraphQLFloat },
		vitamin_c: { type: GraphQLFloat },
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
			type: new GraphQLList(FoodType),
			resolve() {
				return Foods.find({});
			},
		},
		foodusers: {
			type: new GraphQLList(FoodUserType),
			resolve() {
				return FoodUsers.find({});
			},
		},
	},
});

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addUser: {
			type: UserType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				password: { type: new GraphQLNonNull(GraphQLString) },
				email: { type: new GraphQLNonNull(GraphQLString) },
				gender: { type: new GraphQLNonNull(GraphQLString) },
				age: { type: new GraphQLNonNull(GraphQLInt) },
			},
			resolve(_, args) {
				return new Users(args).save();
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
				vitamin_b: { type: new GraphQLNonNull(GraphQLFloat) },
				vitamin_c: { type: new GraphQLNonNull(GraphQLFloat) },
			},
			resolve(_, args) {
				return new Foods(args).save();
			},
		},
		addFoodUser: {
			type: FoodUserType,
			args: {
				date: { type: new GraphQLNonNull(DateType) },
				amount: { type: new GraphQLNonNull(GraphQLInt) },
				user_id: { type: new GraphQLNonNull(GraphQLID) },
				food_id: { type: new GraphQLNonNull(GraphQLID) },
			},
			resolve(_, args) {
				return new FoodUsers(args).save();
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation,
});
