const express = require('express');
const session = require('express-session');
const { graphqlHTTP } = require('express-graphql');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const schema = require('./schema/schema');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');
const { graphql } = require('graphql');
const loginRouter = require('./routes/login');
dotenv.config();

const app = express();

mongoose
	.connect(process.env.DB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.catch(err => console.log(err.reason));
mongoose.connection.on('open', () => console.log('connected to database'));

app.disable('x-powered-by');
app.use(cors({ origin: 'http://localhost:8081', credentials: true }));
app.use(
	session({
		name: 'user_id',
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
		cookie: {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 7, // 7days
		},
	}),
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/auth', loginRouter);
app.get('/', (req, res) => res.status(200).send('OK'));
app.use(
	'/graphql',
	(req, res, next) => {
		// console.log(req.session);
		return next();
	},
	graphqlHTTP((req, res, next) => {
		return {
			schema,
			graphiql: true,
			context: {
				req,
				res,
			},
		};
	}),
);

app.listen(4001, () => console.log('running on port 4001'));
