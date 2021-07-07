const express = require('express');
const userController = require('../controllers/UserController');

const router = express.Router();
module.exports = router ;
router.post('/registerUser',userController.registerUser);
