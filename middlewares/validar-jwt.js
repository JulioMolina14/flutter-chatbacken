const jwt= require('jsonwebtoken')



const validarJwt=(req,res,next)=>{
  /* leer eltoken */
  const token=req.header('x-token');
   if(!token){
    return res.status(401).json({
        ok:false,
        mensaje:'no existe token en la peticion'
    });
   }
   /* si eltocken existe */
  /* console.log(token); */
  try {
    const {uid}=jwt.verify(token,process.env.JWT);
    req.uid=uid;
    next();
  } catch (error) {
    return res.status(401).json({
        ok:false,
        mensaje:'Token no es valido'
    })
  }
  
}




module.exports={
    validarJwt
}