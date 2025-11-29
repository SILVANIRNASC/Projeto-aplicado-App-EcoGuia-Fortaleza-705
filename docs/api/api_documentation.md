Documentação da API - EcoGuia FortalezaEsta documentação descreve os endpoints da API RESTful do EcoGuia. A API foi desenvolvida em Node.js com Express e utiliza banco de dados PostgreSQL.Base URL Local: http://localhost:3000/api1. Monitoramento e UtilitáriosHealth CheckVerifica a saúde da API e se o servidor está online.URL: /healthMétodo: GETResposta de Sucesso (200 OK):{
  "status": "ok",
  "message": "API EcoGuia Fortaleza está funcionando!",
  "timestamp": "2025-11-29T20:00:00.000Z"
}
Dados Climáticos (OpenWeatherMap)Retorna dados do clima atual de Fortaleza e gera uma dica de sustentabilidade baseada na temperatura/chuva.URL: /weatherMétodo: GETResposta de Sucesso (200 OK):{
  "temp": 29,
  "description": "céu limpo",
  "sustainability_tip": "Dia quente! Aproveite para secar roupas no varal e economizar energia.",
  "message": "Dados climáticos de Fortaleza"
}
2. Inteligência Artificial (Groq Cloud)Assistente Virtual (Chatbot)Recebe uma pergunta do usuário e retorna uma resposta gerada por IA, contextualizada com o clima e eventos locais.URL: /askMétodo: POSTCorpo da Requisição (JSON):{
  "question": "Como posso descartar óleo de cozinha usado?"
}
Resposta de Sucesso (200 OK):{
  "resposta": "Para descartar o óleo, espere esfriar, coloque em uma garrafa PET e leve a um Ecoponto..."
}
3. Usuários (/usuarios)Cadastro de UsuárioRegistra um novo usuário e atribui automaticamente a conquista "Bem-vindo".URL: /usuarios/cadastrarMétodo: POSTCorpo da Requisição:{
  "nome": "João Silva",
  "email": "joao@email.com",
  "senha_hash": "senha123",
  "telefone": "85999999999",
  "bairro": "Benfica",
  "cidade": "Fortaleza",
  "estado": "CE"
}
LoginAutentica o usuário comparando o hash da senha.URL: /usuarios/loginMétodo: POSTCorpo da Requisição:{
  "email": "joao@email.com",
  "password": "senha123"
}
Buscar Usuário por IDRetorna os dados do perfil, estatísticas (total de plantas/dicas) e lista de conquistas desbloqueadas.URL: /usuarios/:idMétodo: GETAtualizar UsuárioAtualiza dados cadastrais.URL: /usuarios/:idMétodo: PUTCorpo da Requisição:{
  "nome": "João S.",
  "telefone": "85888888888",
  "bairro": "Centro",
  "cidade": "Fortaleza",
  "estado": "CE"
}
4. Pontos de Coleta (/pontos)Listar EcopontosRetorna todos os pontos de coleta, incluindo a lista de tipos de resíduos aceitos (com cores para o mapa).URL: /pontosMétodo: GETResposta Exemplo:[
  {
    "id_ponto": 1,
    "nome_local": "Ecoponto Varjota",
    "endereco": "Rua Meruoca, s/n",
    "latitude": -3.735,
    "longitude": -38.485,
    "lista_residuos": [{"nome": "Vidro", "cor": "#28a745"}, {"nome": "Óleo", "cor": "#ffc107"}]
  }
]
5. Guia de Plantas (/plantas)Cadastrar PlantaAdiciona uma planta ao jardim do usuário. Verifica conquistas "Primeira Planta" e "Jardineiro Top".URL: /plantasMétodo: POSTCorpo da Requisição:{
  "id_usuario": 1,
  "nome_popular": "Jiboia",
  "nome_cientifico": "Epipremnum aureum",
  "data_plantio": "2025-11-01",
  "frequencia_rega": 3
}
Listar Plantas do UsuárioRetorna as plantas e calcula o status da próxima rega (ex: "Hoje", "Amanhã", "Atrasada").URL: /plantas/usuario/:id_usuarioMétodo: GETResposta:[
  {
    "nome_popular": "Jiboia",
    "status_rega": "Em 2 dias",
    "proxima_rega_data": "2025-11-30T..."
  }
]
Registrar CuidadoAtualiza a data da última ação na planta.URL: /plantas/:id_planta/cuidadoMétodo: PUTCorpo da Requisição:{
  "tipo_cuidado": "rega" 
}
Opções para tipo_cuidado: "rega", "adubacao", "poda".6. Dicas Sustentáveis (/dicas)Listar Feed de DicasLista dicas da comunidade com nome do autor.URL: /dicasMétodo: GETPublicar DicaUsuário envia uma dica e pode ganhar a conquista "Eco Mentor".URL: /dicasMétodo: POSTCorpo da Requisição:{
  "id_usuario": 1,
  "descricao": "Reutilize potes de sorvete para organizar pregos e parafusos."
}
7. Eventos (/eventos)Listar EventosLista eventos futuros. Se informar id_usuario na query, retorna se ele já confirmou presença.URL: /eventos?id_usuario=1Método: GETCriar EventoURL: /eventosMétodo: POSTCorpo da Requisição:{
  "titulo": "Limpeza da Praia",
  "descricao": "Mutirão voluntário",
  "data_evento": "2025-12-15 08:00:00",
  "local": "Praia de Iracema",
  "id_usuario": 1
}
Confirmar/Cancelar PresençaAlterna a participação do usuário no evento (Check-in/Check-out). Gera conquista "Evento Presença".URL: /eventos/:id_evento/participarMétodo: POSTCorpo da Requisição:{
  "id_usuario": 1
}
Ver ParticipantesLista os nomes de quem vai ao evento.URL: /eventos/:id_evento/participantesMétodo: GET
