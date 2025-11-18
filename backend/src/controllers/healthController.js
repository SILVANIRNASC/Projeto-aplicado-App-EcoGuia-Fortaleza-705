/**
 * @description Verifica a saúde da API.
 * @param {object} req - Objeto de requisição do Express.
 * @param {object} res - Objeto de resposta do Express.
 */
function checkHealth(req, res) {
  res.status(200).json({
    status: 'ok',
    message: 'API EcoGuia Fortaleza está funcionando!',
    timestamp: new Date().toISOString(),
  });
}

module.exports = {
  checkHealth,
};
