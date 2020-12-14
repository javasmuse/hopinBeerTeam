const ofAge = localStorage.getItem("ofAge")
if(ofAge !== undefined && ofAge === "yes") {
    document.getElementById("ageVerBg").style.display = "none";
} else {
    //flash verification
}


function overAge() {
    const container = document.getElementById("ageVer");
    container.remove();
    const ageVerBg = document.getElementById("ageVerBg");
    ageVerBg.remove();

// store that user is above age
// have to be global enough, check if exists
// check if yes
    localStorage.setItem("ofAge", "yes");


};

function underAge() {
    const page = document.getElementsByTagName("body")[0];
    // Create container for underage;
    const container = document.createElement("div");
    container.classList.add("age_Verification");
    // Creates title and everything in it
    const titleSpan = document.createElement("span");
    titleSpan.classList.add("ageVerTitle");
    let title = document.createElement("h1");
    title.innerHTML = "Sorry!";
    titleSpan.appendChild(title);
    container.appendChild(titleSpan);
    // Create sorry message
    const bodySpan = document.createElement("span");
    bodySpan.classList.add("ageVerBody");
    let body = document.createElement("p");
    body.innerHTML = "Our site is for people of age only. Don't forget us though!";
    bodySpan.appendChild(body);
    container.appendChild(bodySpan);
    const exitButton = document.createElement("button");
    exitButton.classList.add("yes");
    exitButton.innerHTML = "Exit";
    exitButton.addEventListener("click", function (event) {
        window.open("https://parents.caprisun.com/");
        window.close();
    });
    container.appendChild(exitButton);
    // Append container to body;
    page.appendChild(container);
};

// randomizer stuff

function randomTenBeers() {
    axios.get("http://ontariobeerapi.ca/beers").then((res) => {
        let beers = res.data;
        let beerArray = [];

        for (let i = 0; i < 10; i++) {
            let num = Math.floor(Math.random() * beers.length);
            beerArray.push(beers[num]);
        }
        displayCards(beerArray);
    });
}
randomTenBeers();



function displayCards(beerRequested) {
    // loop through the beer array sent in and make cards for each beer
    for (let i = 0; i < beerRequested.length; i++) {

        // create new CARD
        let beerCard = document.createElement("div");
        beerCard.setAttribute("id", "flip_card");
        document.getElementById("cards").appendChild(beerCard);

        let innerCard = document.createElement("div");
        innerCard.setAttribute("id", "card_inner");
        document.getElementById("flip_card").appendChild(innerCard);

        // append below to this ^ new card and the CSS for flip also
        // let newCard = document.createElement("div");
        // newCard.setAttribute("id", "new_card");
        // document.getElementById("bc_front").appendChild(newCard);

        let cardFront = document.createElement("div");
        cardFront.setAttribute("id", "card_front");
        document.getElementById("card_inner").appendChild(cardFront);

        let cardBack = document.createElement("div");
        cardBack.setAttribute("id", "card_back");
        document.getElementById("card_inner").appendChild(cardBack);


        // check photo url for 404 if yes sub in static pic
        axios.get(beerRequested[i].image_url).then((res) => {

            let photoURL = beerRequested[i].image_url;
            let image = document.createElement("img");
            image.src = photoURL;
            image.setAttribute("class", "cardImage");
            document.getElementById("card_front").appendChild(image);
        }).catch(error => {
            let image = document.createElement("img");
            image.src = "../resources/default_beer_image_HOPin.png";
            image.setAttribute("class", "cardImage");
            document.getElementById("card_front").appendChild(image);
        });


        let insertName = document.createElement("p");
        insertName.setAttribute("id", "name");
        insertName.innerHTML = `Name: ${beerRequested[i].name}`;
        document.getElementById("card_back").appendChild(insertName);


        let insertStyle = document.createElement("p");
        insertStyle.setAttribute("id", "style");
        insertStyle.innerHTML = `Style: ${beerRequested[i].style}`;
        document.getElementById("card_back").appendChild(insertStyle);


        let insertABV = document.createElement("p");
        insertABV.setAttribute("id", "abv");
        insertABV.innerHTML = `ABV:  ${beerRequested[i].abv}%`;
        document.getElementById("card_back").appendChild(insertABV);


        let insertPlace = document.createElement("p");
        insertPlace.setAttribute("id", "place");
        insertPlace.innerHTML = `Country: ${beerRequested[i].country}`;
        document.getElementById("card_back").appendChild(insertPlace);


        let insertBrewer = document.createElement("p");
        insertBrewer.setAttribute("id", "brewer");
        insertBrewer.innerHTML = `Brewer: ${beerRequested[i].brewer}`;
        document.getElementById("card_back").appendChild(insertBrewer);

    }

}











//Favorites stuff

const HEROKU_BACK_END_BASE_URL = "https://hopin-back-end.herokuapp.com"
const favoriteBeerContainer = document.getElementById("favorites_Container");
// favoriteBeerContainer.addEventListener("load", loadFavoritesContainer);

loadContainer(favoriteBeerContainer);

function loadContainer(container) {
    // clear beer container
    container.innerHTML = "";
    axios.get(`${HEROKU_BACK_END_BASE_URL}/user/favorites`)
        .then(function (response) {
            // For all favorited beer objects from heroku
            // build beer card and
            response.data.map(favBeer => {
                let newBeerCard = createBeerCard(favBeer);
                container.appendChild(newBeerCard);
            });
        })
        .catch(function (error) {
            alert(error);
            console.log(error);
        });
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