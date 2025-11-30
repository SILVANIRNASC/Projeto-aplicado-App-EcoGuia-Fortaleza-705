const pool = require('../config/db');
const { verificarConquista } = require('../utils/gamification');

exports.listarEventos = async (req, res) => {
    // Precisamos saber quem está pedindo a lista para dizer se ele já confirmou presença
    const { id_usuario } = req.query; 

    try {
        const query = `
            SELECT 
                e.id_evento, 
                e.titulo, 
                e.descricao, 
                e.local, 
                TO_CHAR(e.data_evento, 'DD/MM/YYYY HH24:MI') as data_formatada,
                e.data_evento, -- Para ordenação
                -- Subquery para contar total de participantes
                (SELECT COUNT(*)::int FROM participacao_evento pe WHERE pe.id_evento = e.id_evento) as total_participantes,
                -- Subquery para saber se O USUÁRIO ATUAL vai (retorna true/false)
                EXISTS(SELECT 1 FROM participacao_evento pe WHERE pe.id_evento = e.id_evento AND pe.id_usuario = $1) as participando
            FROM eventos e
            WHERE e.data_evento >= CURRENT_DATE -- Apenas eventos futuros
            ORDER BY e.data_evento ASC
        `;
        
        const resultado = await pool.query(query, [id_usuario || 0]);
        res.json(resultado.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar eventos." });
    }
};

// CRIAR EVENTO
exports.criarEvento = async (req, res) => {
    const { titulo, descricao, data_evento, local, id_usuario } = req.body;

    if (!titulo || !descricao || !data_evento || !local) {
        return res.status(400).json({ 
            error: "Campos obrigatórios ausentes",
            details: "Por favor, preencha Título, Descrição, Data e Local." 
        });
    }

    try {
        const query = `
            INSERT INTO eventos (titulo, descricao, data_evento, local) 
            VALUES ($1, $2, $3, $4) 
            RETURNING *
        `;
        const novoEvento = await pool.query(query, [titulo, descricao, data_evento, local]);
        const evento = novoEvento.rows[0];

        // AUTO CHECK-IN PARA O CRIADOR
        if (id_usuario) {
            const userCheck = await pool.query('SELECT 1 FROM usuarios WHERE id_usuario = $1', [id_usuario]);

            if (userCheck.rowCount > 0) {
                await pool.query(
                    'INSERT INTO participacao_evento (id_evento, id_usuario) VALUES ($1, $2)', 
                    [evento.id_evento, id_usuario]
                );
                
                // Tenta dar a conquista (falhas aqui não devem quebrar a criação do evento)
                try {
                    await verificarConquista(id_usuario, 'EVENTO_PRESENCA');
                } catch (gamificationError) {
                    console.warn("Erro ao processar gamificação no evento:", gamificationError);
                }
            }
        }

        res.status(201).json(evento);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao criar evento." });
    }
};

// CONFIRMAR/CANCELAR PRESENÇA (Check-in)
exports.togglePresenca = async (req, res) => {
    const { id_evento } = req.params;
    const { id_usuario } = req.body;

    try {
         // Verifica se o evento existe
        const eventoCheck = await pool.query('SELECT 1 FROM eventos WHERE id_evento = $1', [id_evento]);
        if (eventoCheck.rowCount === 0) {
            return res.status(404).json({ error: "Evento não encontrado." });
        }

        // Verifica se o usuário existe
        const userCheck = await pool.query('SELECT 1 FROM usuarios WHERE id_usuario = $1', [id_usuario]);
        if (userCheck.rowCount === 0) {
            return res.status(404).json({ error: "Usuário não encontrado." });
        }

        // Verifica se já está participando
        const checkQuery = 'SELECT * FROM participacao_evento WHERE id_evento = $1 AND id_usuario = $2';
        const checkRes = await pool.query(checkQuery, [id_evento, id_usuario]);

        if (checkRes.rows.length > 0) {
            // Se já participa, REMOVE (Cancelar presença)
            await pool.query('DELETE FROM participacao_evento WHERE id_evento = $1 AND id_usuario = $2', [id_evento, id_usuario]);
            res.json({ status: 'removido', message: 'Presença cancelada.' });
        } else {
            // Se não participa, ADICIONA (Confirmar presença)
            await pool.query('INSERT INTO participacao_evento (id_evento, id_usuario) VALUES ($1, $2)', [id_evento, id_usuario]);
            
            // GAMIFICAÇÃO
            try {
                await verificarConquista(id_usuario, 'EVENTO_PRESENCA');
            } catch (gamificationError) {
                 console.warn("Erro ao processar gamificação na presença:", gamificationError);
            }   
                     
            res.json({ status: 'adicionado', message: 'Presença confirmada!' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao atualizar presença." });
    }
};

// LISTAR QUEM VAI NO EVENTO
exports.listarParticipantes = async (req, res) => {
    const { id_evento } = req.params;

    try {
        const query = `
            SELECT u.nome
            FROM participacao_evento pe
            JOIN usuarios u ON pe.id_usuario = u.id_usuario
            WHERE pe.id_evento = $1
        `;
        const result = await pool.query(query, [id_evento]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar participantes." });
    }
};