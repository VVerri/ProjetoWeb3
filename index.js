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

// Registrar usuários
app.post('/auth/register', async (req, res) => {

    const { name, email, password, confirmpassword, adm } = req.body

    // validações
    if(!name){
        return res.status(422).json({ message: 'O nome é obrigatório! '})
    }

    if(!email){
        return res.status(422).json({ message: 'O e-mail é obrigatório! '})
    }

    if(!password){
        return res.status(422).json({ message: 'A senha é obrigatória! '})
    }

    if(!confirmpassword){
        return res.status(422).json({ message: 'A confirmação de senha é obrigatória! '})
    }

    if(password !== confirmpassword) {
        return res.status(422).json({ message: 'As senhas não conferem! '})
    }

    if(adm === undefined || adm === null){
        return res.status(422).json({ message: 'A seleção de privilégio é obrigatória! '})
    }

    // Checando se o usuário já existe
    const userExists = await User.findOne({ email: email })

    if(userExists) {
        return res.status(422).json({ message: ' Usuário já cadastrado. Utilize outro e-mail! '})
    }

    

    //Criando a senha criptografada
    const salt = await bcrypt.genSalt(18)
    const passwordHash = await bcrypt.hash(password, salt)

    //Criando user
    const user = new User({
        name,
        email,
        password: passwordHash,
        adm
    })

    try {
        
        await user.save()

        res.status(200).json({ message: "Usuário cadastrado com sucesso!"})

    } catch (error) {

        console.log(error)
        res.status(500).json({ error: 'Aconteceu um erro no servidor, tente novamente mais tarde' })
    }


})


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



