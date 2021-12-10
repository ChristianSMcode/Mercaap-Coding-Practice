
function CheckSpace(event)
{
   if(event.which ==32)
   {
      event.preventDefault();
      return false;
   }
}

const createGroup = async ()=>{
  const grupos = await fetch('/obtener-grupos')
  grupos.json().then(res => {
    
    console.log(res)
  
  
  
  });
}

function myFunction() {
    /* Get the text field */
    var copyText = document.getElementById("copy");
  
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
  
     /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.value);
  
  
    
  };

  const copyIco = document.getElementById('copyIco');
  const inputRead = document.getElementById('copy')
  
  window.addEventListener('load',async()=>{
    const codigo = await fetch('/obtener-Codigo')
    codigo.json().then(res => {
      
      inputRead.setAttribute('value',`${res.personalGroup}`)
    });

     createGroup();
  })

  

  copyIco.addEventListener('click',()=>{
    myFunction()
  })


 

