const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

/**
 * @description Envia uma pergunta para a API da Groq e retorna a resposta da IA.
 * @param {string} userQuestion - A pergunta feita pelo usuário.
 * @param {object|null} weatherData - Dados climáticos para contextualização (opcional).
 * @param {Array|null} eventsData - Lista de próximos eventos do banco.
 * @returns {Promise<string>} A resposta gerada pela IA.
 */
async function askGroq(userQuestion, weatherData, eventsData) {
  try {
    let eventsContext = "Não há eventos futuros cadastrados no momento.";
    if (eventsData && eventsData.length > 0) {
        eventsContext = eventsData.map(e => 
            `- ${e.titulo} em ${e.data_formatada} no local: ${e.local} (${e.descricao})`
        ).join("\n");
    }

    const systemPrompt = `
      Você é o EcoGuia Fortaleza.

      ⚠️ REGRA SUPREMA: SUA RESPOSTA DEVE SER SOMENTE A RESPOSTA DIRETA, NATURAL E CURTA.
      - PROIBIDO títulos, tópicos, listas, bullets ou seções.
      - PROIBIDO introduções (ex: "Aqui está"), explicações de formato ou despedidas.
      - Responda como um humano objetivo, educado e neutro, sem ser informal demais.
      - Use frases simples e diretas.
      - Máximo 200 caracteres.
      - No máximo 2 frases.
      - Use emojis apenas quando fizer sentido e no máximo 1 emoji.

      📍 REGRA SOBRE PONTOS DE COLETA:
      Se o usuário perguntar "onde descartar", "onde ficam os ecopontos" ou "pontos de coleta":
      - NÃO LISTE ENDEREÇOS.
      - RESPONDA EXATAMENTE: "📍 Para encontrar o ecoponto mais próximo e ver quais resíduos eles aceitam, acesse nossa tela de [Descarte](/descarte) no menu principal! Lá temos um mapa completo para você."

      📅 REGRA SOBRE EVENTOS:
      1. Use a lista abaixo para responder o que tem disponível. Se vazia, diga que não há agendamentos.
      2. AO FINAL DA RESPOSTA SOBRE EVENTOS, VOCÊ É OBRIGADO A ADICIONAR EXATAMENTE ESTA FRASE (com o link markdown):
         "Você pode ficar por dentro de todos os eventos organizados pela comunidade na tela de 📅 [Eventos](/eventos) no menu principal."

      [LISTA DE EVENTOS DO SISTEMA]:
      ${eventsContext}

      ESCOPO:
      - Apenas sustentabilidade, jardinagem, clima ou reciclagem em Fortaleza.
      - Se fugir do escopo, responda apenas: "Desculpe, só falo sobre sustentabilidade. 🌱"

      EXEMPLO DE ESTILO:
      Pergunta: "melhor hora para plantar?"
      Resposta: "Prefira plantar no início da manhã ou no fim da tarde. A temperatura é mais suave e o solo mantém a umidade."
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
      max_tokens: 300,
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
