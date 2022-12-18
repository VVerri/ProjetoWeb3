// Configuração inicial
const express = require("express");
const cors = require ("cors");


const app = express();

// Utilizando o CORS
app.use(cors());

// Configurando JSON como resposta
app.use(express.json());

// Pasta publica de utilização
app.use(express.static('public'));

// Rotas
const userRoutes = require ("./app/routes/userRoutes");
const cryptoRoutes = require ("./app/routes/cryptoRoutes");

app.use("/users", userRoutes);
app.use("/cryptos", cryptoRoutes);


// Conectando ao DB
const conn = require ("./app/db/conn");
conn();


