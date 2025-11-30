const request = require('supertest');
const app = require('../src/app');
const weatherService = require('../src/services/weatherService');

jest.mock('../src/services/weatherService');

describe('GET /api/weather', () => {
  beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar dados climáticos com dica de sustentabilidade', async () => {
    const mockWeatherData = {
      temp: 28,
      feels_like: 30,
      description: 'céu limpo',
      city: 'Fortaleza'
    };

    weatherService.getFortalezaWeather.mockResolvedValue(mockWeatherData);

    const response = await request(app).get('/api/weather');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('temp', 28);
    expect(response.body).toHaveProperty('sustainability_tip');
    expect(response.body).toHaveProperty('message');
  });

  it('deve retornar erro 503 se serviço de clima não estiver configurado', async () => {
    weatherService.getFortalezaWeather.mockResolvedValue(null);

    const response = await request(app).get('/api/weather');

    expect(response.status).toBe(503);
    expect(response.body).toHaveProperty('error');
  });

  it('deve retornar erro 500 se serviço de clima falhar', async () => {
    weatherService.getFortalezaWeather.mockRejectedValue(new Error('API indisponível'));

    const response = await request(app).get('/api/weather');

    expect(response.status).toBe(500);
  });
});