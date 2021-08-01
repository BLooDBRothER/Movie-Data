
let movieGenre, j;

function setRatingColor(rating){
    if(rating >= 7.5){
        return "green";
    }
    if(rating < 7.5 && rating > 5){
        return "orange";
    }
    return "red";
}

async function fetchMovies(){
    response = await fetch(trendingurl);
    result = await (response.json());
    movie["trendingMovie"] = result.results;

    response = await fetch(animatedurl);
    result = await (response.json());
    movie["animatedMovie"] = result.results;

    response = await fetch(horrorurl);
    result = await (response.json());
    movie["horrorMovie"] = result.results;

    response = await fetch(upurl);
    result = await (response.json());
    movie["upMovie"] = result.results;

    response = await fetch(hpurl);
    result = await (response.json());
    movie["hpMovie"] = result.parts;

    response = await fetch(marvelurl1);
    result = await (response.json());
    let marvel1 = result.results;

    response = await fetch(marvelurl2);
    result = await (response.json());
    let marvel2 = result.results;

    movie["marvelMovie"] = Object.assign(marvel1);
    j = marvel1.length;
    for(i in marvel2){
        movie["marvelMovie"] = Object.assign(movie["marvelMovie"], {[j]: marvel2[i]});
        j++;
    }

    response = await fetch(tamilurl1);
    result = await (response.json());
    tamil1 = result.results;

    response = await fetch(tamilurl2);
    result = await (response.json());
    tamil2 = result.results;

    movie["tamillMovie"] = Object.assign(tamil1);
    j = tamil1.length;
    for(i in marvel2){
        movie["tamilMovie"] = Object.assign(movie["tamillMovie"], {[j]: tamil2[i]});
        j++;
    }
}

async function returnCard(poster_path, title, overview, vote_average, id){
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
                    <div class="card__rating ${setRatingColor(vote_average)}">${vote_average}</div>
                </div>`
    return card;
}

async function returnGenre(id){
    const detailurl = `https://api.themoviedb.org/3/movie/${id}?api_key=5bbd27f8962722b1aa921d43db36211f`;
    let response = await fetch(detailurl);
    let result = await response.json();
    
    let genres = result.genres;
    if(genres.length > 5){
        genres.splice(5, (genres.length-5));
    }
    movieGenre = genres.map(genre => {
        return `<div class="card__genre">${genre.name}</div>`
    }).join("");
    return movieGenre;
}

async function updateContent(){
    await fetchMovies();
    await new Promise(res => { setTimeout(res, 1000); })
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
            if(movie == movies[movies.length-1]){
                slider.innerHTML += cards;   
            }
            if(slider == sliders[sliders.length-1] && (movie == movies[movies.length-1])){
                startCarousel();
            }
        });
    });
}

updateContent();
