const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');
const { graphql } = require('graphql');
dotenv.config();

const app = express();

mongoose
	.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.catch(err => console.log(err.reason));
mongoose.connection.on('open', () => console.log('connected to database'));

app.use(cors());
app.use(
	'/graphql',
	graphqlHTTP((req, res) => {
		return {
			schema,
			graphiql: true,
			// context: {
			// 	200: res.status(200).send('OK'),
			// 	400: res.status(400).send('conflict'),
			// },
		};
	}),
);

app.listen(4001, () => console.log('running on port 4001'));
