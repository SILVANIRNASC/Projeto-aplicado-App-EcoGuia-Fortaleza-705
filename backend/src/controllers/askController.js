const groqService = require('../services/groqService');
const weatherService = require('../services/weatherService');
const pool = require('../config/db');

/**
 * @description Obtém uma resposta de sustentabilidade usando a IA da Groq.
 * @param {object} req - Objeto de requisição do Express.
 * @param {object} res - Objeto de resposta do Express.
 * @param {function} next - Função para chamar o próximo middleware (tratamento de erro).
 */
async function getSustainabilityAnswer(req, res, next) {
  try {
    const { question } = req.body;

    // 1. Validação da entrada de dados
    if (!question || typeof question !== 'string' || question.trim() === '') {
      return res.status(400).json({
        error: 'A propriedade "question" é obrigatória e deve ser uma string não vazia.',
      });
    }

    // Busca dados do clima para contextualizar a resposta
    let weatherData = null;
    try {
        weatherData = await weatherService.getFortalezaWeather();
    } catch (weatherError) {
        console.warn('Não foi possível obter os dados de clima. A pergunta será processada sem esse contexto.', weatherError.message);
    }

    // Busca os próximos 3 eventos futuros para dar contexto à IA
    let eventsData = [];
    try {
        const eventQuery = `
            SELECT titulo, descricao, local, TO_CHAR(data_evento, 'DD/MM/YYYY HH24:MI') as data_formatada 
            FROM eventos 
            WHERE data_evento >= NOW() 
            ORDER BY data_evento ASC 
            LIMIT 3
        `;
        const eventResult = await pool.query(eventQuery);
        eventsData = eventResult.rows;
    } catch (eventError) {
        console.warn('Sem dados de eventos:', eventError.message);
    }
    
    // 3. Chama o serviço da Groq para obter a resposta da IA
    const answer = await groqService.askGroq(question, weatherData, eventsData);

    // 4. Retorna a resposta com sucesso
    res.status(200).json({ resposta: answer });

  } catch (error) {
    // 5. Se ocorrer um erro, passa para o middleware de tratamento de erros global
     if (process.env.NODE_ENV !== 'test') {
        console.error('Erro no controlador askController:', error);
     }
    next(error);
  }
}

module.exports = {
  getSustainabilityAnswer,
};
