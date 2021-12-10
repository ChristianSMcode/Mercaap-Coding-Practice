const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const userA = require('../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs');


router.post('/users/signin', passport.authenticate('local',{
    badRequestMessage: 'Complete ambos campos',
    successRedirect:'/principal-pricesmart',
    failureRedirect:'/',
    failureFlash:true,
}));

router.post('/users/signup',async (req,res)=>{
    const {Nombre,Correo,contraseña,confirmar_contraseña} = req.body
    
    let errors = [];
    let success =[];
    if(Nombre.length <= 0){
        errors.push({text:'Ingrese un Nombre'})
    }
    if(Correo.length <= 0){
        errors.push({text:'Ingrese un Correo'})
    }
    
    if(contraseña != confirmar_contraseña){
        errors.push({text:'Las contraseñas no coinciden'})
    }
    if(contraseña.length < 4){
        errors.push({text:'La contraseña debe contener mas de 4 caracteres'})
    }
    if(errors.length>0){
        
        req.flash('errors',errors)
        res.redirect('/')

        
    }else{
     const userEmail = await userA.findOne({Correo:Correo})
     if(userEmail){
         req.flash('err_msg','El email ya está registrado')
         res.redirect('/')
     }else{
      let newUser = new userA({Nombre,Correo,contraseña})
      newUser.contraseña = await newUser.encriptar(contraseña);
      let number = 3 * Math.random() * 10000;
      let numberString = number.toString();
      numberString = numberString.substring(0, 10);
      numberString = numberString.replace(".",'m');
      numberString = numberString.replace("1",'A');
      numberString = numberString.replace("5",'S');
      newUser.personalGroup = numberString;
      await newUser.save();
      
      success.push({text:'Registrado Correctamente'})
      req.flash('msgSuccess',success);
      res.redirect('/')
        }
    }

    
    
    
    
    
    
    
})

module.exports = router;