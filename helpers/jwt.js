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


module.exports={
    jsonweb
}