const Crypto = require("../models/Crypto");

class cryptoController {

    // Criação de par cripto
    static async create(req, res) {

        const {
            fromCurrency,
            toCurrency,
            name,
            pairName,
            askPrice
        } = req.body;

        // Validações para cadastro de parcrypto
        if (!fromCurrency) {
            return res.status(422).json({
                message: "A primeira moeda é obrigatória para o cadastro!"
            });
        }

        if (!toCurrency) {
            return res.status(422).json({
                message: "A segunda moeda é obrigatória para o cadastro!"
            });
        }

        if (!name) {
            return res.status(422).json({
                message: "O nome do par é obrigatório para o cadastro!"
            });
        }

        if (!askPrice) {
            return res.status(422).json({
                message: "O valor de conversão é obrigatório para o cadastro!"
            });
        }

        // Verificação se já foi cadastrado o par
        const cryptoExists = await Crypto.findOne({
            fromCurrency: fromCurrency,
            toCurrency: toCurrency,
            pairName: pairName
        });

        if (cryptoExists) {
            return res.status(422).json({
                message: "O par de conversão já existe. Cadastre um novo par!"
            });
        }

        // Criando um par crypto
        const crypto = new Crypto({
            fromCurrency: req.body.fromCurrency,
            toCurrency: req.body.toCurrency,
            name: req.body.name,
            pairName: req.body.fromCurrency+req.body.toCurrency,
            askPrice: req.body.askPrice
        })

        try {
            const newCrpto = await crypto.save();
            
            res.status(201).json({
                message: "Par cadastrado com sucesso!",
                newCrpto
            });
        } catch (error) {
            res.status(500).json({
                message: "Erro ao cadastrar par com o servidor!"
            });
        }
    }

    // Busca por nome do par
    static async searchPair(req, res) {

        const pairName = req.params.pairName;

        if (pairName === null || pairName === "") {
            return res.status(422).json({
                message: "Nome do par inválido"
            })
        }

        try {
            const crypto = await Crypto.findOne({
                pairName: pairName
            });
            res.status(200).json({
                crypto
            })
        } catch (error) {
            return res.status(401).json({
                message: "Não foi encontrado nenhum par com esse nome!"
            });
        }
    }

    //Busca por moeda origem
    static async searchFrom(req, res) {

        const fromCurrency = req.params.fromCurrency;

        if (fromCurrency === null || fromCurrency === "" || !fromCurrency) {
            return res.status(422).json({
                message: "Nome da moeda origem inválido"
            })
        }

        try {
            const crypto = await Crypto.find({
                fromCurrency: fromCurrency
            });
            res.status(200).json({
                crypto
            })
        } catch (error) {
            return res.status(401).json({
                message: "Não foi encontrado nenhum par com essa moeda como origem!"
            });
        }
    }

    // Busca por moeda destino
    static async searchTo(req, res) {

        const toCurrency = req.params.toCurrency;

        if (toCurrency === null || toCurrency === "") {
            return res.status(422).json({
                message: "Nome da moeda destino inválido"
            })
        }

        try {
            const crypto = await Crypto.find({
                toCurrency: toCurrency
            });
            res.status(200).json({
                crypto
            })
        } catch (error) {
            return res.status(401).json({
                message: "Não foi encontrado nenhum par com essa moeda como destino!"
            });
        }
    }


}

module.exports = cryptoController;