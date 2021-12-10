const express = require('express');
const app = express();
const path = require('path');
const { Script } = require('vm');
const mongoose = require('mongoose');
const morgan = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');


//settings

require('./config/passport')

app.set('port',3000);
app.set('view engine','ejs');
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname + '/views'));
//escucha servidor

app.listen(app.get('port'),(req,res)=>{
    console.log("server on port", app.get('port'));
   })
   

//midlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(session({
    secret:'moderador',
    resave: true,
    saveUninitialized:true
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


//static files

app.use(express.static(path.join(__dirname + '/public'))); 


//conection to db
mongoose.connect('mongodb://192.168.1.14:27017/mercapp')
.then(db =>{
console.log('db connected')
})
.catch(err=>{
    console.log(err);
})

//global variables

app.use((req,res,next)=>{
    res.locals.error = req.flash('error');
    next();
})
//routes

app.use(require('./routes/index'));
app.use(require('./routes/users'));
