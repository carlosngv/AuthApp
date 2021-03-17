const { Schema, model } = require("mongoose");

const usuarioSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
  }
);

module.exports = model('Users', usuarioSchema)
