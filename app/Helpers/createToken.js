const jwt = require ("jsonwebtoken");
const SECRET= process.env.SECRET;

createToken = async (user, req, res) => {

    const token = jwt.sign({
        id: user._id,
        name: user.name,
        adm: user.adm
    }, SECRET);

    res.status(200).json({
        message: "Autenticação realizada com sucesso",
        token
    })
}

module.exports = createToken;