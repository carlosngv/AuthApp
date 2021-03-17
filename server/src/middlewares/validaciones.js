const { validationResult } = require('express-validator');

const validarCampo = (req, res, next) => {
    const errores = validationResult( req );
    if(errores) {
        return res.status(400).json({
        ok: false,
        errores: errores.mapped(),
        });
    }
    next();
}

module.exports = {
    validarCampo
}
