const express = require('express');
const producstRoutes = require('./routes/productsRoutes');

const app = require('./app');
require('dotenv').config();

app.use(express.json());

app.use('/products', producstRoutes);

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
// primeiro commit
