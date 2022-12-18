const bcrypt = require("bcrypt");
const jwt = require ("jsonwebtoken");
const User = require ("../models/User");
const createToken = require ("../helpers/createToken");
const checkToken = require ("../helpers/checkToken");
const userByToken = require ("../helpers/userByToken")
const SECRET = process.env.SECRET;

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

            const newUser = await user.save();

            res.status(200).json({
                message: "Usuário cadastrado com sucesso!",
                newUser
            });

        } catch (error) {

            console.log(error)
            res.status(500).json({
                error: 'Aconteceu um erro no servidor, tente novamente mais tarde'
            });
        }
    }

    // Fazer login com o usuário
    static async login(req, res) {

        const {
            email,
            password
        } = req.body

        //Validações
        if (!email) {
            return res.status(422).json({
                message: "O e-mail é obrigatório para logar!"
            });
        }

        if (!password) {
            return res.status(422).json({
                message: "A senha é obrigatória para logar!"
            });
        }

        // Checando se o usuário está cadastrado
        const user = await User.findOne({
            email: email
        });

        if (!user) {
            return res.status(404).json({
                message: "Usuário não encontrado. Cadastre-se agora!"
            });
        }

        // Checando se a senha confere descriptografando com o bcrypt
        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            return res.status(422).json({
                message: "Senha inválida"
            });
        }

        await createToken(user, req, res);
    }

    //Mantendo usuário conectado ao sistema
    static async authenticaded(req, res) {

        let userOnline;

        if (req.headers.authorization) {
            const token = checkToken(req);
            const user = await userByToken(token);
            userOnline = user;
            userOnline.password = undefined;
        } else {
            userOnline = null;
        }

        res.status(200).json({
            userOnline
        });
    }

}

module.exports = userController;

/*
// Read -  Leitura de dados
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)

    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
})




// Update - Atualização de dados (PUT, PATCH)
router.patch('/:id', async (req, res) => {

    const id = req.params.id
    const { name, celphone, approved } = req.body

    const user = {
        name,
        celphone,
        approved
    }

    try {
        const updatedUser = await User.updateOne({_id:id}, user)

        if(updatedUser.matchedCount === 0){
            res.status(422).json({ message: 'O usuário não foi encontrado! '})
            return
        }

        res.status(200).json(user)


    } catch (error) {
        res.status(500).json({
            error: error
        })
    }

})

// Delete - Deletar dados

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const user = await User.findOne({ _id: id})

    if(!user){
        res.status(422).json({ message: 'O usuário não foi encontrado! '})
        return
    }

    try {
        await User.deleteOne({ _id: id})

        res.status(200).json({ message: 'Usuário removido com sucesso'})


    } catch (error) {
        res.status(500).json({
            error: error
        })
    }

})
*/
