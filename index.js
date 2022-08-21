const express = require('express');
const routes = require('./routes');

const app = require('./app');
require('dotenv').config();

app.use(express.json());

app.use(routes);

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
// primeiro commit
