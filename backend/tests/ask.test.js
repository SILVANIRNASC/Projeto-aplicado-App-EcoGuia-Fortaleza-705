const request = require('supertest');
const app = require('../src/app'); 
const groqService = require('../src/services/groqService');
const weatherService = require('../src/services/weatherService');

// Mock dos serviços para isolar os testes do controller
jest.mock('../src/services/groqService');
jest.mock('../src/services/weatherService');

describe('POST /api/ask', () => {
  beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  // Limpa os mocks antes de cada teste
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar status 200 e uma resposta da IA para uma pergunta válida', async () => {
    const mockQuestion = 'Onde posso reciclar lixo eletrônico em Fortaleza?';
    const mockAnswer = 'Você pode levar seu lixo eletrônico aos Ecopontos da cidade.';
    
    // Configura o retorno mockado dos serviços
    weatherService.getFortalezaWeather.mockResolvedValue({ temp: 28, description: 'céu limpo' });
    groqService.askGroq.mockResolvedValue(mockAnswer);

    const response = await request(app)
      .post('/api/ask')
      .send({ question: mockQuestion });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ resposta: mockAnswer });
    
    expect(groqService.askGroq).toHaveBeenCalledWith(
        mockQuestion, 
        expect.any(Object), // Clima
        expect.any(Array)   // Agenda/Eventos
    );
  });

  it('deve retornar status 400 se a pergunta não for fornecida', async () => {
    const response = await request(app)
      .post('/api/ask')
      .send({}); // Corpo vazio

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
    expect(groqService.askGroq).not.toHaveBeenCalled();
  });

  it('deve retornar status 400 se a pergunta for uma string vazia', async () => {
    const response = await request(app)
      .post('/api/ask')
      .send({ question: '   ' }); // Pergunta com espaços

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
  
  it('deve retornar status 500 se o serviço da Groq falhar', async () => {
    // Suprime o console.error para este teste específico para manter a saída limpa
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const mockError = new Error('Falha na API da Groq');
    groqService.askGroq.mockRejectedValue(mockError);
    weatherService.getFortalezaWeather.mockResolvedValue(null); 

    const response = await request(app)
      .post('/api/ask')
      .send({ question: 'Uma pergunta válida' });

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error', 'Ocorreu um erro interno no servidor.');

    // Restaura o console.error original após o teste
    consoleErrorSpy.mockRestore();
  });
});