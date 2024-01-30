const {Router} = require('express');
const { validarJwt } = require('../middlewares/validar-jwt');
const {getUsuariosDb} = require('../controllers/usuarios_controller');
const router=Router();



router.get('/',validarJwt,getUsuariosDb);

module.exports =router;