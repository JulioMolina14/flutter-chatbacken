const {Router} = require('express');
const {crearUsuario, loginUser, renewToken}=require('../controllers/controladores');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validaciones');
const { validarJwt } = require('../middlewares/validar-jwt');
const router=Router();

router.post('/new',[
  check('nombre','El nombre es obligatorio').not().isEmpty(),
  check('email','El Email es obligatorio').isEmail(),
  check('contrasena','La contraseña es obligatoria').not().isEmpty(),
  validarCampos
],crearUsuario);


router.post('/',[
    check('email','el email tiene que ser obligatorio'),
    check('contrasena','La contraseña tiene que ser obligatoria').not().isEmpty()
],loginUser);


router.get('/renew',validarJwt,renewToken);

module.exports =router;