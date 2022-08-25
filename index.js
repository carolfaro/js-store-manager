const express = require('express');
const producstRoutes = require('./routes/productsRoutes');

const salesRoutes = require('./routes/salesRoutes');

const app = require('./app');
require('dotenv').config();

app.use(express.json());

app.use('/products', producstRoutes);

app.use('/sales', salesRoutes);

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
// primeiro commit
