const express=require('express')
const router=express.Router()
const userController=require('../controllers/user.controller')

//POST method is used to submit an entity to the specified resource
//User register using post http method
router.post('/register',userController.register)
//User login using post http method
router.post('/login',userController.login)
 
module.exports=router;