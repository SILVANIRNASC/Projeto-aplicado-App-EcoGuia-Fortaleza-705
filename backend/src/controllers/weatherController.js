const weatherService = require('../services/weatherService');

/**
 * @description Obtém os dados climáticos atuais de Fortaleza.
 * @param {object} req - Objeto de requisição do Express.
 * @param {object} res - Objeto de resposta do Express.
 * @param {function} next - Função para chamar o próximo middleware.
 */
async function getWeatherData(req, res, next) {
  try {
    const weatherData = await weatherService.getFortalezaWeather();
    
    if (!weatherData) {
      return res.status(503).json({
        error: 'Serviço de clima temporariamente indisponível',
        message: 'A API de clima não está configurada ou não respondeu'
      });
    }

    // Adiciona dica de sustentabilidade baseada no clima
    const sustainabilityTip = generateSustainabilityTip(weatherData);
    
    res.status(200).json({
      ...weatherData,
      sustainability_tip: sustainabilityTip,
      message: 'Dados climáticos de Fortaleza'
    });

  } catch (error) {
    // Apenas passa o erro para o middleware global, que decidirá se deve logar
    next(error);
  }
}

/**
 * Gera uma dica de sustentabilidade baseada nas condições climáticas
 */
function generateSustainabilityTip(weatherData) {
  const { temp, description } = weatherData;
  
  if (temp > 30) {
    return 'Dia quente! Aproveite para secar roupas no varal e economizar energia.';
  } else if (description.includes('chuva')) {
    return 'Período de chuvas! Que tal instalar uma cisterna para captação de água da chuva?';
  } else if (temp < 22) {
    return 'Clima ameno! Bom momento para fazer compostagem sem odores intensos.';
  }
  
  return 'Ótimo dia para praticar sustentabilidade! Considere usar transporte alternativo.';
}

module.exports = {
  getWeatherData
};