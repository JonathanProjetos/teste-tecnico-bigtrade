const mongoose = require('mongoose');
require('dotenv/config');

const MONGO_URI = "mongodb://localhost:27017/mydatabase";

const connectToDataBase = async () => {
  try {
    mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Conectado ao banco de dados: mydatabase`);
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
};

// Exporte a função de conexão
module.exports = { connectToDataBase, mongoose };