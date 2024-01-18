const express = require('express');
require("express-async-errors");
const { connectToDataBase } = require('./config/connection');

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use((err, _req, res, _next) => {
  if (err.message.split('').includes('|')) {
    const [status, message] = err.message.split('|');
    res.status(Number(status)).json({ error: message });
  } else {
    console.error('Erro não Mapeado:', err);
    console.error('Erro não Mapeado:', err.message);
    res.status(500).json({ error: err.message });
  }
  
});

connectToDataBase().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}).catch((err) => {
  console.log('Erro ao conectar ao banco de dados err:\r\n');
  console.error(err);
  console.log('\r\nInicialização do servidor foi cancelada');
  process.exit(0);
});
