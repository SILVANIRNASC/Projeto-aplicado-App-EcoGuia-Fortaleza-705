const dotenv = require('dotenv');
const path = require('path');

// Carrega o arquivo .env do diretório raiz do projeto
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
