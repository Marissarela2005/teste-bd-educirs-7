CREATE DATABASE educirs;
USE educirs;

CREATE TABLE eventos (
    id_evento INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    ano INT,
    resumos_ampliados TEXT,
    periodicos VARCHAR(255),
    anais VARCHAR(255)
);

CREATE TABLE pesquisador (
    id_pesquisador INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    nome_tese TEXT,
    nome_dissertacao TEXT,
    nome_projeto TEXT,
    nome_artigo TEXT
);

CREATE TABLE artigos (
    id_artigo INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    ano INT,
    periodico VARCHAR(255),
    id_pesquisador INT,
    FOREIGN KEY (id_pesquisador) REFERENCES pesquisadores(id_pesquisador)
);

CREATE TABLE projetos (
    id_projeto INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    ano INT,
    resumo TEXT,
    id_pesquisador INT,
    FOREIGN KEY (id_pesquisador) REFERENCES pesquisadores(id_pesquisador)
);

INSERT INTO eventos (nome, ano, resumos_ampliados, periodicos, anais)
VALUES
('Congresso de Ciência 2024', 2024, 'Resumo ampliado do evento de ciência.', 'Revista Científica', 'Anais do Congresso de Ciência 2024'),
('Workshop de Tecnologias', 2023, 'Resumo ampliado do workshop.', 'Jornal de Tecnologia', 'Anais do Workshop de 2023');

-- Inserindo dados na tabela Pesquisadores
INSERT INTO pesquisadores (id_pesquisador, nome)
VALUES (1 'Alcina Maria Testa Braz da Silva'),
(2 'Albertina Maria Batista de Sousa da Silva'),
(3 'Cleide Aparecida Ferreira da Silva Gusmão'),
(4 'Daniele da Silva Maia Gouveia'),
(5 'Dayvisson Luís Vittorazzi'),
(6 'Daysi Lucidi Gomes de Faria'),
(7 'Giisele Pereira de Oliveira Xavier'),
(8 'Juliana da Silva Magalhães'),
(9 'Juliana Teixeira Jesus Ramos'),
(10 'Mariana de Souza Lima'),
(11 'Patricia Bastos Fosse Peres'),
(12 'Patryck Mendes de Lima Alvarento'),
(13 'Renata Gerhardt Gomes Roza'),
(14 'Rômulo Tonyathy da Silva Mangueira'),
(15 'Marcia Brito de Souza'),
(16 'Felipe Machado Teixeira Couto'),
(17 'Karina Rocha Rosa de Castro');

-- Inserindo dados na tabela Artigos
INSERT INTO artigos (nome, ano, periodico, id_pesquisador)
VALUES
('Avanços em Inteligência Artificial', 2024, 'Revista de Computação', 1),
('Estudo sobre Biologia Sintética', 2023, 'Revista de Biotecnologia', 2);

-- Inserindo dados na tabela Projetos
INSERT INTO projetos (nome, ano, resumo, id_pesquisador)
VALUES
('Projeto de Redes Neurais', 2024, 'Resumo do projeto de redes neurais.', 1),
('Projeto de Biologia Sintética', 2023, 'Resumo do projeto de biologia sintética.', 2);
