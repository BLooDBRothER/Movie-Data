
const media_sel = document.querySelectorAll(".media__poster");

let video = ``;
let poster = ``;
let back = ``;

function returnMedia(){
    media_cnt.innerHTML = '';
    if(this.classList.contains("photo")){
        media_cnt.innerHTML = poster;
        updateLoadMore();
    }
    else if(this.classList.contains("video")){
        media_cnt.innerHTML = video;
    }
    else{
        media_cnt.innerHTML = back;
        updateLoadMore();
    }
}

media_sel.forEach(sel => {
    sel.addEventListener("click", returnMedia)
});

startCarousel();

