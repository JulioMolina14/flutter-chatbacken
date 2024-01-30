const jwt = require('jsonwebtoken');




const jsonweb= (uid)=>{

    
    
    return new Promise((resolve,reject)=>{
       
      
    const payload ={
        uid
    };

    jwt.sign(payload,process.env.JWT,{
        expiresIn:'48h',

    },(err,token)=>{
        if(err){
          reject('no se creo el token');
        }else{
           resolve(token)
        }
    }
    )


    });
     
}

const comprobarJWT=(token='')=>{
  try {
    const {uid}=jwt.verify(token,process.env.JWT);
    
    return [true,uid];
  } catch (error) {
    return [false,null];
    }
  }




module.exports={
    jsonweb,
    comprobarJWT
    
}