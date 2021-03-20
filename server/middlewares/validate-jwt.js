const { response } = require("express")
const jwt = require('jsonwebtoken');

const validateJWT = (req, res = response, next) => {
    const token = req.header('x-token');

    if(!token) {
        return res.status(401).json({
            ok: false,
            msg: 'Error en el token.'
        })
    }

    try {
        const payload = jwt.verify(token, process.env.SECRET_SEED);
        const {uid, name} = payload;
        // Se definen los valores en el req
        req.uid = uid;
        req.name = name;

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido.'
        })
    }

    next();
}


module.exports = {
    validateJWT,
}
