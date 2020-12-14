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

function randomTwelveBeers() {
    axios.get("http://ontariobeerapi.ca/beers").then((res) => {
        let beers = res.data;
        let beerArray = [];

        for (let i = 0; i < 12; i++) {
            let num = Math.floor(Math.random() * beers.length);
            beerArray.push(beers[num]);
        }
        displayCards(beerArray);
    });
}
randomTwelveBeers();



function displayCards(beerRequested) {
    // loop through the beer array sent in and make cards for each beer
    for (let i = 0; i < beerRequested.length; i++) {

        // create new CARD
        let beerCard = document.createElement("div");
        beerCard.setAttribute("class", "flip_card");
        document.getElementById("cards").appendChild(beerCard);

        let innerCard = document.createElement("div");
        innerCard.setAttribute("class", "card_inner");
        beerCard.appendChild(innerCard);

        // append below to this ^ new card and the CSS for flip also
        // let newCard = document.createElement("div");
        // newCard.setAttribute("id", "new_card");
        // document.getElementById("bc_front").appendChild(newCard);

        let cardFront = document.createElement("div");
        cardFront.setAttribute("class", "card_front");
        innerCard.appendChild(cardFront);

        let cardBack = document.createElement("div");
        cardBack.setAttribute("class", "card_back");
        innerCard.appendChild(cardBack);
        // check photo url for 404 if yes sub in static pic
        axios.get(beerRequested[i].image_url).then((res) => {

            let photoURL = beerRequested[i].image_url;
            let image = document.createElement("img");
            image.src = photoURL;
            image.setAttribute("class", "cardImage");
            cardFront.appendChild(image);
        }).catch(error => {
            let image = document.createElement("img");
            image.src = "../resources/default_beer_image_HOPin.png";
            image.setAttribute("class", "cardImage");
            cardFront.appendChild(image);
        });


        let insertName = document.createElement("p");
            insertName.setAttribute("id", "name");
            insertName.innerHTML = `Name: ${beerRequested[i].name}`;
            cardBack.appendChild(insertName);


            let insertStyle = document.createElement("p");
            insertStyle.setAttribute("id", "style");
            insertStyle.innerHTML = `Style: ${beerRequested[i].style}`;
            cardBack.appendChild(insertStyle);


            let insertABV = document.createElement("p");
            insertABV.setAttribute("id", "abv");
            insertABV.innerHTML = `ABV:  ${beerRequested[i].abv}%`;
            cardBack.appendChild(insertABV);


            let insertPlace = document.createElement("p");
            insertPlace.setAttribute("id", "place");
            insertPlace.innerHTML = `Country: ${beerRequested[i].country}`;
            cardBack.appendChild(insertPlace);


            let insertBrewer = document.createElement("p");
            insertBrewer.setAttribute("id", "brewer");
            insertBrewer.innerHTML = `Brewer: ${beerRequested[i].brewer}`;
            cardBack.appendChild(insertBrewer);

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
            // build beer card and\
            let favorites = response.data;
                displayFavCards(favorites);
                console.log(favorites);
        })
        .catch(function (error) {
            alert(error);
            console.log(error);
        });
}




function displayFavCards(beerRequested) {
    // loop through the beer array sent in and make cards for each beer
    for (let i = 0; i < beerRequested.length; i++) {

        // create new CARD
        let beerCard = document.createElement("div");
        beerCard.setAttribute("class", "flip_card");
        document.getElementById("favorites_Container").appendChild(beerCard);

        let innerCard = document.createElement("div");
        innerCard.setAttribute("class", "card_inner");
        beerCard.appendChild(innerCard);

        // append below to this ^ new card and the CSS for flip also
        // let newCard = document.createElement("div");
        // newCard.setAttribute("id", "new_card");
        // document.getElementById("bc_front").appendChild(newCard);

        let cardFront = document.createElement("div");
        cardFront.setAttribute("class", "card_front");
        innerCard.appendChild(cardFront);

        let cardBack = document.createElement("div");
        cardBack.setAttribute("class", "card_back");
        innerCard.appendChild(cardBack);
        // check photo url for 404 if yes sub in static pic
        axios.get(beerRequested[i].image_url).then((res) => {

            let photoURL = beerRequested[i].image_url;
            let image = document.createElement("img");
            image.src = photoURL;
            image.setAttribute("class", "cardImage");
            cardFront.appendChild(image);
        }).catch(error => {
            let image = document.createElement("img");
            image.src = "../resources/default_beer_image_HOPin.png";
            image.setAttribute("class", "cardImage");
            cardFront.appendChild(image);
        });


        let insertName = document.createElement("p");
            insertName.setAttribute("id", "name");
            insertName.innerHTML = `Name: ${beerRequested[i].name}`;
            cardBack.appendChild(insertName);


            let insertStyle = document.createElement("p");
            insertStyle.setAttribute("id", "style");
            insertStyle.innerHTML = `Style: ${beerRequested[i].style}`;
            cardBack.appendChild(insertStyle);


            let insertABV = document.createElement("p");
            insertABV.setAttribute("id", "abv");
            insertABV.innerHTML = `ABV:  ${beerRequested[i].abv}%`;
            cardBack.appendChild(insertABV);


            let insertPlace = document.createElement("p");
            insertPlace.setAttribute("id", "place");
            insertPlace.innerHTML = `Country: ${beerRequested[i].country}`;
            cardBack.appendChild(insertPlace);


            let insertBrewer = document.createElement("p");
            insertBrewer.setAttribute("id", "brewer");
            insertBrewer.innerHTML = `Brewer: ${beerRequested[i].brewer}`;
            cardBack.appendChild(insertBrewer);

    }

}