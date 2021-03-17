const usuarioLogic = {};

const Usuario = require('../models/Usuario')
const bcrypt = require('bcryptjs');

usuarioLogic.obtenerUsuarios = async (req, res) => {
  const usuarios = await Usuario.find()
  res.json(usuarios)
};

usuarioLogic.iniciarSesion = async (req, res) => {

  const { email, password} = req.body;
  const user = await Usuario.findOne({email: email});
  console.log(user);
  if(!user) {
    return res.status(400).json({
      ok: false,
      msg: 'El usuario no existe con ese corre.',
    });
  }


  const validPassword = bcrypt.compareSync(password, user.password);
  if(!validPassword) {
    return res.status(400).json({
      ok: false,
      msg: 'Contraseña incorrecta',
    });
  }


  res.status(200).json({
    ok: true,
    msg: 'Usuario ha iniciado sesión',
    uid: user.id,
    name: user.name,
  });


};

usuarioLogic.obtenerUsuario = async (req,res) => {
  const usuario = await Usuario.findById(req.params.id)
  res.json(usuario)
};

usuarioLogic.crearUsuario = async (req,res) => {
  const { name, email, password } = req.body;

  const user = Usuario.findOne({ email });
  console.log(user);
  if(!user) {
    return res.status(400).json({
      ok: false,
      msg: 'El usuario ya existe',
    });
  }

  const dbUser = new Usuario(req.body);

  const salt = bcrypt.genSaltSync();
  dbUser.password = bcrypt.hashSync(password, salt);

  await dbUser.save();


  res.status(200).json({
    ok: true,
    msg: 'Se ha creado el usuario',
  })

};

usuarioLogic.editarUsuario = async(req,res) => {
  await Usuario.findByIdAndUpdate(req.params.id,req.body)
  res.json({text: 'usuario actualizado'})
};

usuarioLogic.eliminarUsuario = async(req,res) => {
  await Usuario.findByIdAndDelete(req.params.id)
  res.json({text: 'usuario eliminado'})
};


module.exports = usuarioLogic;
