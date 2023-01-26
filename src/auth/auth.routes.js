const express = require('express');
const router = express.Router();

const { postLogin, postSignup } = require('./auth.controllers');

router.post('/signup', postSignup);
router.post('/login', postLogin);


module.exports = router;