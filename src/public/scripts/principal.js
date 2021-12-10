function CheckSpace(event)
{
   if(event.which ==32)
   {
      event.preventDefault();
      return false;
   }
}

const agregarListaFinal = (data) => {
  const nombreProducto = data[0];
  const marcaProducto = data[1];
  const precioProducto = data[2];
  const cantidadProducto = data[3];
  /* crear elementos */
  const lista1 = document.getElementById('lista1');

  const liElement = document.createElement('li');
  const nombre = document.createElement('h3');
  const icoEdit = document.createElement('i');
  /* event listenner ico edit */
  icoEdit.addEventListener('click', () => {
    console.log(1)

    const li = icoEdit.parentElement.parentElement;
    const hijos = li.childNodes;
    console.log(hijos)
    const nombrePro = hijos[0].childNodes;
    nombrePro[1].setAttribute('contenteditable', 'true');
    nombrePro[1].setAttribute('spellcheck', 'false');
    hijos[1].setAttribute('contenteditable', 'true');
    hijos[1].setAttribute('spellcheck', 'false');
    hijos[2].setAttribute('contenteditable', 'true');
    hijos[2].setAttribute('spellcheck', 'false');
    const cantPro = hijos[3].childNodes;
    cantPro[0].setAttribute('contenteditable', 'true');
    cantPro[0].setAttribute('spellcheck', 'false');

    icoEdit.addEventListener('click', () => {
      nombrePro[1].setAttribute('contenteditable', 'false');
      hijos[1].setAttribute('contenteditable', 'false');
      hijos[2].setAttribute('contenteditable', 'false');
      cantPro[0].setAttribute('contenteditable', 'false');

    })

  })
  const marca = document.createElement('h3');
  const precio = document.createElement('h3');
  const divElimCant = document.createElement('DIV');
  const canDel = document.createElement('h3');
  const delIco = document.createElement('i');
  /* delete event listenner */
  delIco.addEventListener('click', () => {
    liElement.remove();
  })
  const divNombreIco = document.createElement('DIV');
  /* clases elementos */
  liElement.classList.add("list-group-item", "d-flex", "primer-elemento", "ps-1", "pr-2");
  divNombreIco.classList.add("d-flex");
  

  precio.classList.add("text-center", 'ms-3');

  canDel.classList.add("text-center");
  delIco.classList.add("fas", "fa-trash-alt", "basura");
  marca.classList.add("text-center");
  marca.style.width = "65px";
  /* inyectar datos */

  marca.textContent = marcaProducto;
  precio.textContent = precioProducto;
  canDel.textContent = cantidadProducto;
  nombre.textContent = nombreProducto;
  /* organizar elementos */
  divElimCant.appendChild(canDel);
  divElimCant.appendChild(delIco);
  
  divNombreIco.appendChild(icoEdit);
  divNombreIco.appendChild(nombre);
  liElement.appendChild(divNombreIco);
  liElement.appendChild(marca);
  liElement.appendChild(precio);
  liElement.appendChild(divElimCant);
  /* iyectarAlHtml */
  lista1.appendChild(liElement);


}




const agregarCarrousel = (product) => {
  const carouselInner = document.querySelector(".carousel-inner");

  /* crear elementos carrusel */
  const slideContainer = document.createElement("DIV");
  const h1 = document.createElement("h1");
  const ico = document.createElement("i");
  const containerInput = document.createElement("DIV");
  const input1 = document.createElement("input");
  const input2 = document.createElement("input");
  const buttonContainer = document.createElement("DIV");
  const confirm = document.createElement("button");
  const decline = document.createElement("button");
  const confirmIco = document.createElement("i");
  const declineIco = document.createElement("i");
  //nuevos elementos iconos

  const divCont1 = document.createElement('div');
  divCont1.classList.add('container-class','mt-3','mb-2')
  const divCont11 = document.createElement('div');
  divCont11.classList.add('imagen','frutasVegetales')
  const divCont12 = document.createElement('div');
  divCont12.classList.add('imagen','congelados')
  const divCont13 = document.createElement('div');
  divCont13.classList.add('imagen','granos')
  const divCont2 = document.createElement('div');
  divCont2.classList.add('container-class','mt-3','mb-3')
  const divCont21 = document.createElement('div');
  divCont21.classList.add('imagen','aseo')
  const divCont22 = document.createElement('div');
  divCont22.classList.add('imagen','tecnología')
  const divCont23 = document.createElement('div');
  divCont23.classList.add('imagen','otros')

  const imgElement1 = document.createElement('img');
  imgElement1.setAttribute('src','img/frutasVegetales.png');
  imgElement1.setAttribute('alt','frutasVegetales');
  
  const imgElement2 = document.createElement('img');
  imgElement2.setAttribute('src','img/congelados.png');
  imgElement2.setAttribute('alt','congelados');
  const imgElement3 = document.createElement('img');
  imgElement3.setAttribute('src','img/granos.png');
  imgElement3.setAttribute('alt','granos');
  
  const imgElement4 = document.createElement('img');
  imgElement4.setAttribute('src','img/aseo.png');
  imgElement4.setAttribute('alt','aseo');
  const imgElement5 = document.createElement('img');
  imgElement5.setAttribute('src','img/tecnología.png');
  imgElement5.setAttribute('alt','tecnología');
  const imgElement6 = document.createElement('img');
  imgElement6.setAttribute('src','img/otros.png');
  imgElement6.setAttribute('alt','otros');
  setTimeout(()=>{
    imgElement6.parentElement.classList.add('selected')
  },50)
  

  const eventArr = [divCont11,divCont12,divCont13,divCont21,divCont22,divCont23]

  eventArr.forEach((category)=>{
      category.addEventListener('click',()=>{
        /* let elemento = category.firstChild;
        elemento.parentElement.classList.add('selected') */
        
        
        eventArr.forEach((state)=>{
            if(state.classList.contains('selected')){
                    state.classList.remove('selected')
            }

        })
        category.classList.toggle('selected');
       
        
        
      })
  })

  divCont11.appendChild(imgElement1);
  divCont12.appendChild(imgElement2);
  divCont13.appendChild(imgElement3);

  divCont21.appendChild(imgElement4);
  divCont22.appendChild(imgElement5);
  divCont23.appendChild(imgElement6);

  divCont1.appendChild(divCont11);
  divCont1.appendChild(divCont12);
  divCont1.appendChild(divCont13);

  divCont2.appendChild(divCont21);
  divCont2.appendChild(divCont22);
  divCont2.appendChild(divCont23);

  

  const carouselItem = document.createElement("DIV");

  /* añadir clases elemento carusel */
  carouselItem.classList.add("carousel-item");
  carouselItem.classList.add(product);
  slideContainer.classList.add("container-slide");
  h1.classList.add("producto");
  h1.textContent = product.substring(0, 1).toUpperCase() + product.substring(1);
  ico.classList.add("fas", "fa-shopping-cart", "fa-2x", "proIco",'mt-3');
  containerInput.classList.add("container-input",'mt-4');
  

  input1.setAttribute("type", "text");
  input1.classList.add("cantidad1");
  input1.setAttribute("placeholder", "Cantidad");
  input2.classList.add("marca1",'ms-1');
  input2.setAttribute("type", "text");
  input2.setAttribute("placeholder", "Marca");
  buttonContainer.classList.add("container-button");
  
  confirm.classList.add("confirmar");
  decline.classList.add("cancelar");
  confirmIco.classList.add("far", "fa-check-circle", "fa-2x");
  declineIco.classList.add("far", "fa-times-circle", "fa-2x");
  /* organizacion */
  confirm.appendChild(confirmIco);
  
  
  
  confirm.addEventListener('click',()=>{
    const cantidad = input1.value;
    const marca = input2.value;
    const selected = document.querySelector('.selected')
    const elemento = selected.firstChild;
    const category1 =  elemento.getAttribute('alt');
    

    fetch(`/update/${product}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cuantity: cantidad,
        marca: marca,
        category: category1,
      })
    }).then(res => {
      res.text().then(res => { console.log(res) });
    })
  })



  confirm.addEventListener("click", agregarIndividual = () => {
    const productoEspecifico = document.querySelector(`.${product}`);
    $("#carouselExampleControlsNoTouching").carousel("next");
    console.log(productoEspecifico);
    setTimeout(() => {
      productoEspecifico.remove();
      const cantidadDeItems = document.querySelector('.carousel-inner').childElementCount;
      if (cantidadDeItems == 0) {
        const segundoContainer = document.getElementById('segundo-container');
        segundoContainer.style.display = 'block';
        segundoContainer.childNodes[3].childNodes[0].setAttribute('href', 'price-smart-compra-Iniciada');
        segundoContainer.childNodes[1].childNodes[0].setAttribute('href', 'principal-vaquita');
        console.log('no hay mas elementos');
        const carruselDelete = document.getElementById('carouselExampleControlsNoTouching');
        carruselDelete.style.animation = 'salida 0.7s forwards';
        carruselDelete.textContent = 'No hay mas elementos';
        carruselDelete.addEventListener('animationend', () => {
          carruselDelete.remove();
        })                                                                  /*  importante  */
      }

    }, 600);
    let valorCant = input1.value;
    let valorMarca = input2.value;
    let producto = product;
    let precio = undefined;
    if (valorMarca == "") {
      valorMarca = "----";
    }
    if (valorCant == "") {
      valorCant = "----"
    }
    if (precio == undefined) {
      precio = "----";
    }
    /*  console.log(valorCant, valorMarca, producto); */
    const datos = [producto, valorMarca, precio, valorCant];
    agregarListaFinal(datos);
    /* console.log(datos); */

  });
  decline.appendChild(declineIco);
  decline.addEventListener("click", () => {
    console.log("cancelado");
    const productoEspecifico = document.querySelector(`.${product}`);
    $("#carouselExampleControlsNoTouching").carousel("next");
    console.log(productoEspecifico);
    setTimeout(() => {

      productoEspecifico.remove();
      const cantidadDeItems = document.querySelector('.carousel-inner').childElementCount;
      if (cantidadDeItems == 0) {
        const segundoContainer = document.getElementById('segundo-container');
        segundoContainer.style.display = 'block';
        segundoContainer.childNodes[3].childNodes[0].setAttribute('href', 'price-smart-compra-Iniciada');
        segundoContainer.childNodes[1].childNodes[0].setAttribute('href', 'principal-vaquita');

        const carruselDelete = document.getElementById('carouselExampleControlsNoTouching');
        carruselDelete.style.animation = 'salida 0.7s forwards';
        carruselDelete.textContent = 'No hay mas elementos';
        carruselDelete.addEventListener('animationend', () => {
          carruselDelete.remove();
        })                                                         /*  importante */
      }
    }, 600);
  });
  buttonContainer.appendChild(confirm);
  buttonContainer.appendChild(decline);
  
  containerInput.appendChild(input1);
  containerInput.appendChild(input2);
  slideContainer.appendChild(h1);
  slideContainer.appendChild(ico);
  slideContainer.appendChild(containerInput);
  slideContainer.appendChild(divCont1);
  slideContainer.appendChild(divCont2)
  slideContainer.appendChild(buttonContainer);
  carouselItem.appendChild(slideContainer);
  
  carouselInner.appendChild(carouselItem);
};
/* evento para mostrar y ocultar barra lateral */
const slideLateral = document.querySelector(".big-button");
const flecha = document.getElementById("flecha");
flecha.addEventListener("click", () => {
  const cstyle1 = getComputedStyle(slideLateral);
  const animacion1 = cstyle1.getPropertyValue("animation");
  const cstyle2 = getComputedStyle(flecha);
  const animacion2 = cstyle2.getPropertyValue("animation");
  const none = "0s ease 0s 1 normal none running none";
  const abiertoSlide = "0.5s ease 0s 1 normal forwards running mostrar";
  const abiertoFlecha = "0.5s ease 0s 1 normal forwards running girarOpuesto";
  const cerradoSlide = "0.5s ease 0s 1 normal forwards running esconder";
  const cerradoFlecha = "0.5s ease 0s 1 normal forwards running girar";

  if (animacion1 == none && animacion2 == none) {
    slideLateral.style.animation = "mostrar 0.5s forwards";
    flecha.style.animation = "girarOpuesto 0.5s forwards";
  } else if (animacion1 == abiertoSlide && animacion2 == abiertoFlecha) {
    slideLateral.style.animation = "esconder 0.5s forwards";
    flecha.style.animation = "girar 0.5s forwards";
  } else if (animacion1 == cerradoSlide && animacion2 == cerradoFlecha) {
    slideLateral.style.animation = "mostrar 0.5s forwards";
    flecha.style.animation = "girarOpuesto 0.5s forwards";
  }
});

const deleteSlide = (product) => {
  const elementToDelete = document.querySelector(`.${product}`);
  elementToDelete.remove();
};

/* evento para agregar productos */
const agregar = document.querySelector(".agregar");
const agregarProducto = document.getElementById("exept");
const dinamicAdd = document.getElementById("dinamicAdd");
agregar.addEventListener(
  "click",
  (internalFunction = () => {
    let ingrese;
    const valorInput = agregarProducto.value;
    
    
    
   /*  fetch('/principal-pricesmart/add',{
      method: "POST",
      body: JSON.stringify({
        productName:`${valorInput}`,
      }),
      headers: {"Content-Type":"application/json"}
    }).then(res =>res.text()) */
      
    
    
  
  




    if (valorInput != "") {

      fetch('/principal-pricesmart/add',{
        method: "POST",
        body: JSON.stringify({
          productName:`${valorInput}`,
        }),
        headers: {"Content-Type":"application/json"}
      }).then(res =>res.text())
      /*  Elementos */
      const li = document.createElement("li");
      const div = document.createElement("DIV");
      const h3 = document.createElement("h3");
      const ico = document.createElement("i");
      const a = document.createElement("a");
      /* acomodar */
      div.appendChild(h3);
      a.appendChild(ico);
      div.appendChild(a);
      li.appendChild(div);
      dinamicAdd.appendChild(li);

      a.addEventListener('click', async ()=>{
        console.log(valorInput)
        await fetch(`/delete/${valorInput}`,{
          method:'GET',
          headers:{'Content-Type':'application/json'},
        }).then(res =>res.text().then(data => console.log(data)))
        

    })
      /* clases */
      li.classList.add(
        "list-group-item",
        "d-flex",
        "primer-elemento",
        "ps-1",
        "pr-2",
        `${valorInput}`
        
      );
      div.classList.add("w-100", "d-flex", "justify-content-between");
      ico.classList.add("fas", "fa-trash-alt", "basura", "interno");
      h3.classList.add("text-start")
      /* content */
      h3.textContent = valorInput;
      agregarProducto.placeholder = "Producto";
      agregarProducto.style.setProperty("--colorHolder", "rgb(77, 77, 77)");
      agregarCarrousel(valorInput);
      a.addEventListener("click", () => {
       
        deleteSlide(valorInput);
        let elemento = document.querySelector(`.${valorInput}`);
       
        
            setTimeout(()=>{
            elemento.remove()

            },50)

      });
    } else {
      agregarProducto.placeholder = "Ingrese";
      ingrese = 1;
      /*  agregarProducto.style.setProperty("--colorHolder", "red"); */
      if (ingrese == 1) {
        setTimeout(() => {
          agregarProducto.placeholder = "Producto";
          /*  agregarProducto.style.setProperty("--colorHolder", "rgb(77, 77, 77)"); */
          /* ingrese = 0; */
        }, 600);
      }
    }

    agregarProducto.value = "";
    /* retorno de nodos */
    const basuraInterno = document.querySelectorAll(".interno");
    /* console.log(basuraInterno); */

    return new Promise((resolve, reject) => {
      resolve(basuraInterno);
    });
  })
);
/* evento para actualizar los nodos */
/* y funcion para eliminar slide */

const eliminarInterno = async () => {
  const arrayBasura = await internalFunction();
  return arrayBasura;
};

flecha.addEventListener("click", () => {
  internalFunction();
  eliminarInterno().then((res) => {
    let datos = res;
    datos.forEach((icono) => {
      icono.addEventListener("click", () => {
        let parent = icono.parentElement;
        let liElement = parent.parentElement;
        liElement.remove();
      });
    });
  });
});
/* que dolor de cabeza jquery */
$(flecha).on("click", function () {
  setTimeout(() => {
    $("#carouselExampleControlsNoTouching").carousel(0);
  }, 300);
});
/* contar elementos slide */
const seleccionar = () => {
  const confirmar = document.querySelectorAll(".confirmar");
  const cancelar = document.querySelectorAll(".cancelar");
  const inputCant = document.querySelectorAll(".cantidad1");
  const inputMarca = document.querySelectorAll(".marca1");
  const elementoCarousel = document.querySelector(".carousel-inner");
  return [confirmar, cancelar, inputCant, inputMarca];
};

window.addEventListener("load", () => {
  const elementoCarousel = document.querySelector(".carousel-inner");
  const itemsCrousel = elementoCarousel.querySelectorAll(".carousel-item");
  
  const frutasVegetales = document.querySelector('.frutasVegetales');
  const granos = document.querySelector('.granos');
  const congelados = document.querySelector('.congelados');
  const otros = document.querySelector('.otros');
  const aseo = document.querySelector('.aseo');
  const tecnología = document.querySelector('.tecnología');
  
  const eventArr = [frutasVegetales,granos,congelados,aseo,otros,tecnología]
  
  eventArr.forEach((category)=>{
    category.addEventListener('click',()=>{
      /* let elemento = category.firstChild;
      elemento.parentElement.classList.add('selected') */
      
      
      eventArr.forEach((state)=>{
          if(state.classList.contains('selected')){
                  state.classList.remove('selected')
          }

      })
      category.classList.toggle('selected');
     
      
      
    })
})

  itemsCrousel.forEach((item) => {
    let container = item.querySelector(".container-button");
    let confirm = container.querySelectorAll(".confirmar");
    let cancelar = container.querySelectorAll(".cancelar");
    let producto = item.querySelector(".producto");
    
    confirm[0].addEventListener("click", agregarCargado = () => {
      const productoEspecifico = document.querySelector(`.${producto.textContent}`).parentElement.parentElement;
     
      $("#carouselExampleControlsNoTouching").carousel("next");
      console.log(productoEspecifico);
      let cantidad = item.querySelector(".cantidad1").value;
      let marca = item.querySelector(".marca1").value;
      let precio = undefined;


      fetch(`/update/${'manzana'}`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
          cuantity:cantidad,
          marca:marca,
          category:'frutasVegetales',
        })
      }).then(res=>{
        res.text().then(res=>{console.log(res)});
      })

      
      if (marca == "") {
        marca = "----";
      }
      if (cantidad == "") {
        cantidad = "----"
      }
      if (precio == undefined) {
        precio = "----";
      };
      setTimeout(() => {
        productoEspecifico.remove();
        const cantidadDeItems = document.querySelector('.carousel-inner').childElementCount;
        if (cantidadDeItems == 0) {
          const segundoContainer = document.getElementById('segundo-container');
          segundoContainer.style.display = 'block';
          segundoContainer.childNodes[3].childNodes[0].setAttribute('href', 'price-smart-compra-Iniciada');
          segundoContainer.childNodes[1].childNodes[0].setAttribute('href', 'principal-vaquita');
          const carruselDelete = document.getElementById('carouselExampleControlsNoTouching');
          carruselDelete.style.animation = 'salida 0.7s forwards';
          carruselDelete.textContent = 'No hay mas elementos';
          carruselDelete.addEventListener('animationend', () => {
            carruselDelete.remove();
          });                                                                            /*  importante */
        }

      }, 600);
      const datos = [producto.textContent, marca, precio, cantidad];
      agregarListaFinal(datos);
      console.log(datos);


    });
    cancelar[0].addEventListener("click", () => {
      console.log("cancelado");
      const productoEspecifico = document.querySelector(`.${producto.textContent}`).parentElement.parentElement;
      $("#carouselExampleControlsNoTouching").carousel("next");
      console.log(productoEspecifico);
      setTimeout(() => {
        productoEspecifico.remove();
        const cantidadDeItems = document.querySelector('.carousel-inner').childElementCount;
        if (cantidadDeItems == 0) {
          const segundoContainer = document.getElementById('segundo-container');
          segundoContainer.style.display = 'block';

          segundoContainer.childNodes[3].childNodes[0].setAttribute('href', 'price-smart-compra-Iniciada');
          segundoContainer.childNodes[1].childNodes[0].setAttribute('href', 'principal-vaquita');


          const carruselDelete = document.getElementById('carouselExampleControlsNoTouching');
          carruselDelete.style.animation = 'salida 0.7s forwards'
          carruselDelete.textContent = 'No hay mas elementos';
          carruselDelete.addEventListener('animationend', () => {
            carruselDelete.remove();
          })

          /*  importante */
        }

      }, 600);

    });
  });
});

 window.addEventListener('load', async () => {
   
    let response = await fetch('/principal-pricesmart/get')
    response.json().then(res=>{console.log(res); 
    
      res.forEach(producto=>{
        
        let valorInput = producto.productName;
       
          /*  Elementos */
          const li = document.createElement("li");
          const div = document.createElement("DIV");
          const h3 = document.createElement("h3");
          const ico = document.createElement("i");
          const a = document.createElement("a");
          /* acomodar */
          div.appendChild(h3);
          a.appendChild(ico);
          div.appendChild(a);
          li.appendChild(div);
          dinamicAdd.appendChild(li);
  
          /* a.setAttribute('href', `delete/${valorInput.substring(0, 1).toLowerCase() + valorInput.substring(1)}`); */
          a.addEventListener('click',()=>{
              console.log(valorInput)
              fetch(`/delete/${valorInput}`,{
                method:'GET',
                headers:{'Content-Type':'application/json'},
              }).then(res =>res.text().then(data => console.log(data)))
              

          })
          /* clases */
          li.classList.add(
            "list-group-item",
            "d-flex",
            "primer-elemento",
            "ps-1",
            "pr-2",
            `${valorInput}`
          );
          div.classList.add("w-100", "d-flex", "justify-content-between");
          ico.classList.add("fas", "fa-trash-alt", "basura", "interno");
          /* content */
          h3.textContent = valorInput;
          agregarCarrousel(valorInput);
          a.addEventListener("click", () => {
            
            deleteSlide(valorInput);
            let elemento = document.querySelector(`.${valorInput}`);
            
            setTimeout(()=>{
            elemento.remove()

            },50)
            agregarProducto.value = "";
            /* retorno de nodos */
            const basuraInterno = document.querySelectorAll(".interno");
            /* console.log(basuraInterno); */
  
            return new Promise((resolve, reject) => {
              resolve(basuraInterno);
            });
          })
      })
    
    
    });
    

    
});
  

const statusFinal = document.getElementById('status')

statusFinal.addEventListener('click',()=>{
 
  const lista = document.getElementById('lista1');
  const arrayNode = lista.getElementsByTagName('li');
  console.log(arrayNode)
  for(let i=0; i<arrayNode.length;i++){
    if(i == 0){
      console.log('no')
    }else{
      let name = arrayNode[i].childNodes[0].childNodes[1].textContent;
      if(name == 'Manzana'){
        name = name.substring(0, 1).toLowerCase() + name.substring(1)
        fetch(`/update-status/${name}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            buyStatus:true
          })
        }).then(res => {
          res.text().then(res => { console.log(res) });
        })
      }else{
        fetch(`/update-status/${name}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            buyStatus:true
          })
        }).then(res => {
          res.text().then(res => { console.log(res) });
        })
      }
     
    }
    
  }
    
  
})
  

  


    
