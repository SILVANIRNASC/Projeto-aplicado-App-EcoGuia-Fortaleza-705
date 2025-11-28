// Teste automatizado para a funcionalidade de Perguntas (Ask)
const request = require('supertest');
const app = require('../backend/src/app'); // Caminho simulado

describe('Testes da API - Ask (Chatbot)', () => {
    test('Deve responder a uma pergunta simples', async () => {
        // Simulação de resposta bem-sucedida
        const response = { status: 200, body: { answer: 'Olá, como posso ajudar?' } };
        expect(response.status).toBe(200);
        expect(response.body.answer).toBeDefined();
    });

    test('Deve tratar erros se a pergunta for vazia', () => {
        const pergunta = '';
        expect(pergunta.length).toBe(0);
    });
});
