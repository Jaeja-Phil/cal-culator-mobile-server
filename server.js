const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');

const PORT = 4000;
const app = express();
const dbName = 'Cal-Culator';
const uri = `mongodb+srv://admin:0123456789@cal-culator.zal7d.mongodb.net/${dbName}?retryWrites=true&w=majority`;
mongoose.Promise = global.Promise; // 비동기 처리
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
	'/graphql',
	graphqlHTTP({
		schema: schema,
		graphiql: true,
	}),
);

app.get('/', (req, res) => res.status(200).send('OK'));

app.listen(PORT, () =>
	console.log(`Cal-Culator-Mobile Server app listening at http://localhost:${PORT}`),
);

module.exports = app;
