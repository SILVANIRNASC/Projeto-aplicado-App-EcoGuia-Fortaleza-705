# Especificação Técnica EcoGuia Fortaleza 🌱

## 1. Introdução

O App EcoGuia Fortaleza é uma **Aplicação Web Responsiva (PWA)**. Seu objetivo é auxiliar a população na gestão de resíduos, incentivar a jardinagem urbana e promover o engajamento comunitário em iniciativas sustentáveis. Este documento serve como guia para as equipes de desenvolvimento, design e testes, detalhando os requisitos e funcionalidades do sistema.

## 2. Perfis de Usuários (Personas)

Três perfis principais foram definidos para garantir que o aplicativo atenda às necessidades do público:

| Perfil | Características Chave | Necessidades |
| :--- | :--- | :--- |
| **Maria, a Engajada Ambiental** | Jovem de 25 anos, estudante, mora na área de lazer do Cocó. Usa o celular para tudo e valoriza aplicações rápidas que não ocupam espaço. | Encontrar pontos de coleta de lixo eletrônico, participar de ações de limpeza de praias e trocar dicas de sustentabilidade. |
| **Carlos, o Jardineiro Iniciante** | Homem de 45 anos, pai de família, morador de Messejana. Acessa tanto pelo computador do trabalho quanto pelo celular. | Ajuda para cuidar de plantas, fazer compostagem e identificar pragas. |
| **Ana, a Zeladora do Lar** | Mulher de 60 anos, aposentada, moradora da Parangaba. Prefere interfaces simples, com textos em letras maiores e sem instalação complexa. | Achar um jeito fácil de saber onde descartar resíduos específicos, como óleo de cozinha e pilhas. |

## 3. Requisitos Funcionais (RF)

Estes requisitos descrevem as funcionalidades que o sistema deve oferecer:

| ID | Descrição | Detalhes |
| :--- | :--- | :--- |
| **RF01** | **Gestão de Resíduos** | O sistema deve permitir que o usuário pesquise e localize pontos de coleta (ecopontos, eletrônicos, etc.) por tipo de material, bairro ou proximidade no mapa. |
| **RF02** | **Informações de Descarte** | A aplicação deve exibir uma página detalhada para cada tipo de resíduo, informando o que pode ser reciclado, o processo de descarte correto e os pontos de coleta associados. |
| **RF03** | **Cadastro e Monitoramento de Plantas** | O usuário deve poder cadastrar plantas em seu "jardim virtual", incluindo nome popular, nome científico e data de plantio. |
| **RF04** | **Calendário de Cuidados** | O sistema deve gerar um calendário personalizado de cuidados (rega, adubação e poda), com alertas visuais baseados na data de cadastro da planta. |
| **RF05** | **Conteúdo Educativo (Dicas)** | Deve disponibilizar uma área de dicas sustentáveis onde usuários podem visualizar e postar sugestões sobre compostagem, jardinagem e reciclagem. |
| **RF06** | **Eventos Comunitários** | O sistema deve possuir um calendário de eventos comunitários (mutirões de limpeza, feiras orgânicas) onde os usuários podem confirmar presença. |
| **RF07** | **Assistente Virtual (Chatbot)** | O sistema deve possuir um chat integrado com Inteligência Artificial para responder perguntas rápidas sobre sustentabilidade. |

## 4. Histórias de Usuário (HU)

Essas histórias conectam os requisitos diretamente com a motivação dos usuários:

*   **HU01 – Localizar Ecoponto:** Como a Maria, eu quero localizar o ecoponto mais próximo no mapa, para que eu possa descartar minhas garrafas plásticas corretamente.
*   **HU02 – Criar Meu Jardim:** Como o Carlos, eu quero cadastrar as plantas que tenho, para que eu possa acompanhar o desenvolvimento delas e saber quando regar.
*   **HU03 – Compartilhar Dica:** Como a Maria, eu quero publicar uma dica sobre reaproveitamento de água, para ajudar a comunidade.
*   **HU04 – Saber o que Reciclar:** Como a Ana, eu quero perguntar ao assistente virtual o que fazer com óleo de cozinha usado, para obter uma resposta rápida sem ler textos longos.

## 5. Regras de Negócio (RN)

Estas regras definem as políticas e processos que governam as funcionalidades do aplicativo:

*   **RN01 (Cadastro):** Todo novo usuário deve se cadastrar com e-mail válido e senha para salvar seu progresso (jardim e conquistas).
*   **RN02 (Gamificação):** O sistema de gamificação deve atribuir conquistas automaticamente quando o usuário atingir marcos (ex: "Primeira Planta Cadastrada").
*   **RN03 (Localização):** A localização dos pontos de coleta de resíduos deve possuir, obrigatoriamente, **latitude e longitude** para renderização no mapa.
*   **RN04 (Cuidados):** As sugestões de rega devem considerar dados climáticos (se estiver chovendo muito, a rega deve ser adiada).

## 6. Requisitos Não-Funcionais (RNF)

Estes requisitos especificam como o sistema deve funcionar, focando em suas qualidades técnicas:

| ID | Qualidade | Requisito |
| :--- | :--- | :--- |
| **RNF01** | **Usabilidade** | A interface deve ser **responsiva**, adaptando-se perfeitamente a telas de smartphones, tablets e desktops. |
| **RNF02** | **Desempenho** | A aplicação web deve carregar em **no máximo 3 segundos** em uma conexão 4G estável. |
| **RNF03** | **Segurança** | O sistema deve proteger os dados pessoais e utilizar **tokens (JWT)** para autenticação de sessões. |
| **RNF04** | **Portabilidade (Web)** | A aplicação deve ser compatível com os principais navegadores modernos (Google Chrome, Safari, Firefox e Edge), tanto em versões móveis quanto desktop. |
| **RNF05** | **Manutenibilidade** | O código-fonte (**React.js e Node.js**) deve ser modular e seguir boas práticas de componentização. |

## 7. Restrições e Critérios de Aceitação

| Tipo | Descrição | Fonte |
| :--- | :--- | :--- |
| **Restrição** | O projeto inicial será focado exclusivamente em dados da cidade de **Fortaleza**. | |
| **Critério de Aceitação 1** | O usuário deve conseguir acessar o sistema via navegador do celular, cadastrar uma planta e receber a indicação de próxima rega. | |
| **Critério de Aceitação 2** | A interface deve ser testada em resoluções móveis (360x640) e desktop (1366x768) para garantir que não haja quebra de *layout*. | |

## 8. Glossário e Definições

*   **SPA (Single Page Application):** Aplicação web que carrega uma única página HTML e atualiza dinamicamente o conteúdo à medida que o usuário interage com o app.
*   **Compostagem:** Processo biológico de decomposição da matéria orgânica.
*   **LGPD:** Lei Geral de Proteção de Dados.
*   **Responsividade:** Capacidade do *site* de se ajustar automaticamente ao tamanho da tela do dispositivo do usuário.
