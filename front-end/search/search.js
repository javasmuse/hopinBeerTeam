//ADDED VERIFICATION

const ofAge = localStorage.getItem("ofAge")
if (ofAge !== undefined && ofAge === "yes") {
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


// document.getElementById("getAll").addEventListener("click", getAllBeers);
const HEROKU_BACK_END_BASE_URL = "https://hopin-back-end.herokuapp.com";


// filtered beer search
document.getElementById("cellar_search").addEventListener("click", getBeers);

function getBeers(event) {
    event.preventDefault(event);

    axios.get("https://ontariobeerapi.ca/beers").then((res) => {
        //Here we will put a filter to return only the beers requested
        let beers = res.data;

        // set values to search for from user form
        let bType = document.getElementById("beer_type").value;
        let bName = document.getElementById("beer_name").value;
        let bCountry = document.getElementById("country").value;

        // if every field is blank send user a response to enter at least one field
        if (bName === "" && bType === "" && bCountry === "") {
            // let noticeEmpty = "Please enter at least one field";
            // document.getElementById("addInfoToYourForm").innerHTML = noticeEmpty;
            window.alert("Please enter at least one field to search.");

            // if only the name field is entered return all beers with that name
        } else if (bName !== "" && bType === "" && bCountry === "") {
            let beerName = beers.filter((bee) => bee.name === bName);
            displayCards(beerName);

            // if only the type field is entered return all beers with that type
        } else if (bName === "" && bType !== "" && bCountry === "") {
            let beerType = beers.filter((bee) => bee.type === bType);
            displayCards(beerType);


            // if only country field then return all from that country
        } else if (bName === "" && bType === "" && bCountry !== "") {
            let beerCountry = beers.filter((bee) => bee.country === bCountry);
            displayCards(beerCountry);

            // if type and country filled in -- return only beers of both fields
        } else if (bName === "" && bType !== "" && bCountry !== "") {
            let beerList = beers.filter(
                (bee) => bee.country === bCountry && bee.type === bType
            );
            displayCards(beerList);

        }
    });

    // get all beers search
    document.getElementById("getAll").addEventListener("click", getAllBeers);

    function getAllBeers(event) {
        event.preventDefault(event);

        axios.get("http://ontariobeerapi.ca/beers").then((res) => {
            let beers = res.data;
            displayCards(beers);
            console.log(beers);
        });
    }


    // display search results
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
                image.setAttribute("id", "photoHere");
                image.src = photoURL;
                cardFront.appendChild(image);
            }).catch(error => {
                const staticImage = ("/front-end/resources/default_beer_image_HOPin.png");
                let image = document.createElement("img");
                image.setAttribute("id", "photoHere");
                image.src = staticImage;
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

            let detailsDiv = document.createElement("div");
            detailsDiv.setAttribute("id", "details");

            let postbtn = document.createElement("BUTTON");

            postbtn.innerHTML = "Add to Favorites";
            cardBack.appendChild(postbtn);

            postbtn.addEventListener("click", () => {
                pushBeerObjToBackEnd(beerRequested[i]);
            });

        }
    }

    // POST A BEER TO BACK END FAVORITES LIST
    function pushBeerObjToBackEnd(beerObj) {
        axios.post(`${HEROKU_BACK_END_BASE_URL}/user/favorites`, beerObj)
            .then(function (response) {
                if (response.data === "success") {
                    // loadContainer(document.getElementById("cards"));
                    alert("We added your new favorite beer!");
                }
            })
            .catch(function (error) {
                alert(error);
                console.log(error);
            });
    }

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

    // MOVED TO INDEX JS
    // function randomTenBeers() {
    //     axios.get("http://ontariobeerapi.ca/beers").then((res) => {
    //         let beers = res.data;
    //         let beerArray = [];

    //         for (let i = 0; i < 10; i++) {
    //             let num = Math.floor(Math.random() * beers.length);
    //             beerArray.push(beers[num]);
    //         }
    //         // displayCards(beerArray);
    //     });
    // }

    // randomTenBeers();

    document.getElementById("cellar_reset").addEventListener("click", reset);

    function reset() {
        document.getElementById("search-beers").reset();
    }
}