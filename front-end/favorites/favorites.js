// DONT WORRY ABOUT CSS FOR NOW!!!
var addFavBeerForm = document.getElementById("add-favorite-beer-form");
addFavBeerForm.addEventListener('submit', addFavoriteBeer);

function addFavoriteBeer(event) {
    event.preventDefault();
    console.log(event);
    console.log(event.target);
    let beerFormData = event.target;
    let newBeer = new BeerCon
    if (beerFormData[0].value !== undefined) {

    }


}

function pushBeerObjToBackEnd(beerObj) {
    //TODO push to heroku
}



function BeerConstructor(id, name, imgUrl, category, abv,
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