require("dotenv").config();
const mongoose = require("mongoose");
const DB_URL = process.env.DB_URL;

async function main() {

    try {

        await mongoose.connect(DB_URL);
        console.log("Conectado ao Banco!");

    } catch (error) {
        console.log(`Erro: ${error}`);
    }

}

module.exports = main;