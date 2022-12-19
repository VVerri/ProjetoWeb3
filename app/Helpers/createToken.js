const jwt = require ("jsonwebtoken");
const SECRET= "09609M8345UJ60F983U476NG9768gn987nt987NTB987nt987";

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