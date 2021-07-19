const params = new URLSearchParams(window.location.search);
const id = params.get("movieid");
// const cast_card = document.querySelectorAll(".cast__card");

const detailurl = `https://api.themoviedb.org/3/movie/${id}?api_key=5bbd27f8962722b1aa921d43db36211f&append_to_response=videos,images,watch/providers,credits`;
const recomendedurl = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=5bbd27f8962722b1aa921d43db36211f`;

let details = {};


// async function test(){
//   let response = await fetch(allurl);
//   let result = await response.json();
//   console.log(result);
// }
//157336 - interstellar
//626392 - master
//529203 - croods
// test();
// startCarousel();

