const search = document.querySelector(".search");
const searchInput = document.querySelector(".search-txt");
const search_ic = document.querySelector(".search-ic-cnt");
const close_ic = document.querySelector(".close-ic-cnt");

//To Update image
const imgurl = "https://image.tmdb.org/t/p/original";
const popularurl = "https://api.themoviedb.org/3/discover/movie?api_key=5bbd27f8962722b1aa921d43db36211f&region=IN&sort_by=popularity.desc"
let popularMovie = [];
const imgarr = [];

search_ic.addEventListener("click", function(){
    if(!search.classList.contains("search-active")){
        searchInput.style.pointerEvents = "initial";
        search.classList.add("search-active");
        close_ic.style.display = "initial";
        return
    }
    console.log(searchInput.value); 
});

close_ic.addEventListener("click", function(){
    search.classList.remove("search-active");
    close_ic.style.display = "none";
    searchInput.value = "";
    searchInput.style.pointerEvents = "none";
});

