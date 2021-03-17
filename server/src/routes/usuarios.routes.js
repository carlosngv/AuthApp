const {Router} = require('express')
const router = Router()
const usuariosLogic = require('../controllers/usuarios.controllers')
const {check} = require('express-validator');
const {validarCampo} = require('../middlewares/validaciones');


router.get('/',usuariosLogic.obtenerUsuarios)

router.get('/:id', usuariosLogic.obtenerUsuario)

router.post('/new',[
    check('email', 'Se requiere un correo').isEmail(),
    check('password', 'La contraseña es muy corta').isLength({min: 6}),
    check('name', 'Se requiere un nombre').not().isEmpty(),
    //validarCampo
],
usuariosLogic.crearUsuario) // Registro

router.post('/', [
    check('email', 'Se requiere el correo').not().isEmpty(),
    check('password', 'Se requiere la contraseña').not().isEmpty(),
    //validarCampo
], usuariosLogic.iniciarSesion);

router.put('/:id', usuariosLogic.editarUsuario)

router.delete('/:id', usuariosLogic.eliminarUsuario)

module.exports = router
