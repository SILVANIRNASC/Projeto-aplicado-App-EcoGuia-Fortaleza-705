# Requirements – App EcoGuia Fortaleza 🌱

## 1. Introdução

O **App EcoGuia Fortaleza** é uma plataforma com o objetivo de auxiliar a população na gestão de resíduos, incentivar a jardinagem urbana e promover o engajamento comunitário em iniciativas sustentáveis. Este documento detalha os requisitos e as funcionalidades do sistema, servindo como guia para as equipes de desenvolvimento, design e testes.

---

## 2. Perfis de Usuários (Personas)

Para garantir que o aplicativo atenda às necessidades de seu público, definimos os seguintes perfis de usuário:

* **Maria, a Engajada Ambiental:** Jovem de 25 anos, estudante, moradora da área de lazer do Cocó. Quer encontrar pontos de coleta de lixo eletrônico, participar de ações de limpeza de praias e trocar dicas de sustentabilidade. Usa o celular para tudo e valoriza aplicativos com design intuitivo e comunidades ativas.
* **Carlos, o Jardineiro Iniciante:** Homem de 45 anos, pai de família, morador do Messejana. Começou a cultivar uma horta em casa e precisa de ajuda para saber como cuidar das plantas, fazer compostagem e identificar pragas. Não tem muito tempo, então precisa de informações rápidas e diretas.
* **Ana, a Zeladora do Lar:** Mulher de 60 anos, aposentada, moradora do bairro Parangaba. Sempre reciclou e quer achar um jeito fácil de saber onde descartar resíduos específicos, como óleo de cozinha e pilhas, sem ter que ir longe de casa. Prefere interfaces simples e com textos em letras maiores.

---

## 3. Requisitos Funcionais (RF)

Os requisitos a seguir descrevem as funcionalidades que o aplicativo deve oferecer:

* **RF01 – Gestão de Resíduos:** O sistema deve permitir que o usuário pesquise e localize pontos de coleta de resíduos (ecopontos, pontos de recebimento de eletrônicos, etc.) por tipo de material, bairro ou proximidade.
* **RF02 – Informações de Descarte:** O aplicativo deve exibir uma página detalhada para cada tipo de resíduo, informando o que pode ser reciclado, o processo de descarte correto e os pontos de coleta associados.
* **RF03 – Cadastro e Monitoramento de Plantas:** O usuário deve poder cadastrar plantas em seu "jardim virtual", com informações como nome popular, nome científico e data de plantio.
* **RF04 – Calendário de Cuidados:** O sistema deve gerar um calendário personalizado de cuidados para cada planta cadastrada, incluindo alertas para rega, adubação e poda.
* **RF05 – Conteúdo Educativo:** O aplicativo deve disponibilizar uma biblioteca de conteúdos educativos sobre sustentabilidade, como artigos, vídeos e infográficos sobre compostagem, jardinagem e reciclagem.
* **RF06 – Eventos Comunitários:** O aplicativo deve ter um calendário de eventos comunitários (mutirões de limpeza, feiras orgânicas, oficinas) onde os usuários podem confirmar presença e obter informações de localização.

---

## 4. Histórias de Usuário

Essas histórias descrevem a motivação por trás de cada funcionalidade, conectando os requisitos diretamente com as necessidades dos usuários:

* **HU01 – Localizar Ecoponto:** Como a **Maria**, eu quero localizar o ecoponto mais próximo, para que eu possa descartar minhas garrafas plásticas corretamente.
* **HU02 – Criar Meu Jardim:** Como o **Carlos**, eu quero cadastrar as plantas que tenho, para que eu possa acompanhar o desenvolvimento delas e saber como cuidar.
* **HU03 – Compartilhar Dica:** Como a **Maria**, eu quero publicar fotos da minha horta, para que eu possa compartilhar dicas de cultivo com a comunidade.
* **HU04 – Saber o que Reciclar:** Como a **Ana**, eu quero saber o que fazer com óleo de cozinha usado, para que eu não descarte de forma incorreta.

---

## 5. Regras de Negócio

Estas regras definem as políticas e os processos que governam as funcionalidades do aplicativo:

* **RN01:** Todo novo usuário deve se cadastrar com e-mail válido e senha, aceitando os termos de uso.
* **RN02:** Posts com linguagem ofensiva ou que infrinjam os termos de uso serão moderados e removidos pelos administradores.
* **RN03:** A localização dos pontos de coleta de resíduos deve ser verificada e atualizada mensalmente por um administrador para garantir a precisão das informações.
* **RN04:** As notificações sobre cuidados com as plantas devem ser enviadas apenas para os usuários que optarem por essa funcionalidade.

---

## 6. Requisitos Não-Funcionais (RNF)

Estes requisitos especificam como o sistema deve funcionar, focando em suas qualidades:

* **RNF01 – Usabilidade:** A interface deve ser simples, intuitiva e acessível para usuários de todas as faixas etárias, seguindo as diretrizes de acessibilidade (WCAG 2.1).
* **RNF02 – Desempenho:** O aplicativo deve carregar em no máximo 5 segundos em uma conexão 4G e responder às ações do usuário em menos de 1 segundo.
* **RNF03 – Segurança:** O sistema deve proteger os dados pessoais dos usuários em conformidade com a LGPD e criptografar as senhas armazenadas no banco de dados.
* **RNF04 – Portabilidade:** O aplicativo deve funcionar em dispositivos Android (versão 9 ou superior) e iOS (versão 14 ou superior).
* **RNF05 – Manutenibilidade:** O código-fonte deve ser modular e bem documentado, permitindo que a equipe de desenvolvimento adicione novas funcionalidades e corrija bugs com facilidade.

---

## 7. Restrições e Critérios de Aceitação

* **Restrição:** O projeto inicial será focado exclusivamente em dados da cidade de Fortaleza, com a arquitetura preparada para uma futura expansão para outras cidades.
* **Critério de Aceitação:** Para que o projeto seja considerado concluído, o usuário deve conseguir cadastrar uma planta e receber uma notificação de cuidado em até 24 horas.
* **Critério de Aceitação:** O aplicativo deve ser testado em um mínimo de três modelos de smartphones diferentes (Android e iOS) para garantir a compatibilidade e a qualidade da experiência do usuário.

---

## 8. Glossário e Definições

Esta seção lista os termos técnicos e específicos utilizados neste documento, visando garantir a clareza e o alinhamento de toda a equipe do projeto.

* **Compostagem:** Processo biológico de decomposição da matéria orgânica, como restos de alimentos e folhas, transformando-a em adubo natural.

* **LGPD (Lei Geral de Proteção de Dados):** Legislação brasileira que regula a coleta, o armazenamento e o tratamento de dados pessoais.

* **WCAG 2.1 (Web Content Accessibility Guidelines 2.1):** Conjunto de diretrizes internacionais para tornar conteúdos da internet acessíveis a pessoas com deficiência.

* **UX (User Experience - Experiência do Usuário):** Foco na forma como o usuário interage com um produto, abrangendo sentimentos, atitudes e percepções.

* **UI (User Interface - Interface do Usuário):** Foco nos elementos visuais do produto, como cores, botões e tipografia, que permitem a interação do usuário.





