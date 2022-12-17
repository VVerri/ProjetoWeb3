const { models } = require("mongoose");

const checkToken = (req) => {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if(!token) {
        return res.status(401).json({ message: "Acesso negado!!" })
    }

    return token;
}

module.exports = checkToken;