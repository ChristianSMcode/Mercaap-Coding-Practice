const express = require('express');
const router = express.Router();
const path = require('path')
const fs = require('fs')

const multer = require('multer');
const {isAuthenticated} = require('../helpers/auth')

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, '../public/img/userUp/'),'uploads/');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});

const upload = multer({  
    storage: storage,
})

const productPriceSmartList= require('../models/product-main-list');
const user = require('../models/user')

router.get('/',(req,res)=>{
    console.log('en linea');
    let errors = req.flash('errors')
    let success = req.flash('msgSuccess')
    let eWarn = req.flash('err_msg')
    
    console.log(errors)
    res.render('index.html',{title:"Mercapp",errors,success,eWarn});
});

router.get('/principal-pricesmart',isAuthenticated, (req,res)=>{
    
    console.log('Pagina principal on price smart');

   
     
    res.render('principal-price-smart.html',{title:"Mercapp-priceSmart"});
    
    
});

router.get('/principal-pricesmart/get', isAuthenticated, async (req,res)=>{
    
    
    let product =  await productPriceSmartList.find({user:req.user.id,productName:{$ne:'manzana'}});
    console.log(product)
     
    res.send(product);
    
    
});




router.get('/delete/:name',isAuthenticated, async (req,res)=>{
    const {name} = req.params;
    try{
        const dir = await productPriceSmartList.find({user:req.user.id,productName:name},{binData:1});
        const filePath = path.join(__dirname, `../public/img/userUp/${dir[0].binData.filename}`);
        fs.unlinkSync(filePath)
        res.status(201).send({ message: "Image deleted" });
    }catch(e){
        res.send('No existe una imagen vinculada al archivo a eliminar');
    }


    await productPriceSmartList.deleteOne({productName:name});
    
    
    })


router.post('/principal-pricesmart/add',isAuthenticated,async (req,res,next)=>{
   res.send('ok');
   if(req.body.productName < 1){next}
   else{
       const priceSmartList = new productPriceSmartList(req.body);
        priceSmartList.user = req.user.id;
        await priceSmartList.save();};
   
    
});

router.post('/update/:name',isAuthenticated, async (req,res)=>{
    const {name} = req.params;
    let marca1 = req.body.marca;
    const cuantity1 = req.body.cuantity;
    const category1 = req.body.category;

    res.send('ok')
    await productPriceSmartList.updateOne({user:req.user.id,productName:name},{$set:{marca:marca1,cuantity:cuantity1,category:category1}});
    
});
router.post('/update-status/:name',isAuthenticated, async (req,res)=>{
    const {name} = req.params;
    let status = req.body.buyStatus;
    

    res.send('ok')
    
    await productPriceSmartList.updateOne({user:req.user.id,productName:name},{$set:{buyStatus:status}});
    await productPriceSmartList.updateOne({productName:'manzana'},{$set:{buyStatus:status}});
});


router.post('/update-img/:name',upload.single('image'),isAuthenticated, async (req,res)=>{
    const {name} = req.params;
    let file = req.file;

    try{
        const dir = await productPriceSmartList.find({user:req.user.id,productName:name},{binData:1});
        const filePath = path.join(__dirname, `../public/img/userUp/${dir[0].binData.filename}`);
        fs.unlinkSync(filePath)
        res.status(201).send({ message: "Image deleted" });
    }catch(e){
        res.send('No existe una imagen vinculada al archivo a eliminar');
    }

    await productPriceSmartList.updateOne({user:req.user.id,productName:name},{$set:{binData:file}});
    
});

router.get('/getImage/:name',isAuthenticated, async (req,res)=>{
    const {name} = req.params;

    const imgPath = await productPriceSmartList.find({user:req.user.id,productName:name},{binData:1,productName:1});
    const manzana = await productPriceSmartList.find({productName:'manzana'},{binData:1,productName:1});
    imgPath.push(manzana[0])
    res.send(imgPath)
})

router.get('/compra-init',isAuthenticated, async (req,res)=>{
        let list = await productPriceSmartList.find({user:req.user.id,buyStatus:true});
        const manzana = await productPriceSmartList.find({productName:'manzana'})
       if(manzana[0].buyStatus == true){
            list.push(manzana[0])
       }
        
        
        res.send(list);
});

router.get('/users/salir',isAuthenticated,(req,res)=>{
    req.logout();
    res.redirect('/')
})

router.get('/unirse-invitar', isAuthenticated, (req,res)=>{
    let warning = req.flash('warning')
    let joined = req.flash('joined')
    res.render('unirse-invitar.html',{title:"Mercapp",warning,joined})
});

router.get('/obtener-Codigo',isAuthenticated, async (req,res)=>{
   
     const id  = req.user.id;
    const codigo = await user.find({_id:id},{personalGroup:1});
    res.send(codigo[0]);
    
    
});

router.post('/join-group',isAuthenticated, async (req,res)=>{
    
    let warning = [];
    let joined = [];
    const groupExist = await user.findOne({ personalGroup: req.body.code })
    const userGroup = await user.findOne({_id:req.user.id})
    
    if (groupExist) {
        
        if(userGroup.personalGroup != groupExist.personalGroup){
            if(userGroup.groups.includes(groupExist.personalGroup)){
                warning.push({text:'Ya estás en este grupo'})
                req.flash('warning',warning)
            }else{
                joined.push({text:`Te has unido al grupo de ${groupExist.Nombre}`});
                req.flash('joined',joined);
                const id = req.user.id;
                await user.updateOne({ _id: id }, { $push: { groups: req.body.code } })
            }
            
        }
        else{
            warning.push({text:'No puedes unirte a tu propio grupo'})
            req.flash('warning',warning)
        }
        
    }
    else{
        warning.push({text:'El grupo no existe'})
        req.flash('warning',warning);
    }
    res.redirect('/unirse-invitar');
});

router.get('/obtener-grupos', isAuthenticated, async (req, res) => {
    const userGroup = await user.findOne({ _id: req.user.id }, { groups: 1 })
    const arrGroup = [];

    for (group of userGroup.groups) {
        const userG = await user.findOne({ personalGroup: group })

        arrGroup.push(userG.Nombre)

    }

    res.send(arrGroup)
})





router.get('/price-smart-compra-Iniciada',isAuthenticated,(req,res)=>{
    console.log('compra pricesmart');
    res.render('price-smart-compra-iniciada.html',{title:"Mercapp"});
});


module.exports = router;