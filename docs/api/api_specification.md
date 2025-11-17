# Especificação da API – App EcoGuia Fortaleza 🌿

Este documento detalha a especificação técnica da API **App EcoGuia Fortaleza**, incluindo seus endpoints, formatos de requisição e resposta, e os mecanismos de autenticação. Ele serve como um guia para desenvolvedores que precisam integrar sistemas com esta API.

## 1\. Endpoints Previstos

### 1.1. `POST /api/ask`

  * **Descrição**: Envia uma pergunta ao assistente virtual de sustentabilidade e recebe uma resposta. A API processa a pergunta usando a Groq Cloud API e retorna uma resposta contextualizada para a região de Fortaleza.
  * **Autenticação**: Requer um token de autenticação (JWT).

### 1.2. `GET /api/health`

  * **Descrição**: Endpoint de verificação de saúde da API. É usado para monitorar se a aplicação está online e funcional. Não requer autenticação.

-----

## 2\. Autenticação e Autorização

A API utiliza o padrão de autenticação por **token**. Para acessar a maioria dos endpoints, o cliente deve incluir um token de autorização no cabeçalho da requisição.

  * **Método**: Bearer Token
  * **Formato**: O token de autenticação (JWT) deve ser enviado no cabeçalho `Authorization`.

**Exemplo de Cabeçalho de Requisição:**

```
Authorization: Bearer <seu_token_aqui>
Content-Type: application/json
```

**Observação**: O endpoint `/api/health` não exige autenticação.

-----

## 3\. Detalhamento de Endpoints

### 3.1. `POST /api/ask`

#### Parâmetros de Requisição

Este endpoint espera um corpo de requisição no formato JSON.

| Parâmetro | Tipo | Obrigatório | Descrição |
| :--- | :--- | :--- | :--- |
| `question` | `string` | Sim | A pergunta do usuário sobre sustentabilidade. |

**Exemplo de Requisição (Body):**

```json
{
  "question": "Como descartar óleo de cozinha usado em Fortaleza?"
}
```

#### Formatos de Resposta

##### Resposta de Sucesso (Status Code: `200 OK`)

A resposta retorna a resposta gerada pelo assistente virtual e o status da operação.

**Exemplo de Resposta (Body):**

```json
{
  "resposta": "Em Fortaleza, você pode descartar óleo de cozinha usado em pontos de coleta específicos, como...",
  "status": "success"
}
```

##### Resposta de Erro (Status Code: `400 Bad Request`)

Ocorre quando o formato da requisição é inválido, como a falta do parâmetro `question`.

**Exemplo de Resposta (Body):**

```json
{
  "error": "O campo 'question' é obrigatório.",
  "status": "error"
}
```

##### Resposta de Erro (Status Code: `500 Internal Server Error`)

Ocorre quando há um erro interno no servidor ao processar a requisição.

**Exemplo de Resposta (Body):**

```json
{
  "error": "Ocorreu um erro interno ao processar a sua requisição.",
  "status": "error"
}
```

-----

### 3.2. `GET /api/health`

#### Parâmetros de Requisição

Este endpoint não requer nenhum parâmetro.

#### Formatos de Resposta

##### Resposta de Sucesso (Status Code: `200 OK`)

Indica que a API está em pleno funcionamento.

**Exemplo de Resposta (Body):**

```json
{
  "status": "OK",
  "timestamp": "2024-09-25T10:00:00.000Z",
  "version": "1.0.0"
}
```

-----
