# Arquitetura do Sistema – App EcoGuia Fortaleza 🌱

## 1\. Visão Geral da Arquitetura

A arquitetura do **App EcoGuia Fortaleza** é baseada no modelo **Cliente-Servidor**. Ela foi projetada para ser **multiplataforma**, **escalável** e **modular**,  o sistema é dividido em componentes distintos para facilitar o desenvolvimento e a manutenção.

O sistema é composto por três camadas principais:

  * **Camada de Clientes (Frontend):** Responsável pela interface com o usuário. Inclui o aplicativo mobile e a versão web.
  * **Camada de Servidor (Backend):** Atua como o cérebro do sistema, processando a lógica de negócio, gerenciando as requisições dos clientes e orquestrando as interações com o banco de dados e serviços externos.
  * **Camada de Dados:** Responsável pelo armazenamento e persistência das informações do sistema, além de integrar com APIs de terceiros.

-----

## 2\. Componentes e Tecnologias

### **2.1. Frontend (Camada de Clientes)**

O frontend será desenvolvido para suportar múltiplas plataformas, visando a maior abrangência de usuários.

  * **Aplicativo Mobile**: Interface principal para usuários de smartphones Android e iOS.
  * **Versão Web Responsiva**: Versão do aplicativo acessível via navegadores, adaptável a diferentes tamanhos de tela (desktops e tablets).

### **2.2. Backend (Camada de Servidor)**

O backend é uma **API RESTful central**, que serve como o ponto único de comunicação entre o frontend e a camada de dados.

  * **Padrão Arquitetural**: **Cliente-Servidor**. O frontend envia requisições HTTP para a API, que as processa e retorna respostas no formato JSON.
  * **Principais Funções**:
      * Gerenciamento de usuários (cadastro, login).
      * Lógica de negócio para resíduos, jardinagem e engajamento comunitário.
      * Integração com APIs externas.
      * Autenticação e autorização de requisições.

### **2.3. Camada de Dados**

A camada de dados é responsável pela persistência das informações e por interagir com serviços de terceiros.

  * **Banco de Dados**: Um banco de dados relacional será utilizado para armazenar dados persistentes, como perfis de usuário, pontos de coleta, plantas e conteúdos educativos.
  * **APIs Externas**: Serviços de terceiros que fornecem funcionalidades específicas.
      * **Groq Cloud API**: Utilizada para funcionalidades de **chatbot** (assistente virtual).
      * **OpenWeatherMap API**: Utilizada para obter dados de **previsão do tempo**, que podem ser integrados à funcionalidade de jardinagem urbana.

-----

## 3\. Diagrama de Arquitetura

![Diagrama de Arquitetura](arquitetura.png)

-----

## 4\. Decisões Técnicas e Justificativas

Esta seção detalha as escolhas tecnológicas e o porquê de cada uma delas, alinhando-as com os requisitos do projeto.

  * **Arquitetura Cliente-Servidor**:

      * **Justificativa**: Essa arquitetura permite que o frontend e o backend sejam desenvolvidos e mantidos de forma independente. O backend pode ser escalado (adicionando mais servidores) para lidar com um aumento de usuários sem afetar a camada de clientes. Além disso, a separação de responsabilidades melhora a segurança e a manutenibilidade do sistema.

  * **Uso de APIs Externas (Groq e OpenWeatherMap)**:

      * **Justificativa**: Em vez de desenvolvermos funcionalidades complexas do zero (como um chatbot ou um sistema de previsão do tempo), a integração com APIs de terceiros nos permite economizar tempo e recursos. A Groq Cloud foi escolhida por sua alta velocidade e documentação robusta, e a OpenWeatherMap por ser um padrão de mercado com fácil integração. A utilização de APIs gratuitas ou com planos de baixo custo alinha-se com a restrição de recursos do projeto.

  * **Banco de Dados Relacional**:

      * **Justificativa**: Um banco de dados relacional é ideal para este projeto, pois a maioria dos dados (usuários, plantas, resíduos) possui relacionamentos bem definidos e uma estrutura consistente. Isso garante a integridade dos dados e facilita a execução de consultas complexas. A decisão de qual SGBD (Sistema Gerenciador de Banco de Dados) específico será utilizado (ex: MySQL, PostgreSQL) será tomada na próxima fase do projeto.
