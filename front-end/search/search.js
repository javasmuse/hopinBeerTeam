// document.getElementById("getAll").addEventListener("click", getAllBeers);

function getAllBeers(event) {
    event.preventDefault(event);

    axios.get("http://ontariobeerapi.ca/beers").then((res) => {
        let beers = res.data;
        console.log(beers);
    });
}

document.getElementById("cellar_search").addEventListener("click", getBeers);

function getBeers(event) {
    event.preventDefault(event);

    axios.get("http://ontariobeerapi.ca/beers").then((res) => {
        //Here we will put a filter to return only the beers requested
        let beers = res.data;

        // set values to search for from user form
        let bType = document.getElementById("beer_type").value;
        let bName = document.getElementById("beer_name").value;
        let bCountry = document.getElementById("country").value;

        // if every field is blank send user a response to enter at least one field
        if (bName === "" && bType === "" && bCountry === "") {
            let noticeEmpty = "Please enter at least one field";
            document.getElementById("addInfoToYourForm").innerHTML = noticeEmpty;

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

            // let favoritesBtn = document.createElement("div");
            // favoritesBtn.setAttribute("class", "favoritesBtn");
            // favoritesBtn.setAttribute("type", "button");
            // favoritesBtn.textContent = "Add to Favorites";
            // cardBack.appendChild(favoritesBtn);
            // favoritesBtn.onclick = makeFavorite();

            // function makeFavorite() {
            //     console.log("on click");

            // }

            let postbtn = document.createElement("BUTTON");
            postbtn.value = beerRequested[i];
            postbtn.innerHTML = "Add to Favorites";
            cardBack.appendChild(postbtn);

            postbtn.addEventListener("click", adToFavs);

        }
    }

    function adToFavs(event) {
        event.preventDefault();
        console.log("beerRequested");

    }

    function randomTenBeers() {
        axios.get("http://ontariobeerapi.ca/beers").then((res) => {
            let beers = res.data;
            let beerArray = [];

            for (let i = 0; i < 10; i++) {
                let num = Math.floor(Math.random() * beers.length);
                beerArray.push(beers[num]);
            }
            // displayCards(beerArray);
        });
    }

    randomTenBeers();

    document.getElementById("cellar_reset").addEventListener("click", reset);

    function reset() {
        document.getElementById("search-beers").reset();
    }
}