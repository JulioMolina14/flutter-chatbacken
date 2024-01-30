const mensaje = require('../models/mensaje.js');
const Usuario=require('../models/usuarios.js');

const usuarioOn= async(uid='')=>{
  const usuario = await Usuario.findById(uid);
  usuario.online=true;


  await usuario.save();

  return usuario;
}

const usuarioOff= async(uid='')=>{
    const usuario = await Usuario.findById(uid);
    usuario.online=false;
    await usuario.save();

    return usuario;
  }

const grabarMensaje=async(payload)=>{
  
  try {
    const mensaje= new mensaje(payload);
    await mensaje.save();
    return true;
  } catch (error) {
    return false;
  }
}


module.exports={
    usuarioOn,
    usuarioOff,
    grabarMensaje
}