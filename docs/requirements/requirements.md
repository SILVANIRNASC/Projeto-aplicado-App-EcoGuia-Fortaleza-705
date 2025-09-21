# Requirements – App Sustentável Fortaleza 🌱

## 1. Introdução  
O **App Sustentável Fortaleza** tem como objetivo auxiliar a população na gestão sustentável de resíduos e no incentivo à jardinagem urbana, por meio de ferramentas de educação ambiental, descarte correto de materiais e engajamento comunitário.  

Este documento especifica os requisitos funcionais e não-funcionais do sistema, servindo como base para seu desenvolvimento e manutenção.  

---

## 2. Escopo do Sistema  
O aplicativo permitirá que usuários:  
- Cadastrem e consultem pontos de coleta de resíduos.  
- Acessem informações sobre descarte correto de materiais.  
- Participem de ações comunitárias ligadas à sustentabilidade.  
- Registrem suas plantas e recebam orientações de jardinagem urbana.  
- Interajam com a comunidade através de dicas, eventos e iniciativas sustentáveis.  

---

## 3. Requisitos Funcionais  

### 3.1 Gestão de Resíduos  
- **RF01** – O sistema deve permitir que o usuário localize pontos de coleta de resíduos em Fortaleza.  
- **RF02** – O sistema deve exibir informações detalhadas sobre o tipo de resíduo aceito em cada ponto de coleta.  
- **RF03** – O sistema deve oferecer um mecanismo de busca por tipo de resíduo (ex.: óleo, pilhas, eletrônicos).  

### 3.2 Jardinagem Urbana  
- **RF04** – O sistema deve permitir o cadastro de plantas pelo usuário, com informações básicas (nome popular, nome científico, data de plantio).  
- **RF05** – O sistema deve enviar notificações com dicas de cultivo sustentável e compostagem caseira.  

### 3.3 Educação Ambiental  
- **RF06** – O sistema deve disponibilizar conteúdos educativos sobre reciclagem, compostagem e jardinagem urbana.  
- **RF07** – O sistema deve permitir a atualização periódica desses conteúdos por administradores.  

### 3.4 Engajamento Comunitário  
- **RF08** – O sistema deve permitir que usuários publiquem e compartilhem dicas sustentáveis.  
- **RF09** – O sistema deve disponibilizar um calendário de eventos comunitários relacionados à sustentabilidade.  
- **RF10** – O sistema deve permitir que usuários confirmem presença em eventos.  

### 3.5 Acessibilidade e Inclusão  
- **RF11** – O sistema deve oferecer interface intuitiva e acessível, com suporte a alto contraste e leitura por leitores de tela.  
- **RF12** – O sistema deve permitir personalização do idioma (Português como padrão, com possibilidade de expansão futura).  

---

## 4. Requisitos Não-Funcionais  

### 4.1 Usabilidade  
- **RNF01** – A interface deve ser simples, clara e adaptada para diferentes faixas etárias.  
- **RNF02** – O sistema deve seguir boas práticas de acessibilidade digital (WCAG 2.1).  

### 4.2 Desempenho  
- **RNF03** – O sistema deve carregar as páginas principais em até 3 segundos em conexões padrão de internet móvel.  
- **RNF04** – O aplicativo deve suportar até 10.000 acessos simultâneos sem perda significativa de desempenho.  

### 4.3 Segurança  
- **RNF05** – O sistema deve proteger os dados pessoais dos usuários em conformidade com a LGPD (Lei Geral de Proteção de Dados).  
- **RNF06** – O sistema deve usar autenticação segura para cadastros e logins.  

### 4.4 Portabilidade  
- **RNF07** – O aplicativo deve ser compatível com dispositivos Android (versão 8.0 ou superior) e iOS (versão 13 ou superior).  
- **RNF08** – O sistema deve possuir versão web responsiva acessível em navegadores modernos.  

### 4.5 Manutenibilidade  
- **RNF09** – O código deve ser documentado e modular, permitindo fácil manutenção e expansão de funcionalidades.  
- **RNF10** – O sistema deve permitir integração futura com APIs externas de serviços públicos (ex.: coleta seletiva municipal).  

---

## 5. Restrições  
- O projeto deve priorizar tecnologias de código aberto quando possível.  
- O desenvolvimento inicial será focado na cidade de Fortaleza, com possibilidade de expansão para outras localidades.  

---

## 6. Critérios de Aceitação  
- O usuário deve conseguir localizar pontos de coleta de resíduos em até 3 interações.  
- O sistema deve enviar pelo menos uma notificação semanal com dicas de sustentabilidade.  
- O aplicativo deve ser testado em dispositivos com diferentes resoluções de tela para garantir responsividade.  

---
