const pool = require("../config/db");
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
    const query =
      "INSERT INTO usuarios (nome, email, senha_hash, bairro, cidade, estado, telefone) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";
    const values = [nome, email, senha_hash, bairro, cidade, estado, telefone];
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
