const User = require("../models/user.model");
const bcrypt = require('bcryptjs');
const { genJWT } = require("../helpers/jwt");

const createUser = async (req, res) => {

    const { email, name, password } = req.body;

    try {

        let user = await User.findOne({email});

        if(user) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe con ese email.',
            });
        }

        const dbUser = new User( req.body );

        // Hash de la contraseña
        const salt = bcrypt.genSaltSync()
        dbUser.password = bcrypt.hashSync( password, salt );

        // Generar JWT
        const token = await genJWT(dbUser.uid, dbUser.name);

        // Save user
        await dbUser.save();





        return res.status(200).json({
            ok: true,
            msg: 'Usuario creado!',
            uid: dbUser.id,
            name: dbUser.name,
            email: dbUser.email,
            token
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Contacte al administrador.',
        });
    }

}

const login = async ( req, res ) => {

    const { email, password } = req.body;

    try {

        const dbUser = await User.findOne( {email} );
        if(!dbUser) {
            return res.status(500).json({
                ok: false,
                msg: 'Por favor, verifique sus datos.',

            });
        }

        // Comparar con contraseñas encriptada.

        const validPassword = bcrypt.compareSync(password, dbUser.password);

        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña no es válida.',
            });
        }


        // Generar JWT
        const token = await genJWT(dbUser.id, dbUser.name);

        return res.json({
            ok: true,
            msg: '',
            uid: dbUser.id,
            name: dbUser.name,
            email: dbUser.email,
            token
        })


    } catch (error) {

        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Contacte al administrador',
        });
    }
}
const validateToken = async ( req, res ) => {

    const {uid, name} = req;
    const token = await genJWT(uid, name);
    const dbUser = await User.findById(uid);


    res.status(200).json({
        ok: true,
        msg: 'Token validated',
        uid,
        name,
        email: dbUser.email,
        token,
})}


module.exports = {
    createUser,
    login,
    validateToken
}
