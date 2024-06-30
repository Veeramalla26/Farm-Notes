const axios = require('axios');

const API_KEY = 'de13a245a89c78d76a3aedef864082c0';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

const getWeather = async (city) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};

module.exports = {
    getWeather
}
