const { response } = require("express");

const Usuario = require('../models/usuarios')

const getUsuariosDb= async (req,res=response)=>{
   
  const desde= Number(req.query.desde) ||0;
  const UsuariosDb= await Usuario.find({_id:{$ne:req.uid}}).sort('-online').limit(20); 
  return res.json({
    ok:true,
    usuarios: UsuariosDb,
    
  })
}


module.exports={
    getUsuariosDb
}