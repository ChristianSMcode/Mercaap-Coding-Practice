const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const userA = require('../models/user');

passport.use(new LocalStrategy({
    usernameField:'Correo',
    passwordField:'contraseña'


},async (username,password,done)=>{
 const userExist = await  userA.findOne({Correo:username});
 if(!userExist){
        return done(null,false,{message:'El correo y/o la contraseña son incorrectos'});
 }else{
   const match = await userExist.matchPassword(password);
   if(match){
       return done(null,userExist)
   }else{
       return done(null,false,{message:'El correo y/o la contraseña son incorrectos'})
   }
 }
}));



passport.serializeUser((user,done)=>{
    done(null,user.id)
});
passport.deserializeUser((id,done)=>{
    userA.findById(id, (err,user)=>{
        done(err,user);
    })
})