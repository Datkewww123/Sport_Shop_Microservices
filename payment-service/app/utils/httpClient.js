const axios = require('axios');

async function post(url, data, headers = {}) {
  try {
    const response = await axios.post(url, data, {
      headers: { 'Content-Type': 'application/json', ...headers },
      timeout: 15000,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(`HTTP ${error.response.status}: ${JSON.stringify(error.response.data)}`);
    }
    throw error;
  }
}

module.exports = { post };
