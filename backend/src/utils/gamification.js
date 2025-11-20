const pool = require('../config/db');

const verificarConquista = async (idUsuario, slugConquista) => {
    try {
        const conquistaRes = await pool.query('SELECT * FROM conquistas WHERE slug = $1', [slugConquista]);
        
        if (conquistaRes.rows.length === 0) return; // Conquista não existe no banco

        const conquista = conquistaRes.rows[0];

        await pool.query(
            'INSERT INTO conquistas_usuario (id_usuario, id_conquista) VALUES ($1, $2)',
            [idUsuario, conquista.id_conquista]
        );

        await pool.query(
            'UPDATE usuarios SET pontos_total = pontos_total + $1 WHERE id_usuario = $2',
            [conquista.pontos, idUsuario]
        );

        console.log(`🎉 Usuário ${idUsuario} ganhou a conquista: ${conquista.titulo} (+${conquista.pontos} pts)`);
        return true;

    } catch (error) {
        // Se der erro de "duplicate key", significa que ele já tinha a conquista.
        if (error.code !== '23505') { 
            console.error('Erro na gamificação:', error);
        }
        return false;
    }
};

module.exports = { verificarConquista };