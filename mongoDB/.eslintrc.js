module.exports = {
	extends: ['prettier'],
	plugins: ['prettier'],
	rules: {
		'prettier/prettier': 'error',
		'no-unused-vars': 'warn',
		'no-console': 'off',
	},
	parserOptions: {
		ecmaVersion: 2017,
	},
	env: {
		es6: true,
	},
};
