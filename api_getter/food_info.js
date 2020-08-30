const axios = require('axios');

const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '../.env') });

const addFoodToDB = food_name => {
	return axios
		.get(
			`https://api.spoonacular.com/recipes/complexSearch?query=${food_name}&addRecipeNutrition=true&number=1&apiKey=${process.env.FOOD_API_KEY}`,
		)
		.then(res => {
			const returnObj = {};
			const nutritionInfo = res.data.results[0].nutrition.nutrients;
			returnObj.image = res.data.results[0].image;
			for (let i of nutritionInfo) {
				returnObj[i.title] = i.amount;
			}
			return {
				name: food_name,
				image: returnObj['image'],
				calories: returnObj['Calories'] || 0,
				fat: returnObj['Fat'] || 0,
				carbohydrate: returnObj['Carbohydrates'] || 0,
				sugar: returnObj['Sugar'] || 0,
				protein: returnObj['Protein'] || 0,
				sodium: returnObj['Sodium'] || 0,
				cholesterol: returnObj['Cholesterol'] || 0,
				iron: returnObj['Iron'] || 0,
				calcium: returnObj['Calcium'] || 0,
				vitamin_d: returnObj['Vitamin A'] || 0,
				vitamin_a: returnObj['Vitamin D'] || 0,
				zinc: returnObj['Zinc'] || 0,
			};
		});
};

module.exports = addFoodToDB;
