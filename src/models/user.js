const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    Nombre:
    {
        type:String,
        required:true
    },
    
    Correo: {
        type:String,
        required:true
    },
    
    contraseña: {
        type:String,
        required:true
    },
    personalGroup: {
        type:String,
        default:null
    },
    

    groups:[],
    

    dateUserCreated:{
        type:Date,
        default:Date.now
    },

});

UserSchema.methods.encriptar = async (password) =>{
const salt = await bcrypt.genSalt(10);
const hash = bcrypt.hash(password,salt);
return hash;

}
UserSchema.methods.matchPassword = async function  (password){
return await bcrypt.compare(password,this.contraseña);
}


module.exports = mongoose.model('users', UserSchema);