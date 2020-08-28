import { User, Food, FoodUser } from './models';

export const resolvers = {
	Query: {
		users: () => User.find(),
		foods: () => Food.find(),
		fooduser: () => FoodUser.find(),
	},

	Mutation: {
		createUser: async (_, { name, password, email, gender, age }) => {
			const newUser = new User({ name, password, email, gender, age });
			await newUser.save();
			return newUser;
		},
		createFoodUser: async (_, { amount, date, user_id, food_id, created_At }) => {
			const newFoodUser = new FoodUser({ amount, date, user_id, food_id, created_At });
			await newFoodUser.save();
			return newFoodUser;
		},
		createFood: async (
			_,
			{
				name,
				calorie,
				fat,
				carbohydrate,
				sugar,
				protein,
				sodium,
				chlopesterol,
				iron,
				calcium,
				zinc,
				vitamin_a,
				vitamin_d,
				vitamin_c,
				created_At,
			},
		) => {
			const newFood = new Food({
				name,
				calorie,
				fat,
				carbohydrate,
				sugar,
				protein,
				sodium,
				chlopesterol,
				iron,
				calcium,
				zinc,
				vitamin_a,
				vitamin_d,
				vitamin_c,
				created_At,
			});
			await newFood.save();
			return newFood;
		},
	},
};
