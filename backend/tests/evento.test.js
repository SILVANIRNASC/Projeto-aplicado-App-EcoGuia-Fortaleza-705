const request = require('supertest');
const app = require('../src/app');
const pool = require('../src/config/db');

// Mock da gamificação
jest.mock('../src/utils/gamification', () => ({
  verificarConquista: jest.fn(),
}));

describe('Testes de Eventos e Agenda', () => {
  let tokenOrganizador = '';
  let idOrganizador = '';
  let tokenParticipante = '';
  let idParticipante = '';
  let idEventoCriado = '';

  const emailOrg = `organizador_${Date.now()}@teste.com`;
  const emailPart = `participante_${Date.now()}@teste.com`;

  beforeAll(async () => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});

    // Criar Organizador
    const resOrg = await request(app).post('/api/usuarios/cadastrar').send({
      nome: 'Organizador do Evento', email: emailOrg, senha_hash: '123456', 
      telefone: '85999999999', bairro: 'Benfica', cidade: 'Fortaleza', estado: 'CE'
    });
    idOrganizador = resOrg.body.id_usuario;

    // Criar Participante
    const resPart = await request(app).post('/api/usuarios/cadastrar').send({
      nome: 'Participante Curioso', email: emailPart, senha_hash: '123456',
      telefone: '85888888888', bairro: 'Centro', cidade: 'Fortaleza', estado: 'CE'
    });
    idParticipante = resPart.body.id_usuario;
  });

  afterAll(async () => {
    if (idEventoCriado) {
        // Remove participações primeiro (FK)
        await pool.query('DELETE FROM participacao_evento WHERE id_evento = $1', [idEventoCriado]);
        await pool.query('DELETE FROM eventos WHERE id_evento = $1', [idEventoCriado]);
    }
    if (idOrganizador) await pool.query('DELETE FROM usuarios WHERE id_usuario = $1', [idOrganizador]);
    if (idParticipante) await pool.query('DELETE FROM usuarios WHERE id_usuario = $1', [idParticipante]);
    
    await pool.end();
    jest.restoreAllMocks();
  });

  // --- TESTES ---

  it('POST /api/eventos - Deve criar um evento e incluir organizador automaticamente', async () => {
    // Data de amanhã para garantir que apareça na lista (filtro >= CURRENT_DATE)
    const amanha = new Date();
    amanha.setDate(amanha.getDate() + 1);

    const res = await request(app)
      .post('/api/eventos')
      .send({
        titulo: 'Mutirão de Limpeza',
        descricao: 'Vamos limpar a praça!',
        data_evento: amanha.toISOString(),
        local: 'Praça da Gentilândia',
        id_usuario: idOrganizador // Quem está criando
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id_evento');
    
    idEventoCriado = res.body.id_evento;

    // Verifica se o organizador já foi inserido na tabela de participação (Auto Check-in)
    const check = await pool.query('SELECT * FROM participacao_evento WHERE id_evento = $1 AND id_usuario = $2', [idEventoCriado, idOrganizador]);
    expect(check.rows.length).toBe(1);
  });

  it('GET /api/eventos - Deve listar eventos futuros', async () => {
    // Participante consulta a lista
    const res = await request(app)
        .get('/api/eventos')
        .query({ id_usuario: idParticipante }); // Envia ID via query param

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    
    const evento = res.body.find(e => e.id_evento === idEventoCriado);
    expect(evento).toBeDefined();
    expect(evento.titulo).toBe('Mutirão de Limpeza');
    expect(evento.participando).toBe(false); // Participante ainda não confirmou
  });

  it('POST /api/eventos/:id/participar - Deve confirmar presença (Check-in)', async () => {
    const res = await request(app)
      .post(`/api/eventos/${idEventoCriado}/participar`)
      .send({ id_usuario: idParticipante });

    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toBe('adicionado');
    expect(res.body.message).toContain('confirmada');
  });

  it('GET /api/eventos/:id/participantes - Deve listar os dois participantes', async () => {
    const res = await request(app).get(`/api/eventos/${idEventoCriado}/participantes`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThanOrEqual(2); // Organizador + Participante
    
    const nomes = res.body.map(u => u.nome);
    expect(nomes).toContain('Organizador do Evento');
    expect(nomes).toContain('Participante Curioso');
  });

  it('POST /api/eventos/:id/participar - Deve cancelar presença (Check-out/Toggle)', async () => {
    // Chama a mesma rota de novo para testar o Toggle
    const res = await request(app)
      .post(`/api/eventos/${idEventoCriado}/participar`)
      .send({ id_usuario: idParticipante });

    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toBe('removido'); // Deve ter removido
    expect(res.body.message).toContain('cancelada');
  });
});