
const {io} = require('../index');
const {usuarioOff,usuarioOn, grabarMensaje}=require('../controllers/socket_base')
const {comprobarJWT}= require('../helpers/jwt')

io.on('connection', client => {
  console.log('Cliente conectado');
  // /* console.log(client.handshake.headers['x-token']); */
  const[valido,uid]=comprobarJWT(client.handshake.headers['x-token']);
  /* console.log(valido,uid); */
  /* Cliente conectado */
  if(!valido){return client.disconnect()}
  
  usuarioOn(uid);

  /* cliente con JWT  */
  client.on('disconnect', () => { 
     console.log('Cliente desconectado'); 
    usuarioOff(uid);
  });

  client.join(uid);

  client.on('mensaje-personal', async(payload)=>{
    console.log(payload);
    await rabarMensaje(payload);
    io.to(payload.para).emit('mensaje-personal',payload)
  })

  
  


 /*  client.on('mensaje emitido', (payload) => {
    console.log(`nombre: ${payload['nombre']}, apellido: ${payload['apellido']}`);
    io.emit('mensaje emitido2', { admin: 'numero mensaje' });
  }); */
});
