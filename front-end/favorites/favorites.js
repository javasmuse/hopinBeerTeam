// DONT WORRY ABOUT CSS FOR NOW!!!
const HEROKU_BACK_END_BASE_URL = "https://hopin-back-end.herokuapp.com"
const addFavBeerForm = document.getElementById("add-favorite-beer-form");
const favoriteBeerContainer = document.getElementById("favorites-container");
favoriteBeerContainer.addEventListener("load", loadFavoritesContainer);
addFavBeerForm.addEventListener('submit', addFavoriteBeer);

function loadFavoritesContaier() {

}


function addFavoriteBeer(event) {
    event.preventDefault();
    console.log(event);
    console.log(event.target);
    let beerFormData = event.target;

    let id = randomNumberInRange(100, 10000);
    let name = beerFormData[0].value;
    let imgUrl = beerFormData[1].value;
    let category = beerFormData[2].value;
    let abv = beerFormData[3].value;
    let type = beerFormData[4].value;
    let brewer = beerFormData[5].value;
    let country = beerFormData[6].value;
    let comments = [];

    let newBeer = new Beer(id, name, imgUrl, category,
        abv, type, brewer, country, comments);
    // add the new beer object to heroku backend
    pushBeerObjToBackEnd(newBeer);
    // add beer to view
    prependBeerCardToContainer(favoriteBeerContainer, newBeer);
}

function updateBeerObj() {
    //put request
    // get new data
    // refresh container
}

function createBeerCard(beerObj) {
    // Create a container element to hold a new beer card
    let newBeerCard = document.createElement("div");
    newBeerCard.className = "beer-card";
    // Create, set value and append to parent the beer name
    let beerNameElement = document.createElement("h3");
    beerNameElement.textContent = beerObj.name;
    newBeerCard.appendChild(beerNameElement);

    // Create, set value and append to parent the image url
    let beerImageElement = document.createElement("img");
    beerImageElement.src = beerObj.imgUrl;
    newBeerCard.appendChild(beerImageElement);

    // Create, set value and append to parent the beer category
    let beerCategoryElement = document.createElement("p");
    beerCategoryElement.innerHTML = beerObj.category;
    newBeerCard.appendChild(beerCategoryElement);

    // Create, set value and append to parent the beer abv
    let beerAbvElement = document.createElement("p");
    beerAbvElement.innerHTML = beerObj.abv;
    newBeerCard.appendChild(beerAbvElement);

    // Create, set value and append to parent the beer type
    let beerTypeElement = document.createElement("p");
    beerTypeElement.innerHTML = beerObj.type;
    newBeerCard.appendChild(beerTypeElement);

    // Create, set value and append to parent the beer brewer
    let beerBrewerElement = document.createElement("p");
    beerBrewerElement.innerHTML = beerObj.brewer;
    newBeerCard.appendChild(beerBrewerElement);

    // Create, set value and append to parent the beer country
    let beerCountryElement = document.createElement("p");
    beerCountryElement.innerHTML = beerObj.country;
    newBeerCard.appendChild(beerCountryElement);

    // Create, set value and append to parent the beer comments
    //TODO implement view for comments
    let beerCommentsElement = document.createElement("div");
    beerCommentsElement.innerHTML = "TODO - IMPLEMENT COMMENTS";
    newBeerCard.appendChild(beerCommentsElement);

    // Send back the created beer card with its children
    return newBeerCard;
}

function prependBeerCardToContainer(container, beerObj) {
    let beerCard = createBeerCard(beerObj);
    container.prepend(beerCard);
}

function pushBeerObjToBackEnd(beerObj) {
    axios.post(`${HEROKU_BACK_END_BASE_URL}/user/favorites`, beerObj)
        .then(function (response) {
            if (response.data === "success") {
                alert("We added your new favorite beer!");
            }
            console.log(response);
        })
        .catch(function (error) {
            alert(error);
            console.log(error);
        });
}

function randomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}


// Beer object template
// id is beer_id from api call
// name is name form api call
// imgUrl is image url from api call
// ... and so on
// exception is comments. initialize as
// empty array if no data is available
function Beer(id, name, imgUrl, category, abv,
    type, brewer, country, comments) {
    this.id = id;
    this.name = name;
    this.imgUrl = imgUrl;
    this.category = category;
    this.abv = abv;
    this.type = type;
    this.brewer = brewer;
    this.country = country;
    this.comments = comments;
}