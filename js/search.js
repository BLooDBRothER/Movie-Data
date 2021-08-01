
let search_item;

async function updateSearchList(){
    search_items.innerHTML = "";
    console.log("hello")
    if(this.value == "") return;
    console.log("hello")
    let queryurl = `${searchurl}query=${this.value}`;
    let response = await fetch(queryurl);
    let result = (await response.json()).results;
    result.forEach(movie => {
        search_items.innerHTML += `<li class="search__item" data-id=${movie.id}>${movie.title} - (${movie.original_title})</li>`
    });
    searchItemClick();
}

function searchItemClick(){
    search_item = document.querySelectorAll(".search__item");
    search_item.forEach(item => {
        item.addEventListener("click", function (){
            window.open(`./movie.html?movieid=${this.dataset.id}`, "__blank");
        });
    })
}

searchInput.addEventListener("keyup", updateSearchList);

