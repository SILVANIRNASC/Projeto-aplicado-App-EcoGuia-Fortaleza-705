# Projeto-aplicado-App-Sustentavel-Fortaleza-705
Repositório do Projeto Aplicado N705 - Documentação técnica em Markdown e protótipos.

**Tema:** App Sustentável Fortaleza 🌱

---

## 1. Introdução
O projeto **App Sustentável Fortaleza** tem como foco auxiliar a população na gestão sustentável de resíduos e no incentivo à jardinagem urbana. O sistema integra educação ambiental, descarte correto de resíduos e engajamento comunitário.

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

O sistema **App Sustentável Fortaleza** tem como objetivo apoiar práticas de sustentabilidade urbana, integrando jardinagem comunitária e descarte correto de resíduos.  

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

## 4. Requisitos

### 4.1 Requisitos Funcionais
- RF01 – Cadastrar plantas do usuário.  
- RF02 – Orientar compostagem com base nos resíduos cadastrados.  
- RF03 – Identificar pontos de coleta próximos para descarte.  
- RF04 – Chatbot para perguntas sobre descarte e jardinagem.  
- RF05 – Sistema de missões coletivas e recompensas.  

### 4.2 Requisitos Não Funcionais
- RNF01 – O sistema deve ser responsivo (web e mobile).  
- RNF02 – O chatbot deve responder em menos de 2 segundos.  
- RNF03 – O mapa de pontos de coleta deve atualizar em tempo real.  

### 4.3 Regras de Negócio
- O usuário só acumula pontos nas missões ao registrar ações sustentáveis.  
- O descarte só será considerado válido quando feito em ponto cadastrado.  

### 4.4 Perfis de Usuário e Casos de Uso
- **Usuário Comum**: Cadastra plantas, consulta chatbot, participa de missões.  
- **Administrador**: Gerencia pontos de coleta e monitora relatórios.  

---

## 5. Arquitetura do Sistema
O sistema é composto por frontend (web e mobile), backend, APIs externas e banco de dados.

- **Frontend**: Aplicativo mobile + versão web responsiva.  
- **Backend**: API central que integra dados do banco e serviços externos.  
- **APIs Externas**: Groq Cloud API (chatbot) e OpenWeatherMap API (previsão do tempo).  
- **Banco de Dados**: Armazena informações de usuários, plantas, resíduos e missões.  

---

## 6. Modelagem de Dados
O modelo de dados envolve as entidades: Usuário, Planta, Resíduo, Ponto de Coleta, Missão e Recompensa.  

- Relacionamentos:  
  - Usuário → Planta (1:N)  
  - Usuário → Missão (N:N)  

*(Inserir diagrama ER e dicionário de dados)*

---

## 7. Protótipos de Interface
Inserir prints ou links para os protótipos de interface desenvolvidos no Figma (web e mobile).

---

## 8. Tecnologias e Ferramentas
- **Frontend**: React Native (mobile), React.js (web).  
- **Backend**: Node.js + Express.  
- **Banco de Dados**: PostgreSQL.  
- **APIs**: Groq Cloud API, OpenWeatherMap API.  
- **Prototipação**: Figma.  
- **Documentação**: Markdown no GitHub.  

---

## 9. Cronograma da Etapa 2 (N708)

| Semana | Atividade |
|--------|------------|
| 1 | Configuração do backend e banco de dados |
| 2 | Desenvolvimento do frontend inicial |
| 3 | Integração das APIs externas |
| 4 | Testes e ajustes finais |

---

## 10. Conclusão e Impacto Social
O **App Sustentável Fortaleza** contribui para o **ODS 11 (Cidades Sustentáveis)**, especialmente na meta **11.6 (reduzir o impacto ambiental das cidades)**.  
Ele transforma cidadãos em protagonistas da sustentabilidade, reduzindo lixo, promovendo a economia circular e engajando a comunidade em ações coletivas.

