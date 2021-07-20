const header = document.querySelector(".header");
const Movieposter = document.querySelector(".poster");
const poster_cnt = document.querySelector(".poster__container");
const genre_over = document.querySelector(".over_genre");
const cast_slider = document.querySelector(".slider__cnt[data-value='cast']");
const recommend_slider = document.querySelector(".slider__cnt[data-value='recommendation']");
const media_h3 = document.querySelectorAll(".media__selection h3");
const media_value = document.querySelectorAll(".media__selection .value");

//Header Function

function setRatingColor(rating){
  if(rating >= 7.5){
      return "green";
  }
  if(rating < 7.5 && rating > 5){
      return "orange";
  }
  return "red";
}

function returnStatus(status){
  if(status == "Released"){
    return `<i class="fas fa-check-circle green"></i>`
  }
  return `<i class="fas fa-sync-alt red"></i>`
}

function returnHeader() {
  return `<div class="header__left">
            <h1 class="header__title">${details.data[0]}</h1>
            <div class="header__details">
                <div class="header__runtime">${details.data[1]}mins</div>
                <div class="header__status">${returnStatus(details.data[2])}</div>
            </div>
          </div>
          <div class="header__right">
            <div class="header__rate">
                <i class="fas fa-star header__ic"></i>
                <div class="header__rating"><span class="${setRatingColor(details.data[3])}">${details.data[3]}</span> / 10</div>
            </div class="header__rate">
            <div class="header__language">
                <i class="fas fa-language header__ic"></i>
                <div class="header__original">${details["spoken"][0].name}</div>
            </div> 
        </div>`;
}

//Poster Function

function returnMovieLogo(){
  let path = ""
  details["images"].logos.forEach(logo => {
    if(logo.iso_639_1 == "en"){
      path = `<img src="https://image.tmdb.org/t/p/original${logo.file_path}" class="poster__logo"></img>`;
    }
  });
  return path;
}

function returnProduction(){
  let final = "";
  details.production.forEach(company => {
    final += company.logo_path ?`<img src="https://image.tmdb.org/t/p/original${company.logo_path}" alt="" class="production__logo"></img>`: `<p>${company.name}</p>`;
  });
  return final;
}

function returnPosterImage(){
  return details["images"].posters[0].file_path == null ? `<img src="./Assets/noPoster.jpg" alt="" class="poster__image">` : `<img src="https://image.tmdb.org/t/p/original${details["images"].posters[0].file_path}" alt="" class="poster__image">`
}

function returnMovieProvider(){
  if(details["providers"] == undefined) return "";
  let flatrates = details["providers"].flatrate;
  let tag = "";
  flatrates.forEach(stream => {
    tag += `<img class="provider-logo" src="https://image.tmdb.org/t/p/original${stream.logo_path}" alt="Stream Logo">`
  });
  return tag;
}

function returnPoster(){
  return `<div class="poster__det-cnt">
            <div class="poster__mix-cnt">
                <div class="poster__images">
                    ${returnPosterImage()}
                    <p class="poster__tagline">${details.data[4] == "" ? "" :details.data[4]}</p>
                </div>
                <div class="poster__details">
                    ${returnMovieLogo()}
                    <div class="poster__release"><h3>Release Date : </h3><span class="poster__value">${details.data[5]}</span></div>
                    <div class="poster__budget"><h3>Budget : </h3><span class="poster__value">${details.data[6] == 0 ? "N/A" :details.data[6]}</span></div>
                    <div class="poster__revenue"><h3>Revenue : </h3><span class="poster__value">${details.data[7] == 0 ? "N/A" :details.data[7]}</span></div>
                    <div class="poster__original-title"><h3>Original Title : </h3><span class="poster__value">${details.data[8]}</span></div>
                </div>
            </div class="poster__mix-cnt">
            <div class="poster__abs">
                <div class="poster__providers">
                    <div class="poster__links">
                        ${returnMovieProvider()}
                        <i class="fab fa-imdb poster__imdb"></i>
                    </div>
                </div>
            </div>
          </div>
          <div class="poster__production">
            ${returnProduction()}
          </div>`
}

// genre overview function
function returnGenreOver(){
  let genreTag = ""
  details.genres.forEach(genre => {
    genreTag += `<div class="card__genre">${genre.name}</div>`
  });
  let plot = `<p>${details.data[10]}</p>`
  return `<div class="card__genres">
            ${genreTag}
          </div>
          <div class="overview">
            <h2>Plot</h2>
            <p>${plot}</p>
          </div>`
}

// cast function

function returnCastCard(name, character, profile){
  profile = profile == null ? `<img class="card__img nouser" src="./Assets/nouser.svg" alt="">` : `<img class="card__img" src="https://image.tmdb.org/t/p/original${profile}" alt="">`;
  return `  <div class="cast__card card">
              ${profile}
              <div class="card__details">
                  <h2 class="card__name">${name}</h2>
              </div>
              <div class="card__character">${character}</div>
            </div>`

}

function returnCast(){
  let card = `<div class="start-drag" data-value="cast"></div>
  <div class="end-drag" data-value="cast"></div>`;
  details.credits.forEach(credit => {
    card += returnCastCard(credit.name, credit.character, credit.profile_path);
  });
  return card;

}

// media function

function returnMediaCont(){
  let posterTag = "", backTag="", i;
  let length = details["images"].posters.length;
  for(i=0; (i < 11 && i < length) || (i == length-1); i++){
    posterTag += `<img src="https://image.tmdb.org/t/p/original${details["images"].posters[i].file_path}" alt="" class="media__poster">`;
  }
  if(i < length){
    posterTag += `<div class="load_more" data-value="poster">
                      <img src="https://image.tmdb.org/t/p/original${details["images"].posters[i].file_path}" alt="" class="media__poster">
                      <div class="load_more_cnt">
                          <p>Load More <i class="fas fa-angle-right"></i></p>
                      </div>
                  </div>`
  }
 
  poster = posterTag;
  media_value[0].innerHTML = length;
  document.documentElement.style
    .setProperty('--data-poster', `url("https://image.tmdb.org/t/p/original${details["images"].posters[0].file_path}")`);

  let videoTag = "";
  details["videos"].forEach(video => {
    if(! video.site == "YouTube") return;
    videoTag += `<div class="media__video__container">
                    <iframe src="https://www.youtube.com/embed/${video.key}?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                  </div>`
  });
  video = videoTag;
  media_value[1].innerHTML = details["videos"].length;
  document.documentElement.style
    .setProperty('--data-video', `url("https://image.tmdb.org/t/p/original${details["images"].backdrops[0].file_path}")`);

  length = details["images"].backdrops.length;

  for(i=0; (i < 11 && i < length) || (i == length-1); i++){
    backTag += `<img src="https://image.tmdb.org/t/p/original${details["images"].backdrops[i].file_path}" alt="" class="media__poster">`;
  }
  if(i < length){
    backTag += `<div class="load_more" data-value="backdrops">
                      <img src="https://image.tmdb.org/t/p/original${details["images"].backdrops[i].file_path}" alt="" class="media__poster">
                      <div class="load_more_cnt">
                          <p>Load More <i class="fas fa-angle-right"></i></p>
                      </div>
                  </div>`
  }
  back = backTag;
  media_value[2].innerHTML = details["images"].backdrops.length;
  document.documentElement.style
    .setProperty('--data-back', `url("https://image.tmdb.org/t/p/original${details["images"].backdrops[(details["images"].backdrops.length - 1)].file_path}")`);

  // console.log(details["videos"])
}

function updateAll(){
  let newTag = "";
  if(this.dataset.value == "poster"){
      details["images"].posters.forEach(each => {
          newTag += `<img src="https://image.tmdb.org/t/p/original${each.file_path}" alt="" class="media__poster">`
      });
      poster = newTag;
  }
  else{
      details["images"].backdrops.forEach(each => {
          newTag += `<img src="https://image.tmdb.org/t/p/original${each.file_path}" alt="" class="media__poster">`
        });
        backdrops = newTag;
  }
  media_cnt.innerHTML = newTag;
}

function updateLoadMore(){    
  load = document.querySelector(".load_more");
  if(load == undefined) return;
  load.addEventListener("click", updateAll);
}

// Recommendation functions

async function returnRecommendCard(poster_path, title, overview, vote_average, id){
  poster_path = poster_path==null ? `./Assets/noimage.svg` : `https://image.tmdb.org/t/p/original${poster_path}`;
  let genreTag = await returnGenre(id);
  card = `<div class="card" data-id="${id}">
                  <img class="card__img" src="${poster_path}" alt="">
                  <div class="card__details">
                      <h2 class="card__title">${title}</h2>
                      <div class="card__genres">
                          ${genreTag}
                      </div>
                  </div>
                  <div class="card__overview">${overview}</div>
                  <div class="card__rating ${setRatingColor(vote_average)}">${vote_average.toFixed(1)}</div>
              </div>`
  return card;
}

async function returnGenre(id){
  const detailurl = `https://api.themoviedb.org/3/movie/${id}?api_key=5bbd27f8962722b1aa921d43db36211f`;
  let response = await fetch(detailurl);
  let result = await response.json();
  let genres = result.genres;
  movieGenre = genres.map(genre => {
      return `<div class="card__genre">${genre.name}</div>`
  }).join("");
  return movieGenre;
}

function setRecommended(){
    let value = "recommendation";
    recommend_slider.innerHTML = `<div class="start-drag" data-value="${value}"></div>
                         <div class="end-drag" data-value="${value}"></div>`;
    let movies = details["recommended"];
    let cards = ""; 
    
    movies.forEach(async movie => {
        let result = await returnRecommendCard(movie.poster_path, movie.title, movie.overview, movie.vote_average, movie.id);
        cards += result;
        if(movie == movies[movies.length-1]){
          recommend_slider.innerHTML += cards;
          startCarousel();
    }
});
}

function updateStream(){
  let imdb =  document.querySelector(".poster__imdb");
  let providers = document.querySelectorAll(".provider-logo");
  imdb.addEventListener("click", ()=>{
    window.open(imdburl, "_blank");
  });
  providers.forEach(provider => {
    provider.addEventListener("click", ()=>{
      window.open(details["providers"].link, "_blank");
    });
  });
}

async function fetchMovies() {
  response = await fetch(detailurl);
  result = await response.json();
  details["credits"] = result.credits.cast;
  details["genres"] = result.genres;
  details["homepage"] = result.homepage;
  details["data"] = [
    result.title,
    result.runtime,
    result.status,
    result.vote_average,
    result.tagline,
    result.release_date,
    result.budget,
    result.revenue,
    result.original_title,
    result.imdb_id,
    result.overview,
  ];
  details["images"] = result.images;
  details["production"] = result.production_companies;
  details["spoken"] = result.spoken_languages;
  details["videos"] = result.videos.results;
  details["providers"] = result["watch/providers"].results["IN"];
  // streamlink = details["providers"] ? result["watch/providers"].results["IN"].link : "";
  imdburl = `https://www.imdb.com/title/${result.imdb_id}/`
  response = await fetch(recomendedurl);
  result = await response.json();
  details["recommended"] = result.results;
}

async function updateContent(){  
  await fetchMovies();
  header.innerHTML = returnHeader();
  Movieposter.style.background = `url("https://image.tmdb.org/t/p/original${details["images"].backdrops[0].file_path}") top`;
  Movieposter.style.backgroundSize = "cover";
  poster_cnt.innerHTML = returnPoster();
  genre_over.innerHTML = returnGenreOver();
  cast_slider.innerHTML = returnCast();
  startCarousel();
  returnMediaCont();
  media_cnt.innerHTML = poster;
  setRecommended();
  updateLoadMore();
  updateStream();
}
updateContent();

//details[data]
// result.title, - 0
// result.runtime, - 1
// result.status, - 2
// result.vote_average, - 3
// result.tagline, - 4
// result.release_date, - 5
// result.budget, - 6
// result.revenue, - 7
// result.original_title, - 8
// result.imdb_id - 9
// result.overview - 10
