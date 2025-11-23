# Projeto-EcoGuia-Fortaleza
Repositório do Projeto Aplicado N705 - Documentação técnica e protótipos.

**Tema:** App EcoGuia Fortaleza 🌱

---

## 1. Introdução
O projeto *App EcoGuia Fortaleza* contribui diretamente para a ODS 11 – Cidades e Comunidades Sustentáveis, ao propor soluções que favorecem o desenvolvimento urbano de forma inclusiva, segura, resiliente e sustentável. A iniciativa busca engajar a população na gestão consciente dos resíduos e no incentivo à jardinagem urbana, aproximando os cidadãos de práticas que fortalecem a relação entre qualidade de vida e preservação ambiental.

Por meio da integração de educação ambiental, descarte correto de resíduos e engajamento comunitário, o aplicativo incentiva comportamentos que reduzem impactos negativos no meio ambiente urbano, como o acúmulo de lixo em vias públicas, a poluição de solos e águas, além da emissão de gases associados à decomposição inadequada de resíduos. Dessa forma, a proposta pode promover uma cidade mais limpa, organizada e ambientalmente equilibrada.

Além disso, ao valorizar a jardinagem urbana e o cultivo sustentável, o projeto estimula a criação de áreas verdes e o contato da população com práticas ecológicas. Esse aspecto contribui para o embelezamento dos espaços coletivos, para a melhoria da qualidade do ar e para a redução das ilhas de calor, desafios comuns em grandes centros urbanos.

Outro ponto importante é o engajamento comunitário, que fortalece o senso de responsabilidade coletiva e a participação cidadã na construção de uma cidade mais sustentável. Ao oferecer informações e ferramentas digitais de fácil acesso, o aplicativo amplia a inclusão e democratiza o conhecimento sobre práticas ambientais, alcançando diferentes faixas etárias e grupos sociais.

---

## 1.1 Problema abordado e justificativa
Esse projeto visa resolver a problemática da gestão ineficiente de resíduos sólidos urbanos. Algumas questões que a sociedade enfrenta relacionadas ao lixo: 

**Desconhecimento sobre o descarte correto**: Muitas pessoas não sabem como ou onde descartar lixos específicos (como pilhas, eletrônicos, óleo de cozinha usado, etc.). Isso resulta no descarte inadequado, que contamina o solo, a água e o meio ambiente como um todo.

**Falta de engajamento da população**: Há uma desconexão entre a geração de lixo e a sua destinação final. A maioria das pessoas simplesmente descarta o lixo e não participa ativamente de soluções mais sustentáveis, como a compostagem ou a reciclagem.

**Problemas com a coleta e a infraestrutura local**: Embora existam pontos de coleta seletiva, a falta de informação e a distância desses locais para a casa das pessoas podem ser barreiras para a participação.

## 2. Objetivo do Sistema
Desenvolver uma plataforma multiplataforma (web e mobile) que promova:
- Adoção de práticas de compostagem doméstica;
- Orientação para o descarte correto de resíduos;
- Incentivo à participação comunitária por meio de missões coletivas.

## 3. Escopo do Projeto

O sistema **App EcoGuia Fortaleza** tem como objetivo apoiar práticas de sustentabilidade urbana, integrando jardinagem comunitária e descarte correto de resíduos.  

### 3.1 Escopo Incluído
- Cadastro de usuários e perfis.  
- Registro de plantas, hortas comunitárias e dicas de jardinagem.  
- Orientações sobre compostagem caseira e reaproveitamento de resíduos.  
- Mapeamento de pontos de descarte correto de materiais (óleo, pilhas, eletrônicos, etc.).  
- Disponibilização de acesso por aplicativo mobile e versão web.  

### 3.2 Escopo Excluído
- Pagamentos financeiros ou doações online.  
- Integração direta com serviços públicos de coleta.  
- Funcionalidades de comércio eletrônico.  
- Monitoramento em tempo real de coleta seletiva.  

---

## 4. Arquitetura do Sistema
O sistema é composto por frontend (web e mobile), backend, APIs externas e banco de dados.

- **Frontend**: Aplicativo mobile + versão web responsiva.  
- **Backend**: API central que integra dados do banco e serviços externos.  
- **APIs Externas**: Groq Cloud API (chatbot) e OpenWeatherMap API (previsão do tempo).  
- **Banco de Dados**: Armazena informações de usuários, plantas, resíduos e missões.  

<img width="773" height="336" alt="arquitetura" src="https://github.com/user-attachments/assets/22341c07-528e-4dbc-95c4-623f3e18f5b1" />

---

## 5. Tecnologias e Ferramentas
- **Frontend**: React Native (mobile), React.js (web).  
- **Backend**: Node.js + Express.  
- **Banco de Dados**: PostgreSQL.  
- **APIs**: Groq Cloud API, OpenWeatherMap API.  
- **Prototipação**: Figma.  
- **Documentação**: Markdown no GitHub.
---

### 6. Proposta de Cronograma para a Etapa 2 (N708)

Este cronograma foi planejado para a Etapa 2 do projeto, com duração total de **4 semanas**. As atividades estão otimizadas, considerando que as APIs de terceiros já estão configuradas e prontas para integração.

| **Semana** | **Atividade** | **Descrição Detalhada** |
| :--- | :--- | :--- |
| **Semana 1** | **Configuração do Backend e Modelagem do Banco de Dados** | Foco na estrutura fundamental do sistema. |
| | | - **Dia 1-3:** Configuração do ambiente de desenvolvimento (Node.js, Express.js). Instalação de dependências e ferramentas. |
| | | - **Dia 4-7:** Desenvolvimento do modelo de dados no banco de dados. Criação das tabelas de `Usuario`, `PontoColeta`, `Residuo` e `Planta`. |
| **Semana 2** | **Desenvolvimento Frontend e Backend** | Início da construção das interfaces e funcionalidades principais. |
| | | - **Dia 1-4:** Desenvolvimento das telas principais do aplicativo, como a tela de busca de ecopontos e o painel de jardinagem. |
| | | - **Dia 5-7:** Criação dos endpoints no backend para buscar dados de pontos de coleta e para o cadastro de plantas. |
| **Semana 3** | **Integração de APIs e Desenvolvimento de Funcionalidades-chave** | A etapa central de integração e implementação da lógica de negócio. |
| | | - **Dia 1-3:** **Integração com a Groq Cloud API**. Desenvolvimento da lógica do chatbot e do endpoint `/api/ask`. |
| | | - **Dia 4-5:** **Integração com a OpenWeatherMap API** para fornecer dados climáticos relevantes para a jardinagem. |
| | | - **Dia 6-7:** Desenvolvimento da funcionalidade de compartilhamento de dicas sustentáveis. |
| **Semana 4** | **Testes Finais, Refinamentos e Documentação** | Etapa de garantia de qualidade e preparação para a entrega. |
| | | - **Dia 1-3:** **Testes de Integração e Funcionalidade**. Verificação do fluxo completo da aplicação (frontend-backend-APIs). |
| | | - **Dia 4-5:** **Testes de Usabilidade e Aceitação**. Refinamento da interface e correção de bugs com base no feedback. |
| | | - **Dia 6-7:** Finalização da **Documentação** (código e API) e preparação para a apresentação do trabalho. |

---

## 7. Integrantes da Equipe e seus papeis

| Nome | Matrícula | Função |
| :--- | :--- | :--- |
| Anyele Ventura Lima | 2323813 | Desenvolvimento Backend e APIs |
| Isadora Ianne Aguiar de Castro | 2323864 | Modelagem de Dados e Arquitetura |
| Luiz Henrique | 202400004 | Desenvolvimento Frontend e UX/UI |
| Silvanir Nascimento dos Santos | 2326784 | Análise de Requisitos e Documentação |


