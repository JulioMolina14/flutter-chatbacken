const {Schema, model} = require('mongoose');



const UsuariosSchema =Schema({
   nombre:{
    type:String,
    required:true
   },
   email:{
    type:String,
    required:true,
    unique:true
   },
   contrasena:{
    type:String,
    required:true
   },
   online:{
        type:Boolean,
        default:false
   }

});

UsuariosSchema.method('toJSON',function(){
 const {__v,_id,contrasena, ...object}=this.toObject();
 object.uid=_id;
 return object;
});


module.exports=model('Usuario',UsuariosSchema)