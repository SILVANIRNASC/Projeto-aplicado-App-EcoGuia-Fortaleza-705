const axios = require("axios");

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const LAT = process.env.LAT_FORTALEZA || -3.7327;
const LON = process.env.LON_FORTALEZA || -38.5267;

/**
 * @description Busca os dados climáticos atuais de Fortaleza.
 * @returns {Promise<object|null>} Um objeto com dados climáticos ou null se a chave da API não estiver configurada.
 */
async function getFortalezaWeather() {
  if (!OPENWEATHER_API_KEY) {
    console.warn(
      "Chave da API OpenWeatherMap não configurada. Pulando busca de clima."
    );
    return null;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=pt_br`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    return {
      temp: data.main.temp,
      feels_like: data.main.feels_like,
      description: data.weather[0].description,
      city: data.name,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      wind_seed: data.wind.speed,
      visibility: data.visibility,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset
    };
  } catch (error) {
    // Apenas passa o erro para o middleware global, que decidirá se deve logar
    next(error);
  }
}

module.exports = {
  getFortalezaWeather,
};
