const request = require('supertest');
const app = require('../src/app'); // Importa a instância do app Express

describe('GET /api/health', () => {
  it('deve retornar status 200 e uma mensagem de "ok"', async () => {
    const response = await request(app).get('/api/health');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'ok');
    expect(response.body).toHaveProperty('message');
  });
});

