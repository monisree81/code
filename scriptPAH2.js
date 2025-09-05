document.addEventListener("DOMContentLoaded",(event)=>{ 
    const fontSize=document.getElementById("fontSizeSelect"); 
    const color=document.getElementById("fontColorSelect"); 
    const fontWeight=document.getElementById("boldBtn"); 
    const fontStyle=document.getElementById("italicBtn"); 
    const resetBtn=document.getElementById("resetBtn"); 
    const target=document.getElementById("editor"); 
   
    fontSize.addEventListener("change",()=>{ 
        target.style.fontSize=fontSize.value.trim(); 
    }) 
 
    color.addEventListener("change",()=>{ 
        target.style.color=color.value.trim(); 
    }) 
     
    
    fontWeight.addEventListener("click",()=>{ 
 
        if(fontWeight.classList.contains("active")){ 
                  target.classList.toggle("fw-bold"); 
        }else{ 
            target.classList.toggle("fw-bold"); 
        } 
    }) 
 
    fontStyle.addEventListener("click",()=>{ 
        if(fontStyle.classList.contains("active")){ 
                      target.classList.toggle("fst-italic"); 
        }else{ 
            target.classList.toggle("fst-italic"); 
        } 
    }) 
 
 
 
     
resetBtn.addEventListener("click",()=>{ 
      
        target.style.fontSize=""; 
        target.style.color=""; 
      fontSize.value="12px"; 
      color.value="black"; 
      if(fontStyle.classList.contains("active")){ 
        //fontWeight.classList.toggle("italicbtn"); 
        target.classList.toggle("fst-italic"); 
        fontStyle.classList.remove("active"); 
    } 
 
    if(fontWeight.classList.contains("active")){ 
        //fontWeight.classList.toggle("italicbtn"); 
        target.classList.toggle("fw-bold"); 
        fontWeight.classList.remove("active"); 
    } 
 
 
    }) 
 
     
 
 
})
