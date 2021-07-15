const slider = document.querySelector(".slider__cnt");
const cards = document.querySelectorAll(".card");
const cardimgs = document.querySelectorAll(".card img");
const startdrag = document.querySelector(".start-drag");
const enddrag = document.querySelector(".end-drag");
const navbtn = document.querySelectorAll(".slider__navigation"); 

let clicked = true, pressed = false, startX, valX, scrollLeft;
let effectWidth = 0;
let scrollMax;

function updateMaxScroll(){
    scrollMax = slider.scrollWidth - slider.offsetWidth;
    // console.log(slider.scrollLeft, slider.scrollWidth, scrollMax);
    startdrag.style.left = `0px`;
    enddrag.style.left = `${slider.scrollWidth}px`;
}

function updateDrag(ele, val){
    val = ele == startdrag ? (-1 * val) : val;
    let transform = ele == startdrag ? "none" : `translateX(-${effectWidth}px)`;
    if(val > 0){
        ele.style.width = `${effectWidth}px`;
        ele.style.transform = transform;
        effectWidth += 2;
    }
    else if(val < 0){
        ele.style.width = `${effectWidth}px`;
        ele.style.transform = transform;
        effectWidth -= 2;
    }
}

function resetDrag(){
    effectWidth = 0;
    startdrag.style.width = enddrag.style.width = `0px`;
    startdrag.style.transform = enddrag.style.width = "none";
}

function setX(e){
    pressed=true;
    valX = (e.pageX || e.touches[0].pageX);
    startX = (e.pageX || e.touches[0].pageX) - slider.offsetLeft;
    // console.log(e.pageX || e.touches[0].pageX);
    scrollLeft = slider.scrollLeft;
    slider.style.cursor = "grabbing";  
}

function sliderMove(e){
    if(!pressed) return;
    // e.preventDefault();

    clicked = false;
    let x = (e.pageX || e.touches[0].pageX) - slider.offsetLeft;
    const walk = (x - startX);
    slider.scrollLeft = (scrollLeft - walk);
    // console.log(slider.scrollLeft, slider.scrollWidth, scrollMax);
    
    cards.forEach(card => {card.style.cursor = "grabbing";});
    if(Math.ceil(slider.scrollLeft) == scrollMax || slider.scrollLeft == 0){
        ele = slider.scrollLeft == 0 ? startdrag : enddrag; 
        let val = (valX - (e.pageX || e.touches[0].pageX));
        valX = (e.pageX || e.touches[0].pageX);
        updateDrag(ele, val); 
    } 
}

function unSet(e){
    pressed=false;
    clicked = true;

    resetDrag();
    
    slider.style.cursor = "grab"; 
    cards.forEach(card => {card.style.cursor = "pointer";}); 
}

function updateCard(){
    // card size 332;
    let updateVal = slider.scrollLeft - (slider.scrollLeft % 332);
    let mod = (slider.scrollLeft % 332);
    slider.scrollLeft = this.dataset.value == "next" ? updateVal+332 : (mod ? updateVal : (slider.scrollLeft - 332));
}

slider.addEventListener("mousedown", setX);

slider.addEventListener("mousemove", sliderMove);

window.addEventListener("mouseup", unSet);

slider.addEventListener("touchstart", setX);

slider.addEventListener("touchmove", sliderMove);

slider.addEventListener("touchend", unSet);

navbtn.forEach(btn => {
    btn.addEventListener("click", updateCard);
});


cardimgs.forEach(img =>{
    img.addEventListener('dragstart', (e) => e.preventDefault());
});



cards.forEach(card => {
    card.addEventListener("mouseup", (e) => {
        if(!clicked) return;
        console.log("hello");
    });
});

slider.oncontextmenu = function (event) {
    event.preventDefault()
    event.stopPropagation()
    return false
}

window.onresize = window.onload = updateMaxScroll;

