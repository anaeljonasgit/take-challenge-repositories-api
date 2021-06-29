const express = require('express');
const route = express.Router();

const getRepositories = require('../Controllers/Take/getRepositories');

route.get('/repositories', async (req, res) => {
	res.send(await getRepositories());
});

module.exports = route;