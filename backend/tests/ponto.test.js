const request = require('supertest');
const app = require('../src/app');
const pool = require('../src/config/db');

describe('Testes de Pontos de Coleta', () => {
  let idPontoTeste;
  let idResiduoTeste;

  // Cria um ponto e um tipo de resíduo para garantir que o teste funcione
  beforeAll(async () => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});

    // Cria um resíduo de teste (ex: Pilhas)
    const residuoRes = await pool.query(
      "INSERT INTO residuos (nome_tipo, cor_hex, descricao) VALUES ('Teste Pilhas', '#FF0000', 'Descrição teste') RETURNING id_residuo"
    );
    idResiduoTeste = residuoRes.rows[0].id_residuo;

    // Cria um ponto de coleta de teste
    const pontoRes = await pool.query(`
      INSERT INTO pontos_coleta (id_ponto, nome_local, endereco, latitude, longitude, horario_funcionamento) 
      VALUES (96, 'Ecoponto Teste Jest', 'Rua dos Testes, 123', -3.7319, -38.5267, '08h as 17h') 
      RETURNING id_ponto
    `);
    idPontoTeste = pontoRes.rows[0].id_ponto;

    // Vincula o resíduo ao ponto (Tabela N:N)
    await pool.query(
      "INSERT INTO ponto_residuo (id_ponto, id_residuo) VALUES ($1, $2)",
      [idPontoTeste, idResiduoTeste]
    );
  });

  // 2. Teardown: Limpa a bagunça
  afterAll(async () => {
    if (idPontoTeste && idResiduoTeste) {
      await pool.query('DELETE FROM ponto_residuo WHERE id_ponto = $1', [idPontoTeste]);
      await pool.query('DELETE FROM pontos_coleta WHERE id_ponto = $1', [idPontoTeste]);
      await pool.query('DELETE FROM residuos WHERE id_residuo = $1', [idResiduoTeste]);
    }
    await pool.end();
    jest.restoreAllMocks();
  });

  // --- TESTES ---

  it('GET /api/pontos - Deve retornar lista de pontos com seus resíduos', async () => {
    const res = await request(app).get('/api/pontos');

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toBeGreaterThan(0);

    // Verifica se encontrou o ponto de teste
    const pontoEncontrado = res.body.find(p => p.nome_local === 'Ecoponto Teste Jest');
    
    expect(pontoEncontrado).toBeDefined();
    expect(pontoEncontrado).toHaveProperty('latitude');
    expect(pontoEncontrado).toHaveProperty('longitude');
    
    // Verifica se a agregação de resíduos (JSON_AGG) funcionou
    expect(pontoEncontrado).toHaveProperty('lista_residuos');
    expect(Array.isArray(pontoEncontrado.lista_residuos)).toBeTruthy();
    expect(pontoEncontrado.lista_residuos[0]).toHaveProperty('nome', 'Teste Pilhas');
  });

  it('GET /api/pontos - Deve retornar coordenadas numéricas válidas', async () => {
    const res = await request(app).get('/api/pontos');
    const ponto = res.body[0];

    // Garante que latitude/longitude não são nulos e são números (ou strings convertíveis)
    expect(parseFloat(ponto.latitude)).not.toBeNaN();
    expect(parseFloat(ponto.longitude)).not.toBeNaN();
  });
});