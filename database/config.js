const mongoose= require('mongoose');


const dbConnection =async()=>{
  try {
    await mongoose.connect(process.env.dbConnection);
    console.log('se conecto esta mondaa');
    
  } catch (error) {
    console.log(errr);
    throw new Error('Error loco nada no se conecto');

  }
}


module.exports={
    dbConnection
}