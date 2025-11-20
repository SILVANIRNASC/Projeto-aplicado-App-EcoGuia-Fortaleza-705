const pool = require("../config/db");
const bcrypt = require('bcrypt');
const { verificarConquista } = require('../utils/gamification');

// Listar todos os usuários
exports.listarUsuarios = async (req, res) => {
  try {
    const resultado = await pool.query("SELECT id_usuario, nome, email, telefone, bairro, cidade, estado, (bairro || ', ' || cidade || ' - ' || estado) as endereco_completo, data_cadastro FROM usuarios");
    res.json(resultado.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
};

// Criar um novo usuário
exports.criarUsuario = async (req, res) => {
  const { nome, email, senha_hash, bairro, cidade, estado, telefone } = req.body;
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(senha_hash, saltRounds);

    const query =
      "INSERT INTO usuarios (nome, email, senha_hash, bairro, cidade, estado, telefone) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";

    const values = [nome, email, hashedPassword, bairro, cidade, estado, telefone];

    const novoUsuario = await pool.query(query, values);
    const usuario = novoUsuario.rows[0];

    // Dá a conquista de boas-vindas automaticamente
    await verificarConquista(usuario.id_usuario, 'BEM_VINDO');

    usuario.pontos_total = 10;

    res.status(201).json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao cadastrar usuário" });
  }
};

exports.buscarUsuarioPorId = async (req, res) => {
  const { id } = req.params; // Pega o ID que veio na URL

  try {
    const query = `SELECT id_usuario, nome, email, telefone, bairro, cidade, estado,
      pontos_total, (bairro || ', ' || cidade || ' - ' || estado) as endereco_completo, data_cadastro,
      (SELECT COUNT(*)::int FROM plantas WHERE plantas.id_usuario = usuarios.id_usuario) as total_plantas,
      (SELECT COUNT(*)::int FROM dicas_sustentaveis WHERE dicas_sustentaveis.id_usuario = usuarios.id_usuario) as total_dicas
    FROM usuarios WHERE id_usuario = $1`;
    
    const userRes = await pool.query(query, [id]);
    if (userRes.rows.length === 0) return res.status(404).json({ error: 'Usuário não encontrado' });

    // Busca as conquistas desse usuário
    const conquistasQuery = `SELECT c.titulo, c.descricao, c.pontos, c.icone, TO_CHAR(cu.data_conquista, 'DD/MM/YYYY') as data
        FROM conquistas_usuario cu
        JOIN conquistas c ON cu.id_conquista = c.id_conquista
        WHERE cu.id_usuario = $1
        ORDER BY cu.data_conquista DESC`;
    const conquistasRes = await pool.query(conquistasQuery, [id]);

    const usuarioCompleto = {
        ...userRes.rows[0],
        conquistas: conquistasRes.rows // Array de conquistas
    };

    res.json(usuarioCompleto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar usuário" });
  }
};

exports.atualizarUsuario = async (req, res) => {
    const { id } = req.params;
    const { nome, telefone, bairro, cidade, estado } = req.body;

    try {
        const query = `
            UPDATE usuarios 
            SET nome = $1, telefone = $2, bairro = $3, cidade = $4, estado = $5
            WHERE id_usuario = $6
            RETURNING *
        `;
        
        const values = [nome, telefone, bairro, cidade, estado, id];
        const resultado = await pool.query(query, values);

        if (resultado.rowCount === 0) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        res.json(resultado.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao atualizar usuário" });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Busca o usuário pelo e-mail
        const query = 'SELECT * FROM usuarios WHERE email = $1';
        const result = await pool.query(query, [email]);

        if (result.rows.length === 0) {
            return res.status(401).json({ error: "E-mail ou senha incorretos." });
        }

        const usuario = result.rows[0];

        // Compara a senha enviada com o Hash do banco
        const senhaValida = await bcrypt.compare(password, usuario.senha_hash);

        if (!senhaValida) {
            return res.status(401).json({ error: "E-mail ou senha incorretos." });
        }

        delete usuario.senha_hash;
        
        res.json({
            message: "Login realizado com sucesso!",
            usuario: usuario
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro interno no servidor." });
    }
};