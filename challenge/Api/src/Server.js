const express = require('express');
const httpsRedirect = require('express-https-redirect');

const app = express();
app.use('/', httpsRedirect());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
	res.redirect('/take/repositories');
});

app.use('/take', require('./Routes/Take'));

app.listen(process.env.PORT || 3000, () => {
	console.log('Take API Server Online.');
});