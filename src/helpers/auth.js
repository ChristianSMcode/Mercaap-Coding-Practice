const helpers = {};

helpers.isAuthenticated = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('errors',{text:'No autorizado,ingresa a tu cuenta para continuar'})
    res.redirect('/')
    
};

module.exports = helpers;