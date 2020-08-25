module.exports = {
	env: {
		es2020: true,
		es6: true,
		node: true,
	},
	extends: ['prettier'],
	parserOptions: {
		ecmaVersion: 2017,
		sourceType: 'module',
	},
	rules: {
		'prettier/prettier': 'error',
		'no-unused-vars': 'warn',
		'no-console': 'off',
	},
	plugins: ['prettier'],
};
