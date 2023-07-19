const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');


//Unsplash API
const apiKey = 'sEFl7kU2nLSTYAInO-TBEe8uf3ZpkuX6CodiB_Cah-k';
const imageCount = 5;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imageCount}`;

//All photos Array
let photoArray = [];

let ready = 0;
let imageLoaded = 0;
let totalImage = 0;


function loadedImage(){
    imageLoaded++;
    if (imageLoaded === totalImage) {
        ready = true;
        count = 30;
        loader.hidden = true;
    }
    
}

//loadPhoto
function showImage() {
    imageLoaded = 0;
    totalImage = photoArray.length;
    
    photoArray.forEach((photos) => {
        const item = document.createElement('a');
        item.setAttribute('href', photos.links.html);
        item.setAttribute('target', '_blank');


        const img = document.createElement('img');
        img.setAttribute('src', photos.urls.regular);
        img.setAttribute('title', photos.alt_description);
        img.setAttribute('alt', photos.alt_description);


        loadedImage();
        // item.appendChild(img);
        item.appendChild(img);
        imageContainer.appendChild(item);
    });

}



//get Photo from api
async function getPhoto(){
    try {
        const response = await fetch(apiUrl);
        photoArray = await response.json();  
        showImage();
        
    } catch (error) {
        console.log(error);
    }
    
}

window.addEventListener('scroll',() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight-1000 && ready){
        getPhoto();
        ready = false;
    }
})



//get photo
getPhoto();