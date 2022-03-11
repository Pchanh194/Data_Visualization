


function init(){
    const button2019 = document.getElementById("button1");
    const button2021 = document.getElementById("button2");
    const buttonboth = document.getElementById("button3");
    //create button for each year
    

    button2019.addEventListener("click",()=>{
        const image = document.getElementById("image");
        image.src= "./image/chart2019.png";
       

        const caption=document.getElementById("caption");
        caption.innerHTML= "Percentage of popular pet in 2019"
    });

    button2021.addEventListener("click",()=>{
        const image = document.getElementById("image");
        image.src= "./image/chart2021.png";
        const caption=document.getElementById("caption");
        caption.innerHTML= "Percentage of popular pet in 2021"
        
    });

    buttonboth.addEventListener("click",()=>{
        const image = document.getElementById("image");
        image.src= "./image/bothyearchart.png";
        const caption=document.getElementById("caption");
        caption.innerHTML= "Percentage of popular pet in 2019 and 2021"
    });
}
window.addEventListener("load",init)
