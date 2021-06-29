const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
	res.send('Take API Server Online.');
});

app.use('/take', require('./Routes/Take'));

app.listen(3000, () => {
	console.log('Servidor online.');
});