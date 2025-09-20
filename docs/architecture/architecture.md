**Descrição da Arquitetura**

A arquitetura do sistema é projetada para ser multiplataforma, usando um modelo de comunicação cliente-servidor para garantir flexibilidade e escalabilidade. O sistema é dividido em componentes distintos para facilitar o desenvolvimento e a manutenção.

**Componentes do Sistema**

*Frontend*: Aplicativo mobile + versão web responsiva.

*Backend*: API central que integra dados do banco e serviços externos.

*APIs Externas*: Groq Cloud API (chatbot) e OpenWeatherMap API (previsão do tempo).

*Banco de Dados*: Armazena informações de usuários, plantas, resíduos e missões.

**Padrões Arquiteturais Utilizados**
*Cliente-Servidor* Neste padrão, o aplicativo mobile e a versão web (os clientes) solicitam informações e serviços para a API central (o servidor), que processa a requisição e interage com o banco de dados e APIs externas.

**Diagrama de Arquitetura**

![Diagrama de Arquitetura](arquitetura.png)

**Decisões Técnicas e Justificativas**

*Groq Cloud API*: Esta tecnologia foi escolhida por ser uma API gratuita, muito rápida e com tempo de resposta baixo. A documentação é completa e oferece exemplos em várias linguagens, o que facilita a programação futura.

*OpenWeatherMap API*: É uma das APIs de previsão do tempo mais populares e fáceis de usar. Ela se baseia em protocolos HTTP, usa o formato JSON e sua documentação abrangente facilita a integração com diversas linguagens de programação.
