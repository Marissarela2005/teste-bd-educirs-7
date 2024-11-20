const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();
const port = 3000;

// Configuração da conexão com o banco de dados MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pokemon'
});

// Conectando ao banco de dados
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL');
});

// Servir arquivos estáticos
app.use(express.static('public'));

// Rota raiz (navegação principal)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});


// Rota para pesquisar pesquisadores
app.get('/api/pesquisadores', (req, res) => {
    const searchTerm = req.query.name; // Parâmetro de consulta 'name'

    let query = `
        SELECT 
            pesquisador.nome AS pesquisador,
            pesquisador.tese AS pesquisador,
            pesquisador.dissertacao AS pesquisador,
            pesquisador.artigo AS pesquisador 
            
        FROM 
            pesquisador
    `;

    const queryParams = [];
    if (searchTerm) {
        query += ` WHERE pesquisador.nome LIKE ?`;
        queryParams.push(`%${searchTerm}%`);
    }

    db.query(query, queryParams, (err, results) => {
        if (err) {
            return res.status(500).send('Erro ao buscar pesquisador.');
        }
        res.json(results);
    });
});

// Rota para pesquisar e seu
app.get('/api/pokemon', (req, res) => {
    const searchTerm = req.query.name; // Parâmetro de consulta 'name'

    let query = `
        SELECT 
            pokemon.nome AS pokemon, 
            treinador.nome AS treinador, 
            pokemon.nvl AS nvl
        FROM 
            pokemon
        JOIN 
            treinador_pokemon ON pokemon.id_pokemon = treinador_pokemon.id_pokemon
        JOIN 
            treinador ON treinador.id_treinador = treinador_pokemon.id_treinador
    `;

    const queryParams = [];
    if (searchTerm) {
        query += ` WHERE pokemon.nome LIKE ?`;
        queryParams.push(`%${searchTerm}%`);
    }

    db.query(query, queryParams, (err, results) => {
        if (err) {
            return res.status(500).send('Erro ao buscar Pokémon.');
        }
        res.json(results);
    });
});

// Rota para pesquisar batalhas
app.get('/api/batalhas', (req, res) => {
    const searchTerm = req.query.search; // Parâmetro de consulta 'search'

    let query = `
        SELECT 
            b.id AS id,
            t1.nome AS treinador1,
            t2.nome AS treinador2,
            b.vencedor
        FROM 
            batalha b
        JOIN 
            treinador t1 ON b.id_treinador1 = t1.id_treinador
        JOIN 
            treinador t2 ON b.id_treinador2 = t2.id_treinador
    `;

    const queryParams = [];
    if (searchTerm) {
        query += ` WHERE t1.nome LIKE ? OR t2.nome LIKE ?`;
        queryParams.push(`%${searchTerm}%`, `%${searchTerm}%`);
    }

    db.query(query, queryParams, (err, results) => {
        if (err) {
            return res.status(500).send('Erro ao buscar batalhas.');
        }
        res.json(results);
    });
});

// Rota para a página de batalhas
app.get('/batalhas', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/batalhas.html'));
});

app.get('/crud', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/crud.html'));
});

// Iniciando o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

