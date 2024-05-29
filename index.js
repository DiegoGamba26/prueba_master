const axios = require('axios');
require('dotenv').config();

const GITHUB_USER = 'google';
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USER}/repos`;

const getPopularRepos = async () => {
  try {
    const response = await axios.get(GITHUB_API_URL, {
      headers: {
        'Authorization': `token ${process.env.GITHUB_TOKEN}`
      }
    });

    const repos = response.data;

    // Ordenar los repositorios por el número de estrellas en orden descendente
    const sortedRepos = repos.sort((a, b) => b.stargazers_count - a.stargazers_count);

    // Tomar los 10 primeros repositorios
    const top10Repos = sortedRepos.slice(0, 10);

    console.log(`Los 10 repositorios más populares de ${GITHUB_USER} son:`);
    top10Repos.forEach((repo, index) => {
      console.log(`${index + 1}. ${repo.name} - ⭐ ${repo.stargazers_count} stars`);
    });
  } catch (error) {
    console.error('Error al obtener los repositorios:', error.response ? error.response.data : error.message);
  }
};

getPopularRepos();
