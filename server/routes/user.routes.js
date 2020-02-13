const express=require('express')
const router=express.Router()
const userController=require('../controllers/user.controller')
const token = require('../middleware/token');

//POST method is used to submit an entity to the specified resource
//User register using post http method
router.post('/register',userController.register)
//User login using post http method
router.post('/login',userController.login)
//Forgot password using post http method
router.post('/forgotpassword',userController.forgotpassword)
//Post http method for reset password
router.post('/resetpassword',token.verify, userController.resetPassword)

module.exports=router;