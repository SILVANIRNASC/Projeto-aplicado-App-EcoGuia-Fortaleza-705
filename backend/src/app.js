// Carrega as variáveis de ambiente
require("./config/dotenv");

const express = require("express");
const pool = require('./config/db');
const cors = require("cors");

const healthController = require("./controllers/healthController");
const askController = require("./controllers/askController");
const weatherController = require("./controllers/weatherController");

const usuarioRoutes = require("./routes/usuarioRoutes");
const plantaRoutes = require("./routes/plantaRoutes");
const dicaRoutes = require("./routes/dicaRoutes");
const pontoRoutes = require("./routes/pontoRoutes");

const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear o corpo das requisições como JSON
app.use(express.json());

// Middleware para permitir que *qualquer* origem acesse sua API
app.use(cors());

// --- ROTAS DA API ---
app.get("/api/health", healthController.checkHealth);
app.post("/api/ask", askController.getSustainabilityAnswer);
app.get("/api/weather", weatherController.getWeatherData);

// Rotas do Banco de Dados
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/plantas", plantaRoutes);
app.use("/api/dicas", dicaRoutes);
app.use("/api/pontos", pontoRoutes);

// Middleware para tratamento de rotas não encontradas (404)
app.use((req, res, next) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

// Middleware global para tratamento de erros
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV !== "test") {
    console.error(err.stack);
  }
  res.status(500).json({ error: "Ocorreu um erro interno no servidor." });
});

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(
      `Servidor EcoGuia Fortaleza rodando em http://localhost:${port}`
    );
  });
}
// Exporta o app para ser usado nos testes
module.exports = app;
