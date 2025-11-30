const request = require('supertest');
const app = require('../src/app');
const pool = require('../src/config/db');

// Mock da gamificação para não poluir o console ou causar efeitos colaterais
jest.mock('../src/utils/gamification', () => ({
  verificarConquista: jest.fn(),
}));

describe('Testes de Dicas Sustentáveis', () => {
  let idUsuarioTeste;
  const emailTeste = `dica_tester_${Date.now()}@teste.com`;

  // cria um usuário para ser o autor das dicas
  beforeAll(async () => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});

    const res = await request(app)
      .post('/api/usuarios/cadastrar')
      .send({
        nome: 'Usuário das Dicas',
        email: emailTeste,
        senha_hash: '123456',
        telefone: '85999999999',
        bairro: 'Benfica',
        cidade: 'Fortaleza',
        estado: 'CE'
      });
    
    idUsuarioTeste = res.body.id_usuario;
  });

  afterAll(async () => {
    // Limpeza: Apaga as dicas e o usuário criado
    if (idUsuarioTeste) {
      await pool.query('DELETE FROM dicas_sustentaveis WHERE id_usuario = $1', [idUsuarioTeste]);
      await pool.query('DELETE FROM usuarios WHERE id_usuario = $1', [idUsuarioTeste]);
    }
    await pool.end(); // Fecha conexão
    jest.restoreAllMocks();
  });

  it('POST /api/dicas - Deve criar uma nova dica com sucesso', async () => {
    const res = await request(app)
      .post('/api/dicas')
      .send({
        id_usuario: idUsuarioTeste,
        descricao: 'Use a água do ar-condicionado para regar as plantas!'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id_dica');
    expect(res.body.descricao).toBe('Use a água do ar-condicionado para regar as plantas!');
  });

  it('GET /api/dicas - Deve listar as dicas com o nome do autor', async () => {
    const res = await request(app).get('/api/dicas');

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toBeGreaterThan(0);
    
    // Verifica se o JOIN funcionou (tem que ter o campo 'autor')
    const dicaCriada = res.body.find(d => d.descricao === 'Use a água do ar-condicionado para regar as plantas!');
    expect(dicaCriada).toBeDefined();
    expect(dicaCriada).toHaveProperty('autor', 'Usuário das Dicas');
    expect(dicaCriada).toHaveProperty('data_formatada');
  });

  it('POST /api/dicas - Deve falhar se faltar id_usuario', async () => {
    const res = await request(app)
      .post('/api/dicas')
      .send({
        descricao: 'Dica órfã sem dono'
      });

    // Espera erro 500 (conforme seu catch) ou erro de constraint do banco
    expect(res.statusCode).not.toEqual(201);
  });
});