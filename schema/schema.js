const graphql = require('graphql');
const { Foods, FoodUsers, Users } = require('../models');

const {
	GraphQLObjectType,
	GraphQLSchema,
	GraphQLID,
	GraphQLInt,
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

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		users: {
			type: new GraphQLList(UserType),
			resolve(parent, args) {
				return Users.find({});
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
			resolve(parent, { name, password, email, gender, age }) {
				const user = new Users({ name, password, email, gender, age });
				return user.save();
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation,
});
