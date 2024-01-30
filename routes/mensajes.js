const {Router} = require('express');
const { validarJwt } = require('../middlewares/validar-jwt');
const router=Router();



router.get('/:de',validarJwt,);

module.exports =router;