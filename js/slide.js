const sliders = document.querySelectorAll(".slider__cnt");
let cards, cardimgs, startdrags, enddrags, navbtn; 

let clicked = true, pressed = false, startX, valX, scrollLeft;
let effectWidth = 0;
let scrollMax = {};

function updateVariable(){
    cards = document.querySelectorAll(".card");
    cardimgs = document.querySelectorAll(".card img");
    startdrags = document.querySelectorAll(".start-drag");
    enddrags = document.querySelectorAll(".end-drag");
    navbtn = document.querySelectorAll(".slider__navigation"); 
}

function updateMaxScroll(){
    sliders.forEach(slider => {
        let datavalue = slider.dataset.value;
        scrollMax[datavalue] = slider.scrollWidth - slider.offsetWidth;
        slider.querySelector(".start-drag").style.left = `0px`;
        slider.querySelector(".end-drag").style.left = `${slider.scrollWidth}px`;
    });
}

function updateDrag(ele, val){
    val = ele.classList.contains("start-drag") ? (-1 * val) : val;
    let transform = ele.classList.contains("start-drag") ? "none" : `translateX(-${effectWidth}px)`;
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
    for(let i = 0 ; i<startdrags.length ; i++){
        startdrags[i].style.width = enddrags[i].style.width = `0px`;
        startdrags[i].style.transform = enddrags[i].style.width = "none";
    }
}

function setX(e){
    pressed=true;
    valX = (e.pageX || e.touches[0].pageX);
    startX = (e.pageX || e.touches[0].pageX) - this.offsetLeft;
    scrollLeft = this.scrollLeft;
    this.style.cursor = "grabbing";  
}

function sliderMove(e){
    if(!pressed) return;
    // e.preventDefault();

    clicked = false;
    let x = (e.pageX || e.touches[0].pageX) - this.offsetLeft;
    const walk = (x - startX);
    this.scrollLeft = (scrollLeft - walk);
    
    cards.forEach(card => {card.style.cursor = "grabbing";});
    if(Math.ceil(this.scrollLeft) == scrollMax[this.dataset.value] || this.scrollLeft == 0){
        ele = this.scrollLeft == 0 ? this.querySelector(".start-drag") : this.querySelector(".end-drag"); 
        let val = (valX - (e.pageX || e.touches[0].pageX));
        valX = (e.pageX || e.touches[0].pageX);
        updateDrag(ele, val); 
    } 
}

function unSet(e){
    if(!pressed) return;
    pressed=false;
    clicked = true;

    resetDrag();

    sliders.forEach(slider => {slider.style.cursor = "grab";});
    cards.forEach(card => {card.style.cursor = "pointer";}); 
}

function updateCard(){
    // card size calculation;

    let sliderCard = document.querySelector(`.slider__cnt[data-value='${this.dataset.parent}'] .card`);
    console.log(sliderCard);
    
    if(cards[0] == undefined) return;
    let style = window.getComputedStyle ? getComputedStyle(sliderCard, null) : sliderCard.currentStyle;
    let width = parseInt(style.width) + parseInt(style.marginLeft) + parseInt(style.marginRight);
    console.log(width, this);

    let slider = document.querySelector(`.slider__cnt[data-value="${this.dataset.parent}"]`);
    let updateVal = slider.scrollLeft - (slider.scrollLeft % width);
    let mod = (slider.scrollLeft % width);
    slider.scrollLeft = this.dataset.value == "next" ? updateVal+width : (mod ? updateVal : (slider.scrollLeft - width));
}

async function startCarousel(){
    updateVariable();
    sliders.forEach(slider => {
        slider.addEventListener("mousedown", setX);
    
        slider.addEventListener("mousemove", sliderMove);

        slider.addEventListener("mouseleave", unSet);

        slider.addEventListener("mouseup", unSet);
    
        slider.addEventListener("touchstart", setX);
    
        slider.addEventListener("touchmove", sliderMove);
    
        slider.addEventListener("touchend", unSet);
    
        slider.oncontextmenu = function (event) {
            event.preventDefault()
            event.stopPropagation()
            return false
        }
    });
    
    // window.addEventListener("mouseup", unSet);
    
    navbtn.forEach(btn => {
        btn.addEventListener("click", updateCard);
    });
    
    cardimgs.forEach(img =>{
        img.addEventListener('dragstart', (e) => e.preventDefault());
    });
    
    cards.forEach(card => {
        card.addEventListener("mouseup", (e) => {
            if(!clicked) return;
            console.log("clickd", card);
            window.location.href = `./movie.html?movieid=${card.dataset.id}`;
        });
    });
    updateMaxScroll();
    window.onresize = updateMaxScroll;
}

// startCarousel();

// window.onresize = window.onload = updateMaxScroll;

