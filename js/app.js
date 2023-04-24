// 563492ad6f91700001000001d6605cd8b33f45838e4cf1e6dfa408f9
//Selectors
const auth = "563492ad6f91700001000001d6605cd8b33f45838e4cf1e6dfa408f9";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
let fetchLink; 
let searchValue;
let page = 1;
const more = document.querySelector(".more");
let currentSearch;


//Event Listeners
searchInput.addEventListener("input", updateInput);
form.addEventListener("submit", (e) =>{
    e.preventDefault();
    currentSearch = searchValue;
    searchPhotos(searchValue);
})
more.addEventListener("click", loadMore);

//Update input
function updateInput(e){
    searchValue = e.target.value;
}


//Fetch API
async function fetchApi(url){
   const dataFetch = await fetch(url,{
    method :"Get",
    headers:{
        Accept:"application/json",
        Authorization:auth,

    },
   });
   const data = await dataFetch.json();
   return data;
}

// Generate picture
function generatePictures(data){
data.photos.forEach(photo => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `
     <div class="gallery-info">
     <p>${photo.photographer}</p>
     <a href=" ${photo.src.large}" target="_blank">Download</a>
     </div>
    <img src="${photo.src.large}"></img>
    `;
    gallery.appendChild(galleryImg);
});
}

//Curated photos
async function curatedPhotos(){
    fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";
    const data = await fetchApi(fetchLink);
    generatePictures(data);
}
curatedPhotos();

//Clear
function clear(){
    gallery.innerHTML = "";
    searchInput.innerHTML = "";
}

//Search Photos
async function searchPhotos(query){
  clear();
  fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`;
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}
//Load more
async function loadMore(){
    page++;
    if(currentSearch){
        fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=${page}`;
       
    }else{
        fetchLink =`https://api.pexels.com/v1/curated?per_page=15&page=${page}`; 
    }
    const data = await fetchApi(fetchLink);
    generatePictures(data);
}
