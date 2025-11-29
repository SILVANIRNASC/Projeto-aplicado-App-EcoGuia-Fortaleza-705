Documentação da API - EcoGuia Fortaleza

Esta documentação descreve os endpoints da API RESTful do EcoGuia. A API foi desenvolvida em Node.js com Express e utiliza banco de dados PostgreSQL.

Base URL Local: http://localhost:3000/api

1. Monitoramento e Utilitários

Health Check

Verifica a saúde da API e se o servidor está online.

URL: /health

Método: GET

Resposta de Sucesso (200 OK):

{
  "status": "ok",
  "message": "API EcoGuia Fortaleza está funcionando!",
  "timestamp": "2025-11-29T20:00:00.000Z"
}


Dados Climáticos (OpenWeatherMap)

Retorna dados do clima atual de Fortaleza e gera uma dica de sustentabilidade baseada na temperatura/chuva.

URL: /weather

Método: GET

Resposta de Sucesso (200 OK):

{
  "temp": 29,
  "description": "céu limpo",
  "sustainability_tip": "Dia quente! Aproveite para secar roupas no varal e economizar energia.",
  "message": "Dados climáticos de Fortaleza"
}


2. Inteligência Artificial (Groq Cloud)

Assistente Virtual (Chatbot)

Recebe uma pergunta do usuário e retorna uma resposta gerada por IA, contextualizada com o clima e eventos locais.

URL: /ask

Método: POST

Corpo da Requisição (JSON):

{
  "question": "Como posso descartar óleo de cozinha usado?"
}


Resposta de Sucesso (200 OK):

{
  "resposta": "Para descartar o óleo, espere esfriar, coloque em uma garrafa PET e leve a um Ecoponto..."
}


3. Usuários (/usuarios)

Cadastro de Usuário

Registra um novo usuário e atribui automaticamente a conquista "Bem-vindo".

URL: /usuarios/cadastrar

Método: POST

Corpo da Requisição:

{
  "nome": "João Silva",
  "email": "joao@email.com",
  "senha_hash": "senha123",  // Nota: O backend espera este nome de campo
  "telefone": "85999999999",
  "bairro": "Benfica",
  "cidade": "Fortaleza",
  "estado": "CE"
}


Login

Autentica o usuário comparando o hash da senha.

URL: /usuarios/login

Método: POST

Corpo da Requisição:

{
  "email": "joao@email.com",
  "password": "senha123"
}


Buscar Usuário por ID

Retorna os dados do perfil, estatísticas (total de plantas/dicas) e lista de conquistas desbloqueadas.

URL: /usuarios/:id

Método: GET

Atualizar Usuário

Atualiza dados cadastrais.

URL: /usuarios/:id

Método: PUT

Corpo da Requisição:

{
  "nome": "João S.",
  "telefone": "85888888888",
  "bairro": "Centro",
  "cidade": "Fortaleza",
  "estado": "CE"
}


4. Pontos de Coleta (/pontos)

Listar Ecopontos

Retorna todos os pontos de coleta, incluindo a lista de tipos de resíduos aceitos (com cores para o mapa).

URL: /pontos

Método: GET

Resposta Exemplo:

[
  {
    "id_ponto": 1,
    "nome_local": "Ecoponto Varjota",
    "endereco": "Rua Meruoca, s/n",
    "latitude": -3.735,
    "longitude": -38.485,
    "lista_residuos": [{"nome": "Vidro", "cor": "#28a745"}, {"nome": "Óleo", "cor": "#ffc107"}]
  }
]


5. Guia de Plantas (/plantas)

Cadastrar Planta

Adiciona uma planta ao jardim do usuário. Verifica conquistas "Primeira Planta" e "Jardineiro Top".

URL: /plantas

Método: POST

Corpo da Requisição:

{
  "id_usuario": 1,
  "nome_popular": "Jiboia",
  "nome_cientifico": "Epipremnum aureum",
  "data_plantio": "2025-11-01",
  "frequencia_rega": 3
}


Listar Plantas do Usuário

Retorna as plantas e calcula o status da próxima rega (ex: "Hoje", "Amanhã", "Atrasada").

URL: /plantas/usuario/:id_usuario

Método: GET

Resposta:

[
  {
    "nome_popular": "Jiboia",
    "status_rega": "Em 2 dias",
    "proxima_rega_data": "2025-11-30T..."
  }
]


Registrar Cuidado

Atualiza a data da última ação na planta.

URL: /plantas/:id_planta/cuidado

Método: PUT

Corpo da Requisição:

{
  "tipo_cuidado": "rega" 
}


Opções para tipo_cuidado: "rega", "adubacao", "poda".

6. Dicas Sustentáveis (/dicas)

Listar Feed de Dicas

Lista dicas da comunidade com nome do autor.

URL: /dicas

Método: GET

Publicar Dica

Usuário envia uma dica e pode ganhar a conquista "Eco Mentor".

URL: /dicas

Método: POST

Corpo da Requisição:

{
  "id_usuario": 1,
  "descricao": "Reutilize potes de sorvete para organizar pregos e parafusos."
}


7. Eventos (/eventos)

Listar Eventos

Lista eventos futuros. Se informar id_usuario na query, retorna se ele já confirmou presença.

URL: /eventos?id_usuario=1

Método: GET

Criar Evento

URL: /eventos

Método: POST

Corpo da Requisição:

{
  "titulo": "Limpeza da Praia",
  "descricao": "Mutirão voluntário",
  "data_evento": "2025-12-15 08:00:00",
  "local": "Praia de Iracema",
  "id_usuario": 1
}


Confirmar/Cancelar Presença

Alterna a participação do usuário no evento (Check-in/Check-out). Gera conquista "Evento Presença".

URL: /eventos/:id_evento/participar

Método: POST

Corpo da Requisição:

{
  "id_usuario": 1
}


Ver Participantes

Lista os nomes de quem vai ao evento.

URL: /eventos/:id_evento/participantes

Método: GET
