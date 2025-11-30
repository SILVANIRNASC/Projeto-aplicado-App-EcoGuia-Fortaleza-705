const pool = require('../config/db');
const { verificarConquista } = require('../utils/gamification');

exports.criarPlanta = async (req, res) => {
    const id_usuario = req.userId;
    const { nome_popular, nome_cientifico, data_plantio, frequencia_rega } = req.body;

    try {
        if (!nome_popular || !data_plantio || !frequencia_rega) {
            return res.status(400).json({ 
                error: "Campos obrigatórios ausentes",
                details: "Por favor, preencha Nome Popular, Data do Plantio e Regar a cada (dias)." 
            });
        }

        const freqRega = frequencia_rega || 3;
        
        const query = `INSERT INTO plantas (id_usuario, nome_popular, nome_cientifico, data_plantio, frequencia_rega, ultima_rega) 
            VALUES ($1, $2, $3, $4, $5, $6) 
            RETURNING *
        `;
        const values = [id_usuario, nome_popular, nome_cientifico, data_plantio, freqRega, data_plantio];
        const novaPlanta = await pool.query(query, values);

        // Contamos quantas plantas esse usuário tem AGORA
        const countQuery = await pool.query(
            'SELECT COUNT(*) as total FROM plantas WHERE id_usuario = $1', 
            [id_usuario]
        );
        const totalPlantas = parseInt(countQuery.rows[0].total);

        // Regra 1: Se for a primeira planta (Total = 1)
        if (totalPlantas === 1) {
            await verificarConquista(id_usuario, 'PRIMEIRA_PLANTA');
        }

        // Regra 2: Se completou 10 plantas
        if (totalPlantas === 10) {
            await verificarConquista(id_usuario, 'JARDINEIRO_TOP');
        }

        res.status(201).json(novaPlanta.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao cadastrar planta." });
    }
};

exports.registrarCuidado = async (req, res) => {
    const { id_planta } = req.params;
    const { tipo_cuidado } = req.body;
    const id_usuario_logado = req.userId;

    try {
        const checkQuery = 'SELECT id_usuario FROM plantas WHERE id_planta = $1';
        const checkResult = await pool.query(checkQuery, [id_planta]);

        if (checkResult.rowCount === 0) {
            return res.status(404).json({ error: "Planta não encontrada." });
        }

        // Se a planta não for do usuário logado, bloqueia
        if (checkResult.rows[0].id_usuario !== id_usuario_logado) {
            return res.status(403).json({ error: "Você não pode cuidar da planta de outra pessoa." });
        }

        let coluna = '';
        if (tipo_cuidado === 'rega') coluna = 'ultima_rega';
        else if (tipo_cuidado === 'adubacao') coluna = 'ultima_adubacao';
        else if (tipo_cuidado === 'poda') coluna = 'ultima_poda';
        else return res.status(400).json({ error: "Tipo de cuidado inválido" });

        // Atualiza a data da última ação para AGORA
        const query = `UPDATE plantas SET ${coluna} = CURRENT_TIMESTAMP WHERE id_planta = $1 RETURNING *`;
        await pool.query(query, [id_planta]);

        res.json({ message: "Cuidado registrado com sucesso!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao registrar cuidado." });
    }
};

exports.listarPlantasPorUsuario = async (req, res) => {
    const { id_usuario } = req.params;
    const id_usuario_logado = req.userId;

    if (parseInt(id_usuario) !== id_usuario_logado) {
        return res.status(403).json({ error: "Acesso negado. Você só pode ver seu próprio jardim." });
    }

    try {
        const query = `SELECT *, TO_CHAR(data_plantio, 'DD/MM/YYYY') as data_formatada 
            FROM plantas 
            WHERE id_usuario = $1 
            ORDER BY data_plantio DESC
        `;
        const resultado = await pool.query(query, [id_usuario]);
        
        const plantasProcessadas = resultado.rows.map(planta => {
            // Calcular próxima rega
            const ultimaRega = new Date(planta.ultima_rega);
            const proximaRega = new Date(ultimaRega);
            proximaRega.setDate(ultimaRega.getDate() + planta.frequencia_rega);

            // Diferença em dias entre HOJE e a Próxima Rega
            const hoje = new Date();
            const diffTime = proximaRega.getTime() - hoje.getTime();
            const diasRestantes = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

            let statusRega = "";
            if (diasRestantes < 0) statusRega = "Atrasada!";
            else if (diasRestantes === 0) statusRega = "Hoje";
            else if (diasRestantes === 1) statusRega = "Amanhã";
            else statusRega = `Em ${diasRestantes} dias`;

            return {
                ...planta,
                proxima_rega_data: proximaRega,
                status_rega: statusRega // Texto amigável para o front
            };
        });

        res.json(plantasProcessadas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar plantas." });
    }
};