const request = require('supertest');
const app = require('../src/app');
const pool = require('../src/config/db');

// Mock da gamificação para isolar o teste
jest.mock('../src/utils/gamification', () => ({
  verificarConquista: jest.fn(),
}));

describe('Testes de Jardinagem (Plantas)', () => {
  let tokenDono = '';
  let idUsuarioDono = '';
  let idUsuarioIntruso = '';
  let tokenIntruso = '';
  let idPlantaCriada = '';

  const emailDono = `jardineiro_${Date.now()}@teste.com`;
  const emailIntruso = `intruso_${Date.now()}@teste.com`;

  // Cria usuários e gera tokens
  beforeAll(async () => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});

    // --- USUÁRIO DONO ---
    const resDono = await request(app).post('/api/usuarios/cadastrar').send({
      nome: 'Dono do Jardim', email: emailDono, senha_hash: '123456', 
      telefone: '85999999999', bairro: 'Benfica', cidade: 'Fortaleza', estado: 'CE'
    });
    idUsuarioDono = resDono.body.id_usuario;

    const loginDono = await request(app).post('/api/usuarios/login').send({
      email: emailDono, password: '123456'
    });
    tokenDono = loginDono.body.token;

    // --- USUÁRIO INTRUSO (Para testar segurança) ---
    const resIntruso = await request(app).post('/api/usuarios/cadastrar').send({
      nome: 'Intruso', email: emailIntruso, senha_hash: '123456',
      telefone: '85888888888', bairro: 'Centro', cidade: 'Fortaleza', estado: 'CE'
    });
    idUsuarioIntruso = resIntruso.body.id_usuario;
    
    const loginIntruso = await request(app).post('/api/usuarios/login').send({
        email: emailIntruso, password: '123456'
    });
    tokenIntruso = loginIntruso.body.token;
  });

  afterAll(async () => {
    // Limpeza em ordem correta (Foreign Keys)
    if (idPlantaCriada) {
        await pool.query('DELETE FROM plantas WHERE id_planta = $1', [idPlantaCriada]);
    }
    if (idUsuarioDono) {
        await pool.query('DELETE FROM usuarios WHERE id_usuario = $1', [idUsuarioDono]);
    }
    if (idUsuarioIntruso) {
        await pool.query('DELETE FROM usuarios WHERE id_usuario = $1', [idUsuarioIntruso]);
    }
    await pool.end();
    jest.restoreAllMocks();
  });

  // --- TESTES ---

  it('POST /api/plantas - Deve cadastrar uma planta nova', async () => {
    const res = await request(app)
      .post('/api/plantas')
      .set('Authorization', `Bearer ${tokenDono}`) // Envia Token
      .send({
        nome_popular: 'Cacto Teste',
        nome_cientifico: 'Cactaceae',
        data_plantio: new Date().toISOString().split('T')[0], // Hoje
        frequencia_rega: 7
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id_planta');
    expect(res.body.nome_popular).toBe('Cacto Teste');
    
    idPlantaCriada = res.body.id_planta; // Salva ID para os próximos testes
  });

  it('PUT /api/plantas/:id/cuidado - Deve registrar rega com sucesso', async () => {
    const res = await request(app)
      .put(`/api/plantas/${idPlantaCriada}/cuidado`)
      .set('Authorization', `Bearer ${tokenDono}`)
      .send({ tipo_cuidado: 'rega' });

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toContain('sucesso');
  });

  it('PUT /api/plantas/:id/cuidado - Deve impedir que outro usuário cuide da planta', async () => {
    const res = await request(app)
      .put(`/api/plantas/${idPlantaCriada}/cuidado`)
      .set('Authorization', `Bearer ${tokenIntruso}`) // Token do Intruso
      .send({ tipo_cuidado: 'poda' });

    // Espera 403 Forbidden
    expect(res.statusCode).toEqual(403);
    expect(res.body.error).toContain('não pode cuidar da planta de outra pessoa');
  });

  it('GET /api/plantas/usuario/:id - Deve listar plantas com status calculado', async () => {
    const res = await request(app)
      .get(`/api/plantas/usuario/${idUsuarioDono}`)
      .set('Authorization', `Bearer ${tokenDono}`);

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    
    const planta = res.body[0];
    expect(planta.nome_popular).toBe('Cacto Teste');
    
    // Verifica se os campos calculados no backend existem
    expect(planta).toHaveProperty('status_rega');
    expect(planta).toHaveProperty('proxima_rega_data');
  });
  
  it('GET /api/plantas/usuario/:id - Deve bloquear visualização do jardim alheio', async () => {
      const res = await request(app)
        .get(`/api/plantas/usuario/${idUsuarioDono}`) // Tenta ver jardim do Dono
        .set('Authorization', `Bearer ${tokenIntruso}`); // Usando token do Intruso

      expect(res.statusCode).toEqual(403);
  });
});