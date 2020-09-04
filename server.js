const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema');

const dotenv = require('dotenv');
dotenv.config();

const app = express();

mongoose
	.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.catch(err => console.log(err.reason));
mongoose.connection.on('open', () => console.log('connected to database'));

app.use(
	'/graphql',
	graphqlHTTP({
		schema,
		graphiql: true,
	}),
);

app.listen(4001, () => console.log('running on port 4001'));
