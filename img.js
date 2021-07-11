

let count = 0;
const imgs = document.querySelectorAll(".thumb-img");

const img3 = window.matchMedia("(max-width: 1600px)");
const img2 = window.matchMedia("(max-width: 1040px)");

async function updateArray(){
    let response = await fetch(popularurl);
    let result = await (response.json());
    popularMovie = result.results;
    popularMovie.forEach(movie => {
        imgarr.push(imgurl+movie.poster_path);
        console.log(movie.title);
    });
    hideImage3(img3, 0);
    hideImage2(img2, 0);
    updateImage();
}

function hideImage3(x, val) {
    if (x.matches) {
      imgs[2].style.display = "none";
    } else if(val){
      imgs[2].style.display = "initial";
      updateImageSrc(imgs[2]);
    }
  }
  
  function hideImage2(x, val) {
    if (x.matches) {
      imgs[1].style.display = "none";
    } else if(val){
      imgs[1].style.display = "initial";
      updateImageSrc(imgs[1]);
    }
  }

function updateImageSrc(img) {
  if (count == imgarr.length) {
    count = 0;
  }
  console.log(count);
  img.src = imgarr[count];
  // img.style.animation = "fadeIn 1s ease 1";
  img.classList.remove("transparent");
  count++;
}

function updateImage() {
  imgs.forEach((img) => {
    if (img.style.display == "none") return;
    console.log(img);
    updateImageSrc(img);
  });
  setTimeout(() => {
    imgs.forEach((img) => {
        img.classList.add("transparent");
    });
  }, 4000);
  setTimeout(updateImage, 5000);
}


updateArray();



img3.addEventListener("change", () => {hideImage3(img3, 1)});
img2.addEventListener("change", () => {hideImage2(img2, 1)});