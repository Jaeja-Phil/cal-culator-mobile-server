import { gql } from 'apollo-server-express';

export const typeDefs = gql`
	type Query {
		users: [User!]!
		foods: [Food!]!
		fooduser: [FoodUser!]!
	}

	type User {
		id: ID!
		name: String!
		password: String!
		email: String!
		gender: String!
		age: Int!
	}

	type Food {
		id: ID!
		name: String!
		calorie: Float
		fat: Float
		carbohydrate: Float
		sugar: Float
		protein: Float
		sodium: Float
		chloesterol: Float
		iron: Float
		calcium: Float
		zinc: Float
		vitamin_a: Float
		vitamin_b: Float
		vitamin_c: Float
	}

	type FoodUser {
		id: ID!
		amount: Int!
		date: String!
		user_id: Int!
		food_id: Int!
	}

	type Mutation {
		createUser(name: String!, password: String!, email: String!, gender: String!, age: Int!): User!
		createFood(
			name: String!
			calorie: Float
			fat: Float
			carbohydrate: Float
			sugar: Float
			protein: Float
			sodium: Float
			chloesterol: Float
			iron: Float
			calcium: Float
			zinc: Float
			vitamin_a: Float
			vitamin_b: Float
			vitamin_c: Float
		): Food!
		createFoodUser(amount: Int!, date: String!, user_id: Int!, food_id: Int!): FoodUser
	}
`;
