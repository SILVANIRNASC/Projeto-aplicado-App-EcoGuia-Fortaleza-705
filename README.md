## 🌱 App EcoGuia Fortaleza
Projeto Aplicado Multiplataforma - Etapa 2 (N708)

O EcoGuia Fortaleza é uma solução tecnológica alinhada à **ODS 11 – Cidades e Comunidades Sustentáveis**.

### 🎯 Propósito
O App EcoGuia Fortaleza é uma plataforma multiplataforma (**Web e Mobile**) projetada para apoiar práticas de sustentabilidade urbana. O sistema democratiza o saber ambiental, oferecendo ferramentas gamificadas, localização de ecopontos e assistência via Inteligência Artificial para engajar a população na gestão consciente de resíduos e jardinagem urbana.

---

## ⚠️ Problema Solucionado
O projeto visa resolver a **gestão ineficiente de resíduos sólidos e a desconexão ambiental**, abordando os seguintes desafios:

*   **Desconhecimento:** Falta de informação centralizada sobre Ecopontos.
*   **Falta de engajamento:** Desconexão entre geração e destinação de lixo.
*   **Dúvidas Técnicas:** Dificuldade em obter respostas rápidas sobre sustentabilidade.
*   **Isolamento:** Falta de divulgação de eventos locais.

---

## 2. Funcionalidades Principais

1.  **🤖 EcoAssistente (Chatbot Inteligente)**
    *   Assistência via IA (Groq Cloud) para responder dúvidas em linguagem natural.
    *   Possui ações rápidas e um widget flutuante acessível de qualquer tela.

2.  **🏆 Gamificação ("Sua Jornada Verde")**
    *   Sistema de pontos e níveis para incentivar o uso.
    *   Oferece conquistas desbloqueáveis (ex: "Jardineiro Iniciante").

3.  **🌻 Meu Jardim Sustentável**
    *   Cadastro e gerenciamento de plantas.
    *   Monitoramento de Rega: Alertas visuais baseados no clima (OpenWeather).

4.  **♻️ Descarte Sustentável**
    *   Mapa e lista de Ecopontos com filtros por bairro e tipo de resíduo.
    *   Apresenta detalhes completos (endereço, horário, itens aceitos).

5.  **📅 Clima & Agenda**
    *   Oferece recomendações de plantio baseadas no clima atual.
    *   Listagem de mutirões e workshops com confirmação de presença.

### 📸 Screenshots
O sistema possui interfaces visuais para:
*   Dashboard Gamificado
*   EcoAssistente (Chatbot)
*   Jardim e Monitoramento
*   Busca de Descarte
*   Clima Inteligente
*   Agenda de Eventos

*(Nota: Substitua os itens acima pelos prints reais do seu sistema)*

---

## 3. Tecnologias Utilizadas

| Componente | Tecnologias |
| :--- | :--- |
| **Frontend** | React.js (Web), React Native (Mobile) |
| **Backend** | Node.js, Express.js |
| **Banco de Dados** | PostgreSQL |
| **APIs Externas** | Groq Cloud (IA), OpenWeatherMap (Clima) |
| **Ferramentas de Desenvolvimento** | Git, GitHub, Vercel, Figma |

---

## 4. Arquitetura do Sistema
O sistema adota uma arquitetura **Cliente-Servidor baseada em API RESTful**.

*   **Frontend:** Consome dados JSON do backend.
*   **Backend:** Centraliza regras de negócio, autenticação (JWT) e conexões.
*   **Banco de Dados:** PostgreSQL relacional para garantir a integridade dos dados.

---

## 5. Instalação e Execução

### Pré-requisitos
*   Node.js (v16+)
*   PostgreSQL instalado

### Passo a Passo

1.  **Clonar o repositório:**
    ```bash
    git clone https://github.com/seu-usuario/eco-guia-fortaleza.git
    ```

2.  **Acessar o diretório principal:**
    ```bash
    cd eco-guia-fortaleza
    ```

3.  **Configurar Backend:**
    ```bash
    cd backend
    npm install
    # Crie um arquivo .env na raiz do backend com as variáveis abaixo
    npm run dev
    ```

4.  **Configurar Frontend:**
    ```bash
    cd ../frontend/web
    npm install
    npm start
    ```

### Variáveis de Ambiente (`.env` do Backend)
Estas variáveis devem ser definidas na raiz da pasta `backend` para a execução do sistema.

```env
PORT=3000
DATABASE_URL=postgres://usuario:senha@localhost:5432/ecoguia_db
GROQ_API_KEY=sua_chave_aqui
OPENWEATHER_API_KEY=sua_chave_aqui
JWT_SECRET=sua_chave_secreta
```

---

## 6. Acesso ao Sistema (Deploy)
O sistema está hospedado e acessível publicamente:

### 🔗 Acesse aqui:
[https://ecoguia-front.vercel.app/](https://ecoguia-front.vercel.app/)

### Credenciais de Teste:
*   **Login:** teste@teste.com
*   **Senha:** 123456

---

## 7. 📢 Validação com Público-Alvo
A validação foi realizada com **3 perfis reais** (Jardinagem, Indústria Têxtil e Alimentícia) na cidade de Fortaleza.

### Resultados Chave:
*   Alcançou **Nota máxima de satisfação (NPS)**.
*   O Chatbot foi validado como **ferramenta eficaz de educação**.
*   Ajustes de usabilidade (como o tamanho da fonte e a visibilidade do chat) foram aplicados com base nos testes.

[📂 CLIQUE AQUI PARA VER O RELATÓRIO COMPLETO, FOTOS E EVIDÊNCIAS](link-para-a-pasta-validation)

*(Acesse a pasta `validation/` para ver o relatório detalhado, fotos dos testes e feedbacks brutos).*

---

## 8. Equipe de Desenvolvimento

| Nome | Matrícula | Função Principal |
| :--- | :--- | :--- |
| Anyele Ventura Lima | 2323813 | Desenvolvimento Backend e APIs |
| Isadora Ianne Aguiar | 2323864 | Validação e QA |
| Luiz Henrique | 202400004 | Desenvolvimento Frontend e UX/UI |
| Silvanir Nascimento | 2326784 | Análise de Requisitos e Documentação |
```
