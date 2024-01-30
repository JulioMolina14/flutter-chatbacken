const mensaje=require('../models/mensaje')

const obtenetChat=async(req,res)=>{
  
    const miId=req.uid;
    const mensajesDe=req.params.de; 

    const lastmensaje= await mensaje.find({
        $or:[{de:miId,para:mensajesDe},{de:mensajesDe,para:miId}]
    }).sort({createAt:'desc'}).limit(30);
    res.json({
        ok:true,
        mensajes:lastmensaje
    })
}


module.exports={
    obtenetChat
}