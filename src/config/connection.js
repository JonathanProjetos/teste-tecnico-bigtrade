const mongoose = require('mongoose');
require('dotenv/config');

/* 
  Normalmente, usaria variáveis de ambiente tanto no Docker quanto no arquivo de configuração,
  mas como no .gitignore constam tanto o .env quanto o .env.example, resolvi deixar hardcoded.
*/
const MONGO_URI = "mongodb://root:example@mongodb:27017";

const connectToDataBase = async () => {
  try {
    mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'mydatabase',
    });
    console.log(`Conectado ao banco de dados: mydatabase`);
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
};

module.exports = connectToDataBase;
