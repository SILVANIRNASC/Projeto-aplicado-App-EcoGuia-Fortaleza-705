const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Busca o token no cabeçalho da requisição
    const authHeader = req.headers.authorization;

    // Se não tiver token, bloqueia
    if (!authHeader) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    const parts = authHeader.split(' ');

    if (!parts.length === 2) {
        return res.status(401).json({ error: 'Erro no token' });
    }

    const [ scheme, token ] = parts;

    // Verifica se começa com Bearer
    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).json({ error: 'Token mal formatado' });
    }

    // Verifica se o token é válido usando o segredo
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Token inválido' });

        // Se deu certo, salva o ID do usuário na requisição para usar depois
        req.userId = decoded.id;
        
        // Deixa passar para a próxima etapa
        return next();
    });
};