/* function previewFile() {
    const preview = document.querySelector('img');
    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();
  
    reader.addEventListener("load", function () {
      // convert image file to base64 string
      preview.src = reader.result;
    }, false);
  
    if (file) {
      reader.readAsDataURL(file);
    }
  }
 */
window.addEventListener('load', async ()=>{

    let response = await fetch('/compra-init');
    response.json().then((res)=>{
        console.log(res);

        res.forEach(producto=>{
            
            const li = document.createElement('li');
            const form = document.createElement('form')
            const div = document.createElement('div');
            const div2 = document.createElement('div');
            const optionCont = document.createElement('div')
            const img = document.createElement('img');
            const input = document.createElement('input');
            const camera = document.createElement('i');
            const galeria = document.createElement('i')
            const div3 = document.createElement('div');
            const h3 = document.createElement('h3');
            h3.innerText = producto.productName.substring(0, 1).toUpperCase() + producto.productName.substring(1);
            const div4 = document.createElement('div');
            const text1 = document.createElement('h5');
            const text2 = document.createElement('h5');
            const text3 = document.createElement('h5');
            const text4 = document.createElement('h5');
            const span1 = document.createElement('span');
            span1.innerText = 'Cantidad:';
            const span2 = document.createElement('span');
            span2.innerText = 'Marca:';
            const span3 = document.createElement('span');
            span3.innerText = 'Precio:';
            const span4 = document.createElement('span');
            span4.innerText = 'Pasillo:';
            const span5 = document.createElement('span');
            if(producto.cuantity == null || producto.cuantity == ''){
                span5.innerText = '----'
            }else{
                span5.innerText = producto.cuantity;
            }
            
            const span6 = document.createElement('span');
            if(producto.marca == null || producto.marca == ''){
                span6.innerText = '----'
            }else{
                span6.innerText = producto.marca;
            }
            
            const span7 = document.createElement('span');
            if(producto.price == null || producto.price == ''){
                span7.innerText = '----'
            }else{
                span7.innerText = producto.price;
            }
            const span8 = document.createElement('span');
            if(producto.location == null || producto.location == ''){
                span8.innerText = '----'
            }else{
                span8.innerText = producto.location;
            }
            
            const hr = document.createElement('hr');
            const div5 = document.createElement('div');
            const button1 = document.createElement('button');
            const button2 = document.createElement('button');
            const i1 = document.createElement('i');
            const i2 = document.createElement('i');

           
           
            
            


            div.classList.add('card', 'text-center');
            /* div.classList.add(`${producto.category}`) */
            li.classList.add(`${producto.category}`)
            div.setAttribute('style','width: 18rem;');

            if(producto.category == 'frutasVegetales'){
                div.style.background = 'radial-gradient(circle,rgba(255, 255, 255, 0.31416316526610644) 7%,rgb(191 255 220) 100%)'
                
            }
            else if(producto.category == 'congelados'){
                div.style.background = 'radial-gradient(circle,rgba(255, 255, 255, 0.31416316526610644) 7%,rgb(164 181 245) 100%)'
                
            }
            else if(producto.category == 'granos'){
                div.style.background = 'radial-gradient(circle,rgba(255, 255, 255, 0.31416316526610644) 7%,rgb(240 245 164) 100%)'
                
            }
            else if(producto.category == 'aseo'){
                div.style.background = 'radial-gradient(circle,rgba(255, 255, 255, 0.31416316526610644) 7%,rgb(243 165 237) 100%)'
                
            }
            else if(producto.category == 'tecnología'){
                div.style.background = 'radial-gradient(circle,rgba(255, 255, 255, 0.31416316526610644) 7%,rgb(189 185 181) 100%)'
                
            }
            else if(producto.category == 'otros'){
                div.style.background = 'radial-gradient(circle,rgba(255, 255, 255, 0.31416316526610644) 7%,rgba(255, 220, 191, 1) 100%)'
                
            }
            else{
                console.log('error')
            }


            galeria.classList.add('fas', 'fa-file-image','ms-4');
            
            div2.classList.add('imagen');
            input.setAttribute('type','file');
            input.setAttribute('accept','image/*')
            
            
            /* input.setAttribute('onchange','previewFile()'); */
          
            input.style.display = 'none';
            camera.addEventListener('click',()=>{
                input.setAttribute('capture','user');
                const cargar = div2.childNodes;
                cargar[0].childNodes[0].click()
            })
            galeria.addEventListener('click',()=>{
                input.removeAttribute('capture');
                const cargar = div2.childNodes;
                cargar[0].childNodes[0].click()
            })
            img.setAttribute('src','img/frutas.png');
            img.setAttribute('alt','frutas');
            img.classList.add('card-img-top');
            img.classList.add(`${producto.productName}`)
            
            const obtainImg = async()=>{
                 try{
                    await fetch(`/getImage/${producto.productName}`).then(res=>res.json().then(res=>{
                        img.setAttribute('src',`img/userUp/${res[0].binData.originalname}`)
                    })) 
                 }catch(e){
                     console.log(`aun no hay imagenes para ${producto.productName}`)
                 }
                
                
                
                
            }
           /*  div.addEventListener('onloadend',()=>{
                obtainImg();
            }) */
            div.onload = obtainImg();
            
            form.appendChild(input)
            form.setAttribute('enctype',"multipart/form-data")

            input.onchange = async (evt) => {
                const [file] = input.files;
                const form = div2.getElementsByTagName('form')[0];
                
                
                
                if (file) {
                    img.src = URL.createObjectURL(file);
                    let formData = new FormData(form)
                    formData.append('image',file);
                    console.log(formData.get('image'))
                    
                    

                    await fetch(`/update-img/${producto.productName}`, {
                        method: 'POST',
                        
                        body:formData,
                        
                    }).catch(err=>console.log(err))
                    


                }
            }
            camera.classList.add('fas', 'fa-camera','mr-4');
            div3.classList.add('card-body');
            h3.classList.add('card-title');
            div4.classList.add('datos-container');
            span1.classList.add('span-dato');
            span2.classList.add('span-dato');
            span3.classList.add('span-dato');
            span4.classList.add('span-dato');
            span5.classList.add('span-num');
            span6.classList.add('span-num');
            span7.classList.add('span-num');
            span8.classList.add('span-num');
            div5.classList.add('d-flex', 'justify-content-around');
            button1.classList.add('btn', 'btn-primary');
            button1.setAttribute('type','button');
            button2.classList.add('btn', 'btn-primary');
            button2.setAttribute('type','button');
            i1.classList.add('far', 'fa-check-circle', 'fa-2x');
            i1.addEventListener('click',()=>{
                fetch(`/update-status/${producto.productName}`,{
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      buyStatus:false
                    })
                  }).then(res => {
                    res.text().then(res => { console.log(res) });
                  })
                  li.remove();
            })
            i2.classList.add('far', 'fa-times-circle', 'fa-2x');
            i2.addEventListener('click',()=>{
                fetch(`/update-status/${producto.productName}`,{
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      buyStatus:false
                    })
                  }).then(res => {
                    res.text().then(res => { console.log(res) });
                  })
                  li.remove();
            })
            input.classList.add('inputImg')

            button1.appendChild(i1);
            button2.appendChild(i2);
            div5.appendChild(button1);
            div5.appendChild(button2);

            text1.appendChild(span1);
            text1.appendChild(span5);

            text2.appendChild(span2);
            text2.appendChild(span6);

            text3.appendChild(span3);
            text3.appendChild(span7);

            text4.appendChild(span4);
            text4.appendChild(span8);

            div4.appendChild(text1);
            div4.appendChild(text2);
            div4.appendChild(text3);
            div4.appendChild(text4);

            div3.appendChild(h3);
            div3.appendChild(div4);
            div3.appendChild(hr);
            div3.appendChild(div5);

            div2.appendChild(form);
            div2.appendChild(img)
            div.appendChild(div2);
            optionCont.appendChild(camera);
            optionCont.appendChild(galeria);

            
            div.appendChild(optionCont)
            div.appendChild(div3)
            li.appendChild(div)

            const ul = document.querySelector('.lista');

            ul.appendChild(li);





        

        })

    })
    
   

});

const fruVe = document.querySelector('.fv');
const conge = document.querySelector('.cong');
const gran = document.querySelector('.gran');
const as = document.querySelector('.as');
const tec = document.querySelector('.tec');
const otr = document.querySelector('.otr');
const todo = document.querySelector('.todo');

const ul = document.querySelector('.lista')
    let liArr = ul.childNodes
    liArr[0].remove()


fruVe.addEventListener('click',()=>{
   
   
   liArr.forEach(cardli =>{
       if(cardli.className != 'frutasVegetales'){

        cardli.setAttribute('hidden','true')
           
       }else if(cardli.className == 'frutasVegetales'){
        cardli.removeAttribute('hidden')
       }
       
       
   })
})



conge.addEventListener('click',()=>{
    
    
    liArr.forEach(cardli =>{
        if(cardli.className != 'congelados'){
 
         cardli.setAttribute('hidden','true')
            
        }else if(cardli.className == 'congelados'){
            cardli.removeAttribute('hidden')
           }
        

    })
 })

 gran.addEventListener('click',()=>{
    
    
    liArr.forEach(cardli =>{
        if(cardli.className != 'granos'){
 
         cardli.setAttribute('hidden','true')
            
        }else if(cardli.className == 'granos'){
            cardli.removeAttribute('hidden')
           }
        

    })
 })

 as.addEventListener('click',()=>{
    
    
    liArr.forEach(cardli =>{
        if(cardli.className != 'aseo'){
 
         cardli.setAttribute('hidden','true')
            
        }else if(cardli.className == 'aseo'){
            cardli.removeAttribute('hidden')
           }
        

    })
 })
 tec.addEventListener('click',()=>{
    
    
    liArr.forEach(cardli =>{
        if(cardli.className != 'tecnología'){
 
         cardli.setAttribute('hidden','true')
            
        }else if(cardli.className == 'tecnología'){
            cardli.removeAttribute('hidden')
           }
        

    })
 })
 otr.addEventListener('click',()=>{
    
    
    liArr.forEach(cardli =>{
        if(cardli.className != 'otros'){
 
         cardli.setAttribute('hidden','true')
            
        }else if(cardli.className == 'otros'){
            cardli.removeAttribute('hidden')
           }
        

    })
 })

 todo.addEventListener('click',()=>{
    
    
    liArr.forEach(cardli =>{
        cardli.removeAttribute('hidden')

    })
 })