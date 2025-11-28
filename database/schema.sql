-- Tabela de Usuários
CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Pontos de Coleta
CREATE TABLE pontos_coleta (
    id_ponto SERIAL PRIMARY KEY,
    nome_local VARCHAR(100) NOT NULL,
    endereco VARCHAR(255),
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    horario_funcionamento VARCHAR(255)
);

-- Tabela de Resíduos
CREATE TABLE residuos (
    id_residuo SERIAL PRIMARY KEY,
    nome_tipo VARCHAR(50) NOT NULL,
    descricao TEXT
);

-- Tabela de Plantas (1 Usuário : N Plantas)
CREATE TABLE plantas (
    id_planta SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL REFERENCES usuarios(id_usuario),
    nome_popular VARCHAR(100) NOT NULL,
    nome_cientifico VARCHAR(100),
    data_plantio DATE
);

-- Tabela de Dicas Sustentáveis (1 Usuário : N Dicas)
CREATE TABLE dicas_sustentaveis (
    id_dica SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL REFERENCES usuarios(id_usuario),
    descricao TEXT NOT NULL,
    data_publicacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Eventos
CREATE TABLE eventos (
    id_evento SERIAL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    descricao TEXT NOT NULL,
    data_evento TIMESTAMP NOT NULL,
    local VARCHAR(255) NOT NULL
);

-- Conteúdo Educativo
CREATE TABLE conteudos_educativos (
    id_conteudo SERIAL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    descricao TEXT,
    url_conteudo VARCHAR(255),
    categoria VARCHAR(50)
);

-- Tabela Pivô: Pontos de Coleta <-> Resíduos (N:N)
CREATE TABLE ponto_residuo (
    id_ponto INT NOT NULL REFERENCES pontos_coleta(id_ponto),
    id_residuo INT NOT NULL REFERENCES residuos(id_residuo),
    PRIMARY KEY (id_ponto, id_residuo)
);

-- Tabela Pivô: Participação em Eventos (N:N)
CREATE TABLE participacao_evento (
    id_usuario INT NOT NULL REFERENCES usuarios(id_usuario),
    id_evento INT NOT NULL REFERENCES eventos(id_evento),
    data_confirmacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_usuario, id_evento)
);

ALTER TABLE usuarios
ADD COLUMN bairro VARCHAR(100),
ADD COLUMN cidade VARCHAR(100),
ADD COLUMN estado CHAR(2);

ALTER TABLE usuarios
ADD COLUMN telefone VARCHAR(20);

ALTER TABLE usuarios ADD COLUMN pontos_total INT DEFAULT 0;

CREATE TABLE conquistas (
    id_conquista SERIAL PRIMARY KEY,
    slug VARCHAR(50) UNIQUE NOT NULL,
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT,
    pontos INT NOT NULL,
    icone VARCHAR(50)
);

CREATE TABLE conquistas_usuario (
    id SERIAL PRIMARY KEY,
    id_usuario INT REFERENCES usuarios(id_usuario),
    id_conquista INT REFERENCES conquistas(id_conquista),
    data_conquista TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(id_usuario, id_conquista) -- Evita ganhar a mesma conquista 2x
);

INSERT INTO conquistas (slug, titulo, descricao, pontos, icone) VALUES
('BEM_VINDO', 'Semente Plantada', 'Criou sua conta no EcoGuia.', 10, 'seed'),
('PRIMEIRA_PLANTA', 'Jardineiro Iniciante', 'Cadastrou sua primeira planta.', 20, 'leaf'),
('JARDINEIRO_TOP', 'Dedo Verde', 'Cadastrou 10 plantas.', 50, 'tree'),
('ECO_MENTOR', 'Influenciador Verde', 'Compartilhou 5 dicas.', 30, 'star'),
('EVENTO_PRESENCA', 'Ativista Local', 'Participou de um evento.', 50, 'calendar');

-- Adicionando colunas para controle de frequência (em dias) e última ação
ALTER TABLE plantas
ADD COLUMN frequencia_rega INT DEFAULT 3,
ADD COLUMN ultima_rega TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN frequencia_adubacao INT DEFAULT 30,
ADD COLUMN ultima_adubacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN frequencia_poda INT DEFAULT 90,
ADD COLUMN ultima_poda TIMESTAMP DEFAULT CURRENT_TIMESTAMP;




TRUNCATE TABLE ponto_residuo, pontos_coleta, residuos RESTART IDENTITY CASCADE;

ALTER TABLE residuos
ADD COLUMN cor_hex VARCHAR(7) DEFAULT '#E5E7EB';

-- Inserir Resíduos
INSERT INTO residuos (id_residuo, nome_tipo, cor_hex, descricao) VALUES
(1, 'Resíduos Recicláveis', '#BFDBFE', 'Entulho, restos de poda, móveis, estofados velhos, óleo de cozinha, papelão, plásticos, vidros e metais.')
ON CONFLICT (id_residuo) DO NOTHING;

-- Inserir Pontos de Coleta
INSERT INTO pontos_coleta (id_ponto, nome_local, endereco, latitude, longitude, horario_funcionamento) VALUES
(1, 'Ecoponto Sitio São João', 'Rua Vede 42, em frente ao numero 287 - Jangurussu', -3.85063825, -38.51433331, 'Seg-Sáb: 08h00 as 17h00'),
(2, 'Ecoponto Luciano Cavalcante', 'Rua Jaime Leonel, esquina com R. Monsenhor Carneiro da Cunha - Engenheiro Luciano Cavalcante', -3.77375302, -38.49691502, 'Seg-Sáb: 08h00 as 17h00'),
(3, 'Ecoponto Conjunto Ceará', 'Rua 442, 159 - Esquina com Rua 432 - Conjunto Ceará I', -3.76159918, -38.60486562, 'Seg-Sáb: 08h00 as 17h00'),
(4, 'Ecoponto Centro II', 'Guilherme Rocha 1427 - Centro', -3.72363597, -38.53856177, 'Seg-Sáb: 08h00 as 17h00'),
(5, 'Ecoponto João XXIII', 'Travessa Rio de Janeiro, 456 - João XXIII', -3.76967969, -38.59166582, 'Seg-Sáb: 08h00 as 17h00'),
(6, 'Ecoponto Cajazeiras', 'Rua Francisco José de Albuquerque Pereira (vizinho n. 414) - Cajazeiras', -3.81177931, -38.50494774, 'Seg-Sáb: 08h00 as 17h00'),
(7, 'Ecoponto Vila Velha II', 'Avenida Major Assis, esquina com rua Cecília - Vila Velha', -3.71916207, -38.60576462, 'Seg-Sáb: 08h00 as 17h00'),
(8, 'Ecoponto São Bento II', 'Rua Oliveira Lemos, esqina com rua Manoel Freitas - São Bento', -3.85304288, -38.48118294, 'Seg-Sáb: 08h00 as 17h00'),
(9, 'Ecoponto Messejana II', 'Rua José Hipólito, em frente ao n° 819 - Messejana', -3.83469268, -38.48840721, 'Seg-Sáb: 08h00 as 17h00'),
(10, 'Ecoponto Varjota', 'Avenida Antônio Justa, 4188 - cruzamento com a Rua Meruoca - Varjota', -3.73167914, -38.48310638, 'Seg-Sáb: 08h00 as 17h00'),
(11, 'Ecoponto Cidade 2000', 'Rua Giselda Cysne, 92 - Cruzamento com a Rua Sólon Carvalho - Cidade 2000', -3.75250653, -38.47275148, 'Seg-Sáb: 08h00 as 17h00'),
(12, 'Ecoponto Vila Peri', 'Rua Antônio Costa Mendes, 468 - Esquina com a Travessa Augusto Ribeiro - Vila Peri', -3.79019722, -38.58417110, 'Seg-Sáb: 08h00 as 17h00'),
(13, 'Ecoponto Fátima', 'Avenida Eduardo Girão, 989 - Esquina com a Avenida Luciano Carneiro - Fátima', -3.75263201, -38.53268936, 'Seg-Sáb: 08h00 as 17h00'),
(14, 'Ecoponto Serrinha', 'Rua Inácio Parente, 70 - Esquina com a Rua Freire Alemão - Serrinha', -3.78233936, -38.54260589, 'Seg-Sáb: 08h00 as 17h00'),
(15, 'Ecoponto Conjunto Esperança', 'Avenida Penetração Norte-Sul , 472 - Esquina com a Rua do Canal - Conjunto Esperança', -3.81392076, -38.59281572, 'Seg-Sáb: 08h00 as 17h00'),
(16, 'Ecoponto Edson Queiroz', 'Rua Hill de Moraes, 397 - Esquina com a Rua Vereador José Batista Barbosa - Edson Queiróz', -3.77387886, -38.47553528, 'Seg-Sáb: 08h00 as 17h00'),
(17, 'Ecoponto Cidade dos Funcionários', 'Rua Dr. José Plutarco, 24 - Esquina com a Rua Professor Aluísio Barros Leal - Cidade dos Funcionários', -3.78954444, -38.49209644, 'Seg-Sáb: 08h00 as 17h00'),
(18, 'Ecoponto Jangurussu', 'Avenida Castelo de Castro, 1207 - Esquina com a Rua Gergelim - Jangurussu', -3.84078328, -38.52154573, 'Seg-Sáb: 08h00 as 17h00'),
(19, 'Ecoponto Praia do Futuro I', 'Rua José Aurélio Câmara, 83 - Esquina com a Avenida Dioguinho - Vicente Pinzon', -3.73077617, -38.45949991, 'Seg-Sáb: 08h00 as 17h00'),
(20, 'Ecoponto Vicente Pinzon', 'Rua Veneza, 131 - Esquina com a Rua Josias Paula de Souza - Vicente Pinzon', -3.72862025, -38.47205721, 'Seg-Sáb: 08h00 as 17h00'),
(21, 'Ecoponto Jóquei Clube', 'Rua Perdigão de Oliveira, 971 - Esquina com a Rua Silveira Filho - Joquei Clube', -3.77455989, -38.57806732, 'Seg-Sáb: 08h00 as 17h00'),
(22, 'Ecoponto Pici', 'Rua Pernambuco, 600 - Anexo à UFC (ao lado do número 600) - Pici', -3.75739863, -38.57216810, 'Seg-Sáb: 08h00 as 17h00'),
(23, 'Ecoponto Granja Portugal', 'Rua Duas Nações, 1029 - Granja Portugal', -3.78103013, -38.60303574, 'Seg-Sáb: 08h00 as 17h00'),
(24, 'Ecoponto Parque Dois Irmãos', 'Rua H, S/N - Esquina com a Rua K - Parque Dois Irmãos', -3.80526847, -38.54700083, 'Seg-Sáb: 08h00 as 17h00'),
(25, 'Ecoponto Jardim Cearense', 'Rua Holanda, 1538 - Esquina com a Rua Cel. Jaime Rolemberg - Jardim Cearense', -3.80133974, -38.56085841, 'Seg-Sáb: 08h00 as 17h00'),
(26, 'Ecoponto José Walter', 'Avenida B, S/N - Esquina com Rua 33 - Prefeito José Walter', -3.82592907, -38.55841537, 'Seg-Sáb: 08h00 as 17h00'),
(27, 'Ecoponto Messejana', 'Rua Nicolau Coelho, S/N - Esquina com Av. 24 de Novembro - Messejana', -3.82138488, -38.49208454, 'Seg-Sáb: 08h00 as 17h00'),
(28, 'Ecoponto Dias Macêdo', 'Rua Marechal Bittencourt, 199 - Esquina com Rua Capitão João Ferreira Lima - Dias Macedo', -3.78548745, -38.52803826, 'Seg-Sáb: 08h00 as 17h00'),
(29, 'Ecoponto Sapiranga', 'Avenida Edilson Brasil Soares, 1220 - Esquina com Rua Bill Cartaxo - Sapiranga/Coité', -3.78915334, -38.47424473, 'Seg-Sáb: 08h00 as 17h00'),
(30, 'Ecoponto São Bento', 'Travessa José Teixeira Costa, S/N - Esquina com Rua São Benedito - São Bento', -3.84741570, -38.48098923, 'Seg-Sáb: 08h00 as 17h00'),
(31, 'Ecoponto Conjunto Ceará II', 'Avenida C, 1890 - Esquina com Rua 1001 - Conjunto Ceará II', -3.77339175, -38.61593273, 'Seg-Sáb: 08h00 as 17h00'),
(32, 'Ecoponto Centro', 'Avenida Alberto Nepomuceno, 144 - Esquina com Travessa Icó - Centro', -3.72222426, -38.52400731, 'Seg-Sáb: 08h00 as 17h00'),
(33, 'Ecoponto Mondubim', 'Rua Carlos Pimenta, 507 - Esquina com a Rua Coronel Tibúrcio - Mondubim', -3.81525657, -38.57450512, 'Seg-Sáb: 08h00 as 17h00'),
(34, 'Ecoponto Mondubim II', 'Rua Mangaba, 170 - Esquina com a Rua B - Mondubim', -3.82254805, -38.56348904, 'Seg-Sáb: 08h00 as 17h00'),
(35, 'Ecoponto Damas', 'Rua Júlio César, 1532 - Entre a Rua Macedo e a Rua Afrodísio Godim - Damas', -3.75540369, -38.54770664, 'Seg-Sáb: 08h00 as 17h00'),
(36, 'Ecoponto Guararapes', 'Rua Paulo Roberto Pinheiro, 01 - Esquina com a Avenida Washington Soares - Guararapes', -3.75783275, -38.48893839, 'Seg-Sáb: 08h00 as 17h00'),
(37, 'Ecoponto Parangaba', 'Alameda Oxóssi, 80 - Esquina com a Rua Topógrafo Sales - Parangaba', -3.77839466, -38.55825781, 'Seg-Sáb: 08h00 as 17h00'),
(38, 'Ecoponto Jacarecanga', 'Av. José Jatahy, 415 - Esquina com a Av. Sargento Hermínio - Jacarecanga', -3.72440705, -38.54608659, 'Seg-Sáb: 08h00 as 17h00'),
(39, 'Ecoponto Autran Nunes', 'Avenida Senador Fernandes Távora, 2938 - Esquina com a Rua Desembargador Felismino - Autran Nunes', -3.75523838, -38.59842605, 'Seg-Sáb: 08h00 as 17h00'),
(40, 'Ecoponto Álvaro Weyne', 'Rua José Acioli, esquina com Avenida Tenente Lisboa - Álvaro Weyne', -3.72082253, -38.56877146, 'Seg-Sáb: 08h00 as 17h00'),
(41, 'Ecoponto Jovita feitosa', 'Rua General Bernardo figueiredo, Esquina com Rua Crz Saldanha - Amadeu Furtado', -3.73970431, -38.55290125, 'Seg-Sáb: 08h00 as 17h00'),
(42, 'Ecoponto Bonsucesso', 'Rua Emílio de Menezes, esquina com rua Luiza Moreira - Bonsucessso', -3.78024536, -38.59341188, 'Seg-Sáb: 08h00 as 17h00'),
(43, 'Ecoponto Antônio Bezerra', 'Rua Doutor João Guilherme, Em frente ao nº 373 - Antônio Bezerra', -3.73716956, -38.58869020, 'Seg-Sáb: 08h00 as 17h00'),
(44, 'Ecoponto Parreão', 'Rua André Chaves, esquina com Av. Luciano Carneiro - Parreão', -3.75841156, -38.53511371, 'Seg-Sáb: 08h00 as 17h00'),
(45, 'Ecoponto Cartier', 'Rua Quartzo, esquina com rua Ônix - Mondubim', -3.81212256, -38.55809663, 'Seg-Sáb: 08h00 as 17h00'),
(46, 'Ecoponto Sapiranga II', 'Rua Dr. Correia Lima, esquina com rua Dr. Itamar Espíndola - Sapiranga/Coité', -3.79474688, -38.45855669, 'Seg-Sáb: 08h00 as 17h00'),
(47, 'Ecoponto AEROLÂNDIA', 'Rua Tenente Roma, esquina com BR 116 - Alto da Balança', -3.76819858, -38.51722307, 'Seg-Sáb: 08h00 as 17h00'),
(48, 'Ecoponto Tancredo Neves', 'Rua da Cachoeira, esquina com Av. José Leon - Jardim das Oliveiras', -3.78672624, -38.50898494, 'Seg-Sáb: 08h00 as 17h00'),
(49, 'Ecoponto Vila Ellery', 'Rua Gonçalo de Lagos, esquina com rua Valdir Leopércio - Monte Castelo', -3.72293969, -38.55768324, 'Seg-Sáb: 08h00 as 17h00'),
(50, 'Ecoponto Cidade Jardim II', 'Rua 16, Quadra 8 - Prefeito José Walter', -3.84259608, -38.55137438, 'Seg-Sáb: 08h00 as 17h00'),
(51, 'Ecoponto Siqueira', 'Av. Luis Montenegro, esquina com rua C - Siqueira', -3.81532125, -38.61635810, 'Seg-Sáb: 08h00 as 17h00'),
(52, 'Ecoponto Jardim União', 'Rua Menor Jerônimo, em frente ao nº 2930 - Passaré', -3.81419115, -38.53507565, 'Seg-Sáb: 08h00 as 17h00'),
(53, 'Ecoponto Parque Rio Branco', 'Avenida Visconde do Rio Branco, 3485 - Anexo ao Parque Rio Branco - Joaquim Távora', -3.75158009, -38.52072588, 'Seg-Sáb: 08h00 as 17h00'),
(54, 'Ecoponto Conjunto Ceará II', 'Avenida Ministro Albuquerque Lima, 1150 - Esquina com a Rua 721 - Conjunto Ceará II', -3.77126099, -38.60251891, 'Seg-Sáb: 08h00 as 17h00'),
(55, 'Ecoponto Aracapé', 'Rua Miguel de Aragão, 754 - Esquina com a Rua Nossa Senhora Aparecida - Aracapé', -3.83358613, -38.58635920, 'Seg-Sáb: 08h00 as 17h00'),
(56, 'Ecoponto Jardim Glória', 'Rua Beatriz, em frente ao número 385 - Barroso', -3.81769212, -38.50572500, 'Seg-Sáb: 08h00 as 17h00'),
(57, 'Ecoponto São Sebastião', 'Rua Clarindo de Queiroz, em frente ao número 1596 - Centro', -3.73028224, -38.53824842, 'Seg-Sáb: 08h00 as 17h00'),
(58, 'Ecoponto Conjunto João Paulo II', 'rua 23, esquina com a rua K - Barroso', -3.82698120, -38.51563804, 'Seg-Sáb: 08h00 as 17h00'),
(59, 'Ecoponto Lagoa Redonda', 'RUA PAULO COELHO, esquina com PAULO FREIRE - Lagoa Redonda', -3.82877105, -38.46891275, 'Seg-Sáb: 08h00 as 17h00'),
(60, 'Ecoponto Lagoa do Urubu II', 'Rua Valmir, esquina com Rua Maria Souza - Floresta', -3.71946479, -38.57766393, 'Seg-Sáb: 08h00 as 17h00'),
(61, 'Ecoponto Lagoa do Urubu I', 'Rua Frei Odilon, esquina com rua dos Lagos Azuis - Floresta', -3.72405416, -38.57508455, 'Seg-Sáb: 08h00 as 17h00'),
(62, 'Ecoponto São Gerardo', 'Rua Hélio Viana, esquina com avenida Projetada - São Gerardo', -3.73213191, -38.56057183, 'Seg-Sáb: 08h00 as 17h00'),
(63, 'Ecoponto Rodolfo Teófilo', 'Rua Ana Neri, esquina com rua Coronel Nunes Melo - Rodolfo Teófilo', -3.74604803, -38.55062772, 'Seg-Sáb: 08h00 as 17h00'),
(64, 'Ecoponto Bela Vista', 'Rua rio Grande do Sul, esquina com rua Mário de Andrade - Bela Vista', -3.75081508, -38.56211987, 'Seg-Sáb: 08h00 as 17h00'),
(65, 'Ecoponto Desembargador Gonzaga', 'Avenida Desembargador Gonzaga, esquina com avenida Heitor de Oliveira Albuquerque - Cidade dos Funcionários', -3.79073802, -38.50256245, 'Seg-Sáb: 08h00 as 17h00'),
(66, 'Ecoponto Aguanambi', 'Aveinda Aguanambi, esquin com rua José Euclides - Fátima', -3.75217820, -38.52373958, 'Seg-Sáb: 08h00 as 17h00'),
(67, 'Ecoponto Autran Nunes II', 'Rua Padre Hipólito Pamplona, esquina com rua Pinhais - Autran Nunes', -3.74838561, -38.59552158, 'Seg-Sáb: 08h00 as 17h00'),
(68, 'Ecoponto Granja Lisboa', 'Rua LO, 2 - Granja Lisboa', -3.79777273, -38.61789772, 'Seg-Sáb: 08h00 as 17h00'),
(69, 'Ecoponto José Walter II', 'Avenida E, esquina com avenida I - José Walter', -3.83542771, -38.55416152, 'Seg-Sáb: 08h00 as 17h00'),
(70, 'Ecoponto Sapiranga III', 'Rua Evilásio Almeida, esquina com rua Ana Macedo - Sapiranga', -3.79567549, -38.46734699, 'Seg-Sáb: 08h00 as 17h00'),
(71, 'Ecoponto Lagoa da Zeza', 'Avenida Rogaciano Leite, esquina com rua Castro Alencar - Jardim das Oliveiras', -3.78280206, -38.50255471, 'Seg-Sáb: 08h00 as 17h00'),
(72, 'Ecoponto Itaoca', 'Rua Barão de Canindé, esquina com rua Mundica Paula - Itaoca', -3.77249899, -38.55819475, 'Seg-Sáb: 08h00 as 17h00'),
(73, 'Ecoponto Itaperi', 'Avenida Doutor Silas Munguba, esquina com rua Paraguaçu - Itaperi', -3.79042632, -38.54068771, 'Seg-Sáb: 08h00 as 17h00'),
(74, 'Ecoponto Dom Lustosa', 'Avenida Coronel Matos Dourado, esquina com Rua Vitória - Dom Lustosa', -3.75331406, -38.58239033, 'Seg-Sáb: 08h00 as 17h00'),
(75, 'Ecoponto Santa Filomena', 'rua Paraisópolis, esquina com rua Domingos Alves Ribeiro - Jangurussu', -3.83782532, -38.51309387, 'Seg-Sáb: 08h00 as 17h00'),
(76, 'Ecoponto Cocó', 'Avenida Padre Antônio Tomás, 2669 - Em frente ao número 2656 (próximo à Via Expressa) - Cocó', -3.74342403, -38.48860531, 'Seg-Sáb: 08h00 as 17h00'),
(77, 'Ecoponto Verdes Mares- Papicu', 'Rua Júlio Azevedo 688 - Papicu', -3.73694103, -38.47866800, 'Seg-Sáb: 08h00 as 17h00'),
(78, 'Ecoponto Vila Velha', 'Rua Jasmim, 0 - Por trás do Liceu Vila Velha - Vila Velha', -3.71132021, -38.60052243, 'Seg-Sáb: 08h00 as 17h00'),
(79, 'Ecoponto Barra do Ceará', 'Rua Graça Aranha, 300 - Esquina com a Rua Wilcar Bastos Cavalcante - Barra do Ceará', -3.70814464, -38.57330435, 'Seg-Sáb: 08h00 as 17h00'),
(80, 'Ecoponto Carlito Pamplona', 'Avenida Francisco Sá, S/N - Esquina com Rua Dom Hélio Campos - Carlito Pamplona', -3.71750945, -38.55622056, 'Seg-Sáb: 08h00 as 17h00'),
(81, 'Ecoponto Pirambú', 'Rua Coronel Costa Matos, 5 - Esquina com Rua Jacinto de Matos, ao lado do Posto - jacarecanga', -3.71345751, -38.54533721, 'Seg-Sáb: 08h00 as 17h00'),
(82, 'Ecoponto Leste Oeste', 'Av. Leste-Oeste, 2958 - Anexo à Escola Municipal Hilberto Silva - Carlito Pamplona', -3.71206723, -38.55529313, 'Seg-Sáb: 08h00 as 17h00'),
(83, 'Ecoponto Pirambú II', 'Rua Nossa Senhora das Graças, 505 - Esquina com a Rua Santa Rosa - Pirambu', -3.71051730, -38.55284583, 'Seg-Sáb: 08h00 as 17h00'),
(84, 'Ecoponto Cristo Redentor', 'Avenida Presidente Castelo Branco, 3879 - Av. Leste-Oeste, em frente ao nº 3833 - Cristo Redentor', -3.70863991, -38.56705134, 'Seg-Sáb: 08h00 as 17h00'),
(85, 'Ecoponto Vila do Mar', 'Rua José Roberto Sales, 473 - Esquina com a Rua Valdir Leopércio (ao lado do CEI) - Barra do Ceará', -3.69537416, -38.58239695, 'Seg-Sáb: 08h00 as 17h00'),
(86, 'Ecoponto Vila do Mar II', 'Rua Francisco Calaça, esquina com rua Santa Elisa - Barra do Ceará', -3.70234582, -38.56866529, 'Seg-Sáb: 08h00 as 17h00'),
(87, 'Ecoponto Floresta', 'Rua General Mário Hermes, esquina com a Rua Adolfo Bezerra de Menezes - Floresta', -3.71444678, -38.57674346, 'Seg-Sáb: 08h00 as 17h00'),
(88, 'Ecoponto Barra do Ceará II', 'Avenida Francisco Sá, esquina com rua Helenice Paiva Menezes - Barra do Ceará', -3.70651527, -38.58609944, 'Seg-Sáb: 08h00 as 17h00'),
(89, 'Ecoponto Paupina', 'Rua Primeiro de Abril, esquina com Rua Shirley - Paupina', -3.86822192, -38.49399499, 'Seg-Sáb: 08h00 as 17h00'),
(90, 'Ecoponto Alamdeda das Palmeiras', 'Rua Palmeira Tamareira, esquina com rua Palmeira Oliveira - Pedras', -3.87325989, -38.51738413, 'Seg-Sáb: 08h00 as 17h00'),
(91, 'Ecoponto Dragão do Mar', 'Rua Almirante Jaceguai x Av. Pessoa Anta - Centro', -3.72103689, -38.51952655, 'Sem informação'),
(92, 'Ecoponto Luiza Tavora', 'Rua Costa Barros, 1567 - Aldeota', -3.73110638, -38.50959896, 'Sem informação'),
(93, 'Ecoponto Campo do América', 'Rua José Vilar x Rua Edgar Damasceno - Meireles', -3.73092970, -38.50304049, 'Sem informação'),
(94, 'Ecoponto Praça das Flores', 'Rua Torres Câmara x Avenida Des. Moreira - Aldeota', -3.73848820, -38.49877536, 'Sem informação'),
(95, 'Ecoponto Joaquim Tavora', 'Praça Joaquim Tavora - Joaquim Távora', -3.75230835, -38.51658854, 'Sem informação')
ON CONFLICT (id_ponto) DO NOTHING;

-- Inserir Relacionamentos
INSERT INTO ponto_residuo (id_ponto, id_residuo) VALUES
(1, 1), (2, 1), (3, 1), (4, 1), (5, 1), (6, 1), (7, 1), (8, 1), (9, 1), (10, 1),
(11, 1), (12, 1), (13, 1), (14, 1), (15, 1), (16, 1), (17, 1), (18, 1), (19, 1), (20, 1),
(21, 1), (22, 1), (23, 1), (24, 1), (25, 1), (26, 1), (27, 1), (28, 1), (29, 1), (30, 1),
(31, 1), (32, 1), (33, 1), (34, 1), (35, 1), (36, 1), (37, 1), (38, 1), (39, 1), (40, 1),
(41, 1), (42, 1), (43, 1), (44, 1), (45, 1), (46, 1), (47, 1), (48, 1), (49, 1), (50, 1),
(51, 1), (52, 1), (53, 1), (54, 1), (55, 1), (56, 1), (57, 1), (58, 1), (59, 1), (60, 1),
(61, 1), (62, 1), (63, 1), (64, 1), (65, 1), (66, 1), (67, 1), (68, 1), (69, 1), (70, 1),
(71, 1), (72, 1), (73, 1), (74, 1), (75, 1), (76, 1), (77, 1), (78, 1), (79, 1), (80, 1),
(81, 1), (82, 1), (83, 1), (84, 1), (85, 1), (86, 1), (87, 1), (88, 1), (89, 1), (90, 1),
(91, 1), (92, 1), (93, 1), (94, 1), (95, 1)
ON CONFLICT (id_ponto, id_residuo) DO NOTHING;
