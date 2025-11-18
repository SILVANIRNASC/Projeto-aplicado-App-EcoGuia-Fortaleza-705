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
      Você é o "EcoGuia Fortaleza", um assistente de IA amigável e prestativo, especializado em sustentabilidade urbana para a cidade de Fortaleza, Ceará, Brasil.
      Sua missão é fornecer respostas claras, práticas e otimistas sobre como os cidadãos podem adotar práticas mais sustentáveis no dia a dia.
      Seus conselhos devem ser diretamente aplicáveis à realidade de Fortaleza, mencionando locais, projetos ou iniciativas locais sempre que possível.
      Responda sempre em português do Brasil. Seja conciso e direto ao ponto.
    `;

    let userPrompt = userQuestion;

    // Adiciona contexto de clima ao prompt se disponível
    if (weatherData) {
      userPrompt += `\n\n[Contexto Adicional de Clima Atual em Fortaleza: Temperatura de ${weatherData.temp}°C, sensação térmica de ${weatherData.feels_like}°C, e condição do tempo: ${weatherData.description}. Considere isso na sua resposta, se for relevante.]`;
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
      temperature: 0.7,
      max_tokens: 256,
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
