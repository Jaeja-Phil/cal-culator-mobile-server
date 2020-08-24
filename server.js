const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const PORT = 4000;
const app = express();

app.use(helmet());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => res.status(200).send('OK'));

app.listen(PORT, () =>
	console.log(`Cal-Culator-Mobile Server app listening at http://localhost:${PORT}`),
);

module.exports = app;
