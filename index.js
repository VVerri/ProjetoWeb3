// Configuração inicial
const express = require('express')
const cors = require ('cors')

const app = express()

// Conectando ao DB
const conn = require ("./app/db/conn");
conn();

// Utilizando o CORS
app.use(cors())

// Configurando JSON como resposta
app.use(express.json())


//Login com usuário
app.post("/auth/login", async (req, res) => {

    const {email, password} = req.body

    //Validações
    if(!email){
        return res.status(422).json({ message: 'O e-mail é obrigatório para logar! '})
    }

    if(!password){
        return res.status(422).json({ message: 'A senha é obrigatória para logar! '})
    }

    // Checando se o usuário está cadastrado
    const user = await User.findOne({ email: email })

    if(!user) {
        return res.status(404).json({ message: ' Usuário não encontrado. Cadastre-se agora! '})
    }

    // Checando se a senha confere descriptografando com o bcrypt
    const checkPassword = await bcrypt.compare(password, user.password)

    if(!checkPassword) {
        return res.status(422).json({ message: ' Senha inválida '})
    }

    // Autenticação do usuário
    try {
        
        const secret = process.env.secret

        const token = jwt.sign(
            {
                id: user._id,
            },
            secret,
        )

        res.status(200).json({ message: "Autenticação realizada com sucesso!", token })

    } catch (err) {
        console.log(error)
        res.status(500).json({ error: 'Aconteceu um erro no servidor, tente novamente mais tarde' })
    }
})

// Rota privada
app.get('/user/:id',checkToken, async (req, res) => {

    const id = req.params.id

    // Checando se o usuário existe
    const user = await User.findById(id, '-password')

    if(!user) {
        return res.status(404).json({ message: "Usuário não encontrado!" })
    }

    res.status(200).json({ user })


})

function checkToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if(!token) {
        return res.status(401).json({ message: "Acesso negado!!" })
    }

    try {
        
        const secret = process.env.SECRET

        jwt.verify(token, secret)

        next()

    } catch (error) {
        res.status(400).json({ message: "Token inválido!" })
    }
}


//usuario: victorverri senha:Verriteste1234
//string connect: mongodb+srv://victorverri:Verriteste1234@apicluster.zyxz4cj.mongodb.net/apidatabase?retryWrites=true&w=majority

// entregar rota de porta



