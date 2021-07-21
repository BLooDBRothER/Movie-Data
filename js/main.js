const search = document.querySelector(".search");
const searchInput = document.querySelector(".search-txt");
const search_ic = document.querySelector(".search-ic-cnt");
const close_ic = document.querySelector(".close-ic-cnt");

//api URL
const trendingurl = "https://api.themoviedb.org/3/trending/movie/day?api_key=5bbd27f8962722b1aa921d43db36211f";
const popularurl = "https://api.themoviedb.org/3/discover/movie?api_key=5bbd27f8962722b1aa921d43db36211f&region=IN&sort_by=popularity.desc";
const animatedurl = "https://api.themoviedb.org/3/discover/movie?api_key=5bbd27f8962722b1aa921d43db36211f&with_genres=16";
const horrorurl = "https://api.themoviedb.org/3/discover/movie?api_key=5bbd27f8962722b1aa921d43db36211f&with_genres=27";
const marvelurl1 = "https://api.themoviedb.org/3/discover/movie?api_key=5bbd27f8962722b1aa921d43db36211f&with_companies=420&page=1";
const marvelurl2 = "https://api.themoviedb.org/3/discover/movie?api_key=5bbd27f8962722b1aa921d43db36211f&with_companies=420&page=2";
const tamilurl1 = "https://api.themoviedb.org/3/discover/movie?api_key=5bbd27f8962722b1aa921d43db36211f&with_original_language=ta";
const tamilurl2 = "https://api.themoviedb.org/3/discover/movie?api_key=5bbd27f8962722b1aa921d43db36211f&with_original_language=ta&page=2";
const upurl = "https://api.themoviedb.org/3/discover/movie?api_key=5bbd27f8962722b1aa921d43db36211f&with_companies=6704";
const hpurl = "https://api.themoviedb.org/3/collection/1241?api_key=5bbd27f8962722b1aa921d43db36211f";
const searchurl = "https://api.themoviedb.org/3/search/movie?api_key=5bbd27f8962722b1aa921d43db36211f&";


//To Update image
const imgurl = "https://image.tmdb.org/t/p/original";

let response, result;
let movie = {};
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

