const axios = require('axios');

const { take_repositories_api } = require('../../Services/Take');

async function getRepositories(req, res) {
	let data = await axios.get(take_repositories_api)
		.then(response => {
			return response.data;
		}).catch(erro => {
			return erro;
		});

	if (data.erro) {
		res.status(500);
		return res.send({ erro: data.erro });
	}

	data = data.filter(repo => {
		return repo.language == 'C#';
	});

	data = data.sort((a, b) => {
		return (new Date(a.created_at)) - (new Date(b.created_at));
	});

	data = data.map(repo => {
		return {
			id: repo.id,
			name: repo.full_name,
			html_url: repo.html_url,
			description: repo.description,
			language: repo.language,
			image: repo.owner.avatar_url,
			created_at: repo.created_at
		}
	});

	res.send(data.splice(0, 5));
}

module.exports = getRepositories;