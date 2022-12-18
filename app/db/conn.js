require("dotenv").config();
const mongoose = require("mongoose");

async function main() {

    try {

        mongoose.set("strictQuery", true);

        await mongoose.connect(
            `mongodb+srv://victorverri:Verriteste1234@apicluster.zyxz4cj.mongodb.net/?retryWrites=true&w=majority`
        );

        console.log("Conectado ao Banco!");

    } catch (error) {
        console.log(`Erro: ${error}`);
    }

}

module.exports = main;