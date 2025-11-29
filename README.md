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

## 📅 Contexto e Processo de Validação

A validação foi realizada entre **25 e 26 de novembro de 2025**. O processo utilizou **testes de usabilidade moderados** e **formulários quantitativos (Google Forms)**.

Os participantes executaram tarefas, como localizar ecopontos e usar o chatbot, e avaliaram a experiência.

## 👥 Público-Alvo e Perfis Estratégicos

A validação concentrou-se em **três perfis estratégicos** que representam os pilares de uso do EcoGuia em Fortaleza:

1.  **Jardinagem Doméstica:** Sra. Luanna (Messejana), focada em monitoramento de plantas e clima.
2.  **Indústria Têxtil (Resíduos):** Sr. José (Carlito Pamplona), proprietário de fábrica que necessita descartar retalhos de couro.
3.  **Setor Alimentício (Óleo):** Sra. Syntia (Álvaro Weyne), proprietária de empresa de salgados que precisa descartar óleo saturado.

## 🎯 Principais Feedbacks Recebidos

### Satisfação

*   O **índice de satisfação foi máximo**.
*   Houve elogios à **clareza das informações** e à **utilidade da Inteligência Artificial (IA)**.

### Dificuldade de Usabilidade

*   Uma utilizadora relatou **dificuldade inicial em encontrar o botão do Chatbot** ("ACHAR O CHAT").

### Sugestão para Funcionalidade

*   Foi sugerida a criação de **grupos/comunidades** dentro do app para **troca de ideias entre moradores**.

## ✅ Ajustes e Próximos Passos (Backlog)

Foram implementados ajustes imediatos e planejamento futuro.

| Categoria | Descrição do Ajuste | Status | Fonte |
| :--- | :--- | :--- | :--- |
| **Usabilidade** | O **botão flutuante do EcoAssistente (Chatbot)** recebeu **maior destaque visual e contraste** para resolver a dificuldade de localização relatada. | ✅ Feito | |
| **Performance** | **Testes de carga** garantiram a estabilidade da busca de Ecopontos. | ✅ Feito | |
| **Futuro/Sugestão** | A funcionalidade de "**Fórum Comunitário**" (grupos/comunidades sugeridos) foi planeada para a **versão 2.0**. | ⚠️ Backlog | |

### 📸 Evidências Fotográficas
Para comprovar a realização dos testes, disponibilizamos as fotos e autorizações na pasta de evidências.

📂 **[CLIQUE AQUI PARA ABRIR A PASTA DE EVIDÊNCIAS (FOTOS)](./validation/evidence/)**

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
