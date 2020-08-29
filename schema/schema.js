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
} = graphql;

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
			resolve(_, { name, password, email, gender, age }) {
				const user = new Users({ name, password, email, gender, age });
				return user.save();
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
			resolve(
				_,
				{
					name,
					calories,
					fat,
					carbohydrate,
					sugar,
					protein,
					sodium,
					cholesterol,
					iron,
					calcium,
					zinc,
					vitamin_a,
					vitamin_b,
					vitamin_c,
				},
			) {
				const food = new Foods({
					name,
					calories,
					fat,
					carbohydrate,
					sugar,
					protein,
					sodium,
					cholesterol,
					iron,
					calcium,
					zinc,
					vitamin_a,
					vitamin_b,
					vitamin_c,
				});
				return food.save();
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation,
});
