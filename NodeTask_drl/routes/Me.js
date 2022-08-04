const express = require('express')
const UserModel = require('../model/UserModel')
const router = express.Router()

router.use(express.json());

router.get('/',async(req,res) => {
   const data = await UserModel.findById(req.id).select('name email')
   if(data){
    res.status(200).send({  data: data });
   }
   else{
    res.status(400).send({  message: 'Somthing went wrong in token!!' });
   }
})

module.exports = router