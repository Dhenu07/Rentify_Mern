const express=require('express')
const router=express.Router();
// const JWT=require('../JWT/JWT');
const AuthController=require('../Controller/AuthController');
router.post('/signup', AuthController.signup);
router.post('/login',AuthController.login);
router.get('/profile/:userId',AuthController.profile)
router.post('/logout',AuthController.logout);
module.exports=router;