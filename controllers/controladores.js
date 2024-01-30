const { response } = require("express");
const encriptar = require('bcryptjs')

const Usuario=require('../models/usuarios');
const { jsonweb } = require("../helpers/jwt");



const crearUsuario= async(req,res=response)=>{


     const{email,contrasena}=req.body;

     try {
            
        const existeEmail= await Usuario.findOne({email});
        if(existeEmail){
            return res.status(400).json({
                ok:false,
                mensaje:"el  correo ya esta registrado"
            })
        }

        const usuario = new Usuario(req.body); 

        //encriptar contraseña
        const salt= encriptar.genSaltSync();
        usuario.contrasena=encriptar.hashSync(contrasena,salt);
        await usuario.save();

         const token= await jsonweb(usuario.id);   

        
        res.json({
        ok:true,
        usuario,
        token
      });
     } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            mensaje:"mal loco ya esta esa vuelta"
        })
     }

     

}

const loginUser=async(req,res=response)=>{
    const{email,contrasena}=req.body;
    try {
        
     const usuarioDb= await Usuario.findOne({email});
     if(!usuarioDb){
        return res.status(404).json({
            ok:false,
            msg:'Email no encontrado'
        
        });
     }
    

     /* validar contraseña */
     const valContra=encriptar.compareSync(contrasena,usuarioDb.contrasena);

     if(!valContra){
        return res.status(400).json({
            ok:false,
            msg:'la contraseña no es valida'
        
        });
     }

     /* generar JWT */
     const token = await jsonweb(usuarioDb.id);
     res.json({
        ok:true,
        usuario:usuarioDb,
        token
      });

    
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }


}


const renewToken=async(req,res=response)=>{
    const uid=req.body; 

    const token = await jsonweb(uid);

    const usuario=await Usuario.findOne(uid)
    res.json({
        ok:true,
        usuario,
        token
      });
}

module.exports={
    crearUsuario,
    loginUser,
    renewToken
}