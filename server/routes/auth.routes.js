const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, validateToken, login } = require('../controllers/auth.controller');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.post('/new', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
], createUser);

router.post('/', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').isLength({ min: 6 }),
    validateFields
] ,login);

// Validar y revalidar token
router.get('/renew', validateJWT,validateToken);




module.exports = router;
