const request = require('supertest');
const app = require('../src/app'); 
const pool = require('../src/config/db');

describe('Autenticação e Banco de Dados', () => {
    beforeAll(() => {
        jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    // Email aleatório para não dar erro de "email já existe" ao rodar várias vezes
    const emailTeste = `avaliador_${Date.now()}@teste.com`;
    const senhaTeste = '123456';
    let tokenGerado = '';

    it('1. Deve cadastrar um usuário no Banco de Dados (Postgres)', async () => {
        const res = await request(app)
            .post('/api/usuarios/cadastrar')
            .send({
                nome: 'Avaliador do Projeto',
                email: emailTeste,
                senha_hash: senhaTeste, 
                telefone: '85999999999',
                bairro: 'Centro',
                cidade: 'Fortaleza',
                estado: 'CE'
            });

        // Se retornar 201, prova que conectou no banco e salvou
        expect(res.statusCode).toEqual(201); 
        expect(res.body).toHaveProperty('id_usuario');
    });

    it('2. Deve fazer Login e receber um Token JWT', async () => {
        const res = await request(app)
            .post('/api/usuarios/login')
            .send({
                email: emailTeste,
                password: senhaTeste
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
        
        tokenGerado = res.body.token;
    });

    it('3. Deve bloquear acesso a rota protegida sem Token', async () => {
        // Tenta pegar plantas de um usuário qualquer sem mandar token
        const res = await request(app).get('/api/plantas/usuario/1');
        
        // Deve ser 401 (Não autorizado) ou 403 (Proibido)
        expect(res.statusCode).not.toEqual(200);
    });
});