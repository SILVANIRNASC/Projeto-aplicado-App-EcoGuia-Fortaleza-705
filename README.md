#  App EcoGuia Fortaleza

## 1. Título e Descrição do Projeto

### Nome do Sistema
**App EcoGuia Fortaleza**

### Breve Descrição do Propósito
O **App EcoGuia Fortaleza** é uma plataforma multiplataforma (Web e Mobile) projetada para apoiar práticas de sustentabilidade urbana na cidade de Fortaleza. O projeto contribui diretamente para a **ODS 11 – Cidades e Comunidades Sustentáveis**, promovendo soluções para o desenvolvimento urbano inclusivo, seguro, resiliente e sustentável.

A iniciativa engaja a população na gestão consciente de resíduos, incentiva a jardinagem urbana e conecta a comunidade através de eventos e compartilhamento de conhecimentos. O sistema democratiza o saber ambiental, oferecendo ferramentas gamificadas e assistência via Inteligência Artificial.

### Problema Solucionado
O projeto visa resolver a **gestão ineficiente de resíduos sólidos urbanos** e a desconexão da população com o meio ambiente, abordando dores como:
* **Desconhecimento sobre descarte:** Falta de informação centralizada sobre Ecopontos e o que descartar neles.
* **Falta de engajamento:** A desconexão entre a geração de lixo e sua destinação final.
* **Dúvidas Técnicas:** Dificuldade em obter respostas rápidas sobre sustentabilidade e jardinagem.
* **Isolamento Comunitário:** Falta de divulgação de eventos locais focados em sustentabilidade.

---

## 2. Funcionalidades Implementadas

### Lista de Funcionalidades Principais

#### 1. EcoAssistente (Chatbot Inteligente)
* **Assistência via IA:** Chatbot integrado (via Groq Cloud API) para responder dúvidas sobre sustentabilidade em linguagem natural.
* **Ações Rápidas:** Botões de atalho para "Dicas de jardinagem", "Pontos de coleta" e "Eventos próximos".
* **Interface Amigável:** Widget flutuante acessível de qualquer tela do sistema.

#### 2. Dashboard e Gamificação ("Sua Jornada Verde")
* Visão geral do progresso do usuário com sistema de pontos e níveis.
* **Conquistas:** Sistema de badges (medalhas) desbloqueáveis, como "Jardineiro Iniciante" e "Semente Plantada".

#### 3. Meu Jardim Sustentável
* **Gerenciamento de Plantas:** Cadastro de espécies com monitoramento de datas.
* **Monitoramento de Rega:** Alertas visuais indicando se a rega está "Em dia" ou "Atrasada".
* **Dicas da Comunidade:** Espaço colaborativo para usuários publicarem dicas.

#### 4. Descarte Sustentável (Busca de Ecopontos)
* **Busca Inteligente:** Filtros por Bairro e Tipo de Resíduo.
* **Detalhes do Ponto:** Endereço, horário e itens aceitos (pilhas, óleo, eletrônicos).

#### 5. Clima Inteligente & Agenda
* **Integração OpenWeather:** Recomendações de plantio baseadas no clima atual de Fortaleza.
* **Eventos:** Listagem de mutirões e workshops com confirmação de presença.

### Status de Implementação
* [x] Autenticação e Perfil de Usuário
* [x] Sistema de Gamificação (Pontos/Conquistas)
* [x] Módulo de Jardinagem e Monitoramento
* [x] EcoAssistente (Chatbot IA)
* [x] Localizador de Ecopontos
* [x] Integração Climática

### Screenshots das Telas Principais

| Dashboard Gamificado | EcoAssistente (Chatbot) | Jardim e Monitoramento |
|:---:|:---:|:---:|
| ![Dashboard](insira_link_imagem_dashboard) | ![Chatbot](insira_link_imagem_chatbot) | ![Jardim](insira_link_imagem_jardim) |

| Busca de Descarte | Clima Inteligente | Agenda de Eventos |
|:---:|:---:|:---:|
| ![Descarte](insira_link_imagem_descarte) | ![Clima](insira_link_imagem_clima) | ![Eventos](insira_link_imagem_eventos) |

---

## 3. Tecnologias utilizadas
* **Linguagens de programação**
  * JavaScript
  * SQL


* **Frameworks e bibliotecas**
  * React.js (Web)
  * React Native (Mobile)
  * Express.js (Backend)
  * Bibliotecas de API: Groq Cloud e OpenWeatherMap


* **Banco de dados**
  * PostgreSQL


* **Ferramentas de desenvolvimento**
  * Node.js
  * Figma
  * Git & GitHub
  * Vercel
## 4. Arquitetura do sistema

* **Visão geral da arquitetura implementada**
  O sistema adota uma arquitetura **Cliente-Servidor** baseada em **API RESTful**. O front-end (Web e Mobile) atua como cliente, consumindo dados JSON processados pelo back-end, que centraliza as regras de negócio, segurança e gerencia a comunicação com o banco de dados e serviços externos.


* **Componentes principais**
  * **Frontend (Client Side):**
    * **Web (React.js):** Interface responsiva para acesso via navegador, focada em gestão e visualização de mapas.
    * **Mobile (React Native):** Aplicação nativa para uso em campo, permitindo acesso rápido a funcionalidades como check-in em eventos e scanner de plantas.
  * **Backend (Server Side):**
    * **API Node.js + Express:** Servidor responsável por receber requisições HTTP, gerenciar autenticação (JWT) e orquestrar a lógica da aplicação.
  * **Banco de Dados:**
    * **PostgreSQL:** Sistema gerenciador de banco de dados relacional utilizado para armazenar informações de usuários, catálogo de plantas, localização de ecopontos e registros de gamificação.


* **Integrações realizadas**
  * **Groq Cloud API:** Integração de Inteligência Artificial (LLM) para o funcionamento do chatbot "EcoAssistente".
  * **OpenWeatherMap API:** Consumo de dados climáticos em tempo real para fornecer recomendações personalizadas de rega e plantio.
  * **Serviços de Geolocalização:** Uso de APIs de mapas para renderização e localização dos pontos de coleta seletiva.

## 5. Instruções de instalação e execução

* **Pré-requisitos**
  * **Node.js** (versão 16 ou superior) instalado.
  * **PostgreSQL** instalado e em execução.
  * **Git** para clonagem do repositório.
  * Gerenciador de pacotes **NPM** ou **Yarn**.
  * (Opcional para Mobile) **Expo Go** no celular ou emulador Android/iOS configurado.


* **Passo a passo para instalação**
  1.  **Clonar o repositório:**
     ```bash
     git clone [https://github.com/seu-usuario/eco-guia-fortaleza.git](https://github.com/seu-usuario/eco-guia-fortaleza.git)
     cd eco-guia-fortaleza
     ```

  2.  **Instalar dependências do Backend:**
     ```bash
     cd backend
     npm install
     ```

  3. **Instalar dependências do Frontend (Web):**
     ```bash
     cd ../frontend-web
     npm install
     ```


* **Comandos para execução**
  * **Rodar o Backend (Servidor):**
    ```bash
    # Dentro da pasta /backend
    npm run dev
    ```
  * **Rodar o Frontend Web:**
    ```bash
    # Dentro da pasta /frontend-web
    npm start
    ```
  * **Rodar a versão Mobile:**
    ```bash
    # Dentro da pasta /mobile
    npx expo start
    ```


* **Configurações necessárias**
  Antes de executar, é necessário criar um arquivo **`.env`** na raiz da pasta do backend com as seguintes variáveis de ambiente:
  ```env
  PORT=3000
  DATABASE_URL=postgres://usuario:senha@localhost:5432/ecoguia_db
  GROQ_API_KEY=sua_chave_aqui
  OPENWEATHER_API_KEY=sua_chave_aqui
  JWT_SECRET=sua_chave_secreta

## 6. Acesso ao sistema

* **URL de acesso (se hospedado)**
  O sistema está hospedado e acessível publicamente através do link:
  * [https://ecoguia-front.vercel.app/](https://ecoguia-front.vercel.app/)


* **Credenciais de teste**
  Para validação das funcionalidades de usuário logado (gamificação e perfil), utilize as credenciais abaixo ou crie uma nova conta:
  * **Login (E-mail):** `teste@teste.com`
  * **Senha:** `123456` *(ou a senha padrão definida no banco de dados)*

## 7. Validação com Público-Alvo

* **Definição específica do público-alvo**
  O público-alvo é composto por **moradores da cidade de Fortaleza**, abrangendo desde jovens adultos engajados em causas ambientais e tecnologia, até entusiastas de jardinagem doméstica que buscam orientações sobre cultivo e descarte correto. O foco é democratizar o acesso à informação para cidadãos que desejam adotar hábitos sustentáveis, mas carecem de ferramentas centralizadas.


* **Resumo do processo de validação**
  A validação foi realizada através de testes de usabilidade com um grupo amostral de usuários. Os participantes foram convidados a realizar tarefas específicas no sistema, como "Encontrar o ponto de coleta de pilhas mais próximo" e "Cadastrar uma planta no jardim virtual", enquanto a equipe observava a facilidade de navegação e o tempo de resposta.


* **Principais feedbacks recebidos**
  * **Interação com o Mapa:** Alguns usuários relataram que, inicialmente, era difícil distinguir quais Ecopontos aceitavam quais tipos de materiais apenas pelos ícones.
  * **Gamificação:** O sistema de pontos foi muito elogiado, sendo citado como um fator motivador para continuar usando o app.
  * **Assistente IA:** Os usuários acharam a resposta do "EcoAssistente" muito útil, mas sugeriram que ele estivesse mais visível em todas as telas.


* **Ajustes implementados**
  * **Melhoria nos Filtros:** Adição de etiquetas de texto e filtros mais claros na tela de "Descarte Sustentável" para facilitar a busca por tipo de resíduo.
  * **Acesso ao Chatbot:** O widget do EcoAssistente foi tornado flutuante e acessível a partir de qualquer página da aplicação para tirar dúvidas rápidas.
  * **Interface de Eventos:** Simplificação do processo de confirmação de presença na agenda sustentável.

## 8. Equipe de desenvolvimento

* **Membros da equipe**
| Nome | Matrícula | Função |
| :--- | :--- | :--- |
| **Anyele Ventura Lima** | 2323813 | Desenvolvimento Backend e APIs |
| **Isadora Ianne Aguiar de Castro** | 2323864 | Validação do sistema |
| **Luiz Henrique** | 202400004 | Desenvolvimento Frontend e UX/UI |
| **Silvanir Nascimento dos Santos** | 2326784 | Análise de Requisitos e Documentação |
* **Papéis e contribuições principais**
  * **Anyele Ventura Lima:** Focada no **Desenvolvimento Backend e APIs**, sendo responsável pela lógica do servidor e integração de dados.
  * **Isadora Ianne Aguiar de Castro:** Responsável pela **Validação do sistema**, garantindo a qualidade e o funcionamento correto das funcionalidades.
  * **Luiz Henrique:** Encarregado do **Desenvolvimento Frontend e UX/UI**, criando as interfaces visuais e a experiência do usuário.
  * **Silvanir Nascimento dos Santos:** Atuou na **Análise de Requisitos e Documentação**, estruturando o escopo e os registros técnicos do projeto.
