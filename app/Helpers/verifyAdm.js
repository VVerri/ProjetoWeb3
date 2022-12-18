const jwt = require ("jsonwebtoken");
const checkToken = require ("./checkToken");
const User = require ("../models/User")
const SECRET = "09609M8345UJ60F983U476NG9768gn987nt987NTB987nt987";

const verifyAdm = (req, res, next) => {

    /*if (req.headers.authorization) {
        return res.status(401).json({
            message: "Acesso negado!H"
        });
    }*/

    const token = checkToken(req);

    if (!token) {
        return res.status(401).json({
            message: "Acesso negado!T"
        });
    }

    try {

        const verifToken = jwt.verify(token, SECRET);
        req.user = verifToken;
        console.log(req.user);

        if (!req.user.admin) {
            return res.status(401).json({
                message: "Você não possui privilégios de administrador ainda!"
            });
        }

        next();

    } catch (error) {
        return res.status(400).json({
            message: "Token inválido!"
        });
    }

}

module.exports = verifyAdm;