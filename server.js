import express from 'express';
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import { resolvers } from './mongoDB/resolvers';
import { typeDefs } from './mongoDB/typeDefs';
import consola from 'consola';

const server = async () => {
	const app = express();
	const server = new ApolloServer({
		typeDefs,
		resolvers,
	});

	server.applyMiddleware({ app });
	try {
		await mongoose.connect(
			'mongodb+srv://admin:0123456789@ec532.zal7d.mongodb.net/Cal-Culator?retryWrites=true&w=majority',
			{ useNewUrlParser: true, useUnifiedTopology: true },
		);
	} catch (err) {
		consola.error({ message: err, badge: true });
	}

	app.get('/', (req, res) => res.send('Hello World'));
	app.listen(4001, () =>
		consola.success({
			message: `Cal-Culator Server listening at http://localhost:${4001}`,
			badge: true,
		}),
	);
};

server();
