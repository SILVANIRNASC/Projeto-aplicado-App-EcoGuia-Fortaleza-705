const pool = require('../config/db');

exports.listarPontos = async (req, res) => {
    try {
        const query = `
            SELECT 
                p.id_ponto, 
                p.nome_local, 
                p.endereco, 
                p.latitude, 
                p.longitude, 
                p.horario_funcionamento,
                COALESCE(
                    json_agg(
                        json_build_object('nome', r.nome_tipo, 'cor', r.cor_hex)
                    ) FILTER (WHERE r.id_residuo IS NOT NULL), 
                    '[]'
                ) as lista_residuos
            FROM pontos_coleta p
            LEFT JOIN ponto_residuo pr ON p.id_ponto = pr.id_ponto
            LEFT JOIN residuos r ON pr.id_residuo = r.id_residuo
            GROUP BY p.id_ponto
            ORDER BY p.nome_local ASC
        `;

        const resultado = await pool.query(query);
        
        res.json(resultado.rows);

    } catch (error) {
        console.error("Erro ao buscar pontos:", error);
        res.status(500).json({ error: "Erro ao buscar pontos de coleta" });
    }
};