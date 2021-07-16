
let movieGenre;

async function fetchMovies(){
    response = await fetch(trendingurl);
    result = await (response.json());
    movie["trendingMovie"] = result.results;
    response = await fetch(upcomingurl);
    result = await (response.json());
    movie["upcomingMovie"] = result.results;
}

async function returnCard(poster_path, title, overview, vote_average, id){
    const detailurl = `https://api.themoviedb.org/3/movie/${id}?api_key=5bbd27f8962722b1aa921d43db36211f`;
    poster_path = poster_path==null ? "" : `https://image.tmdb.org/t/p/original${poster_path}`;
    // let card, genreTag, test;
    // fetch(detailurl)
    //                 .then(res => res.json())
    //                 .then(movie => {
    //                     // console.log(movie)
    //                     genreTag = movie.genres.map(genre => {
    //                         return `<div class="card__genre">${genre.name}</div>`
    //                     }).join("");
    //                 })
    let genreTag = await returnGenre(id);
    card = `<div class="card">
                    <img class="card__img" src="${poster_path}" alt="">
                    <div class="card__details">
                        <h2 class="card__title">${title}</h2>
                        <div class="card__genres">
                            ${genreTag}
                        </div>
                    </div>
                    <div class="card__overview">${overview}</div>
                    <div class="card__rating">${vote_average}</div>
                </div>`
    return card;
}

async function returnGenre(id){
    const detailurl = `https://api.themoviedb.org/3/movie/${id}?api_key=5bbd27f8962722b1aa921d43db36211f`;
    let response = await fetch(detailurl);
    let result = await response.json();
    console.log(result);
    let genres = result.genres;
    movieGenre = genres.map(genre => {
        return `<div class="card__genre">${genre.name}</div>`
    }).join("");
    return movieGenre;
}

async function updateContent(){
    await fetchMovies();
    sliders.forEach(slider => {
        let value = slider.dataset.value
        slider.innerHTML = `<div class="start-drag" data-value="${value}"></div>
                             <div class="end-drag" data-value="${value}"></div>`;
        let moviesSection = `${value}Movie`;
        let movies = movie[moviesSection];
        let cards = ""; 
        
        movies.forEach(async movie => {
            let result = await returnCard(movie.poster_path, movie.title, movie.overview, movie.vote_average, movie.id);
            cards += result;
            console.log("running")
            if(movie == movies[movies.length-1]){
                slider.innerHTML += cards;
                console.log("ended");
                startCarousel();
            }
        });
    });
}

updateContent();