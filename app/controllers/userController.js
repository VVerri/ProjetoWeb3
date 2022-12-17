const bcrypt = require("bcrypt");
const jwt = require ("jsonwebtoken");
const User = require ("../models/User");
const createToken = require ("../Helpers/createToken");
const checkToken = require ("../Helpers/checkToken");
const userByToken = require ("../Helpers/userByToken")
const SECRET = "09609M8345UJ60F983U476NG9768gn987nt987NTB987nt987";

class userController {

    // Registrando usuário
    static async register(req, res) {

        const {
            name,
            email,
            password,
            confirmpassword,
            adm
        } = req.body;

        // Validações
        if (!name) {
            return res.status(422).json({
                message: "O nome é obrigatório!"
            });
        }

        if (!email) {
            return res.status(422).json({
                message: "O e-mail é obrigatório!"
            });
        }

        if (!password) {
            return res.status(422).json({
                message: "A senha é obrigatória!"
            });
        }

        if (!confirmpassword) {
            return res.status(422).json({
                message: "A confirmação de senha é obrigatória!"
            });
        }

        if (password !== confirmpassword) {
            return res.status(422).json({
                message: "As senhas não conferem!"
            });
        }

        if (adm === undefined || adm === null) {
            return res.status(422).json({
                message: "A seleção de privilégio é obrigatória!"
            });
        }

        // Checando se o usuário já existe
        const userExists = await User.findOne({
            email: email
        })

        if (userExists) {
            return res.status(422).json({
                message: "Usuário já cadastrado. Utilize outro e-mail!"
            })
        }

        // Criando a senha criptografada
        const salt = await bcrypt.genSalt(18);
        const passwordHash = await bcrypt.hash(password, salt);

        // Criando user
        const user = new User({
            name,
            email,
            password: passwordHash,
            adm
        })

        try {

            await user.save()

            res.status(200).json({
                message: "Usuário cadastrado com sucesso!"
            })

        } catch (error) {

            console.log(error)
            res.status(500).json({
                error: 'Aconteceu um erro no servidor, tente novamente mais tarde'
            })
        }
    }

    
}

