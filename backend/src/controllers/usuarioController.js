const pool = require("../config/db");

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

    res.status(201).json(novoUsuario.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao cadastrar usuário" });
  }
};

exports.buscarUsuarioPorId = async (req, res) => {
  const { id } = req.params; // Pega o ID que veio na URL

  try {
    const query = "SELECT id_usuario, nome, email, telefone, bairro, cidade, estado, (bairro || ', ' || cidade || ' - ' || estado) as endereco_completo, data_cadastro FROM usuarios WHERE id_usuario = $1";
    const resultado = await pool.query(query, [id]);

    // Se a lista de linhas vier vazia, o usuário não existe
    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    // Retorna apenas o primeiro item do array
    res.json(resultado.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar usuário" });
  }
};
