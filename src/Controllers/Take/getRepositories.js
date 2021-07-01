const axios = require('axios');

const { take_repositories_api } = require('../../Services/Take');

async function getRepositories(req) {
	let data = await axios.get(take_repositories_api)
		.then(response => {
			return response.data;
		}).catch(erro => {
			return erro;
		});

	if (data.erro) {
		return { erro: data.erro }
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
			image: `${req.protocol}://${req.headers.host}/Public/take_logo.png`,
			created_at: repo.created_at
		}
	});

	return data;
}

module.exports = getRepositories;