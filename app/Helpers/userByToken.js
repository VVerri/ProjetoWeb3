const jwt = require ("jsonwebtoken");
const User = require ("../models/User");
const SECRET = "09609M8345UJ60F983U476NG9768gn987nt987NTB987nt987";

const userByToken = async (token) => {

    if (!token) {
        return res.status(401).json({
            message: "Acesso negado. Você precisa não tem um token de acesso!"
        });
    }

    try {

        const decod = jwt.verify(token, SECRET);
        const ID = decod.id;
        const user = await User.findOne({
            _id: ID
        });

        res.status(200).json({
            message: "Usuário encontrado com sucesso"
        });

    } catch (error) {
        res.status(400).json({
            message: "Token inválido!"
        });
    }

    return user;

}