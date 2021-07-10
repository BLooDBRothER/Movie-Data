

let count = 0;
const imgs = document.querySelectorAll(".thumb-img");

async function updateArray(){
    let response = await fetch(popularurl);
    let result = await (response.json());
    popularMovie = result.results;
    popularMovie.forEach(movie => {
        imgarr.push(imgurl+movie.poster_path);
    });
    hideImage3(img3);
    hideImage2(img2);
    updateImage();
}

function hideImage3(x) {
    if (x.matches) {
      imgs[2].style.display = "none";
    } else {
      imgs[2].style.display = "initial";
      updateImageSrc(imgs[2]);
    }
  }
  
  function hideImage2(x) {
    if (x.matches) {
      imgs[1].style.display = "none";
    } else {
      imgs[1].style.display = "initial";
      updateImageSrc(imgs[1]);
    }
  }

function updateImageSrc(img) {
  if (count == imgarr.length) {
    count = 0;
  }
  img.src = imgarr[count];
  img.style.animation = "fadeIn 1s ease 1";
  count++;
}

function updateImage() {
  imgs.forEach((img) => {
    if (img.style.display == "none") return;
    updateImageSrc(img);
    setTimeout(() => {
      img.style.animation = "fadeOut 1s ease 1";
    }, 4000);
  });
  setTimeout(updateImage, 5000);
}


updateArray();

var img3 = window.matchMedia("(max-width: 1600px)");
var img2 = window.matchMedia("(max-width: 1040px)");

img3.addEventListener("change", hideImage3);
img2.addEventListener("change", hideImage2);