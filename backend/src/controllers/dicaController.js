const pool = require('../config/db');
const { verificarConquista } = require('../utils/gamification');

// CRIAR NOVA DICA
exports.criarDica = async (req, res) => {
    const { id_usuario, descricao } = req.body;

    try {
        const query = `
            INSERT INTO dicas_sustentaveis (id_usuario, descricao) 
            VALUES ($1, $2) 
            RETURNING *
        `;
        const novaDica = await pool.query(query, [id_usuario, descricao]);

        // Conta quantas dicas o usuário já deu
        const countQuery = await pool.query(
            'SELECT COUNT(*) as total FROM dicas_sustentaveis WHERE id_usuario = $1', 
            [id_usuario]
        );
        const totalDicas = parseInt(countQuery.rows[0].total);

        // Regra: 5 Dicas = Conquista ECO_MENTOR
        if (totalDicas === 5) {
            await verificarConquista(id_usuario, 'ECO_MENTOR');
        }

        res.status(201).json(novaDica.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao publicar dica." });
    }
};

// LISTAR TODAS AS DICAS (Feed)
exports.listarDicas = async (req, res) => {
    try {
        // JOIN para pegar o nome do autor da dica
        const query = `
            SELECT d.*, u.nome as autor, TO_CHAR(d.data_publicacao, 'DD/MM/YYYY HH24:MI') as data_formatada
            FROM dicas_sustentaveis d
            JOIN usuarios u ON d.id_usuario = u.id_usuario
            ORDER BY d.data_publicacao DESC
        `;
        const resultado = await pool.query(query);
        
        res.json(resultado.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar dicas." });
    }
};