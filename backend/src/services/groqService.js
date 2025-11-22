const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

/**
 * @description Envia uma pergunta para a API da Groq e retorna a resposta da IA.
 * @param {string} userQuestion - A pergunta feita pelo usuário.
 * @param {object|null} weatherData - Dados climáticos para contextualização (opcional).
 * @returns {Promise<string>} A resposta gerada pela IA.
 */
async function askGroq(userQuestion, weatherData) {
  try {
    const systemPrompt = `
      Você é o EcoGuia Fortaleza.
      
      ⚠️ REGRA SUPREMA: SUA RESPOSTA DEVE SER APENAS A LISTA DE DICAS. 
      - PROIBIDO introduções (Ex: "Aqui estão as dicas...", "Com o clima de Fortaleza...").
      - PROIBIDO conclusões (Ex: "Espero ter ajudado").
      - Vá direto para o primeiro tópico.

      ESCOPO:
      - Apenas Sustentabilidade, Jardinagem, Clima, Reciclagem em Fortaleza.
      - Se o assunto fugir disso (futebol, receitas, código), diga apenas: "Desculpe, só falo sobre sustentabilidade. 🌱"

      FORMATO OBRIGATÓRIO:
      - Máximo 3 itens.
      - Cada item deve ter no máximo 2 frases.
      - Pule uma linha entre itens.
      - Use EMOJIS no início.
      
      EXEMPLO DE RESPOSTA PERFEITA (Para 'dicas de rega'):
      "💧 **Horário:** Regue sempre antes das 8h ou após as 17h para evitar evaporação pelo sol forte.

      🌱 **Quantidade:** O solo arenoso de Fortaleza seca rápido, verifique a umidade diariamente com o dedo.

      🏺 **Técnica:** Use cobertura morta (folhas secas) na base da planta para manter a terra úmida por mais tempo."
    `;

    let userPrompt = userQuestion;

    // Adiciona contexto de clima ao prompt se disponível
    if (weatherData) {
      const sensacao = weatherData.feelsLike || weatherData.feels_like;
      const condicao = weatherData.condition || weatherData.description;
      userPrompt += `\n\n(Contexto: Fortaleza agora faz ${weatherData.temp}°C, sensação ${sensacao}°C, céu: ${condicao})`;
    }

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      model: "llama-3.1-8b-instant",
      temperature: 0.2,
      max_tokens: 100,
      top_p: 1,
      stop: null,
      stream: false,
    });

    return (
      chatCompletion.choices[0]?.message?.content ||
      "Não foi possível obter uma resposta no momento."
    );
  } catch (error) {
    if (process.env.NODE_ENV !== "test") {
      console.error("Erro ao comunicar com a API da Groq:", error);
    }
    throw new Error("Falha ao processar a pergunta com o serviço de IA.");
  }
}

module.exports = {
  askGroq,
};
