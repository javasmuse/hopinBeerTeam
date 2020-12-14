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
            // displayCards(beerList);  --- uncomment this when line 53 works 
            console.log(beerList);

        }
    });

    function displayCards(beerRequested) {
        // loop through the beer array sent in and make cards for each beer
        for (let i = 0; i < beerRequested.length; i++) {

            // create new CARD
            let beerCard = document.createElement("div");
            beerCard.setAttribute("id", "bee_Card");
            document.getElementById("bc_inner").appendChild(beerCard);

            // append below to this ^ new card and the CSS for flip also
            // let newCard = document.createElement("div");
            // newCard.setAttribute("id", "new_card");
            // document.getElementById("bc_front").appendChild(newCard);


            axios.get(beerRequested[i].image_url).then((res) => {

                let photoURL = beerRequested[i].image_url;
                let image = document.createElement("img");
                image.src = photoURL;
                document.getElementById("bee_Card").appendChild(image);
            }).catch(error => {
                const staticImage = ("https://upload.wikimedia.org/wikipedia/commons/e/eb/Volles_Pint-Glas.jpg");
                let image = document.createElement("img");
                image.src = staticImage;
                document.getElementById("bee_Card").appendChild(image);
            });


            let nextCard = document.createElement("div");
            nextCard.setAttribute("id", "next_card");
            document.getElementById("bee_Card").appendChild(nextCard);

            let insertName = document.createElement("p");
            insertName.setAttribute("id", "name");
            insertName.innerHTML = `Name: ${beerRequested[i].name}`;
            document.getElementById("bee_Card").appendChild(insertName);

            // let insertHereName = document.getElementById("name");
            // insertHereName.innerHTML = "Name:  " + beerRequested[i].name;

            let insertStyle = document.createElement("p");
            insertStyle.setAttribute("id", "style");
            insertStyle.innerHTML = `Name: ${beerRequested[i].style}`;
            document.getElementById("bee_Card").appendChild(insertStyle);

            // let insertHereStyle = document.getElementById("style");
            // insertHereStyle.innerHTML = "Style:  " + beerRequested[i].type;

            let insertABV = document.createElement("p");
            insertABV.setAttribute("id", "abv");
            insertABV.innerHTML = `Name: ${beerRequested[i].abv}`;
            document.getElementById("bee_Card").appendChild(insertABV);

            // let insertHereABV = document.getElementById("abv");
            // insertHereABV.innerHTML = `ABV: ${beerRequested[i].abv}%`;

            let insertPlace = document.createElement("p");
            insertPlace.setAttribute("id", "place");
            insertPlace.innerHTML = `Name: ${beerRequested[i].country}`;
            document.getElementById("next_card").appendChild(insertPlace);

            // let inHereCountry = document.getElementById("place");
            // inHereCountry.innerHTML = `Origin: ${beerRequested[i].country}`;

            let insertBrewer = document.createElement("p");
            insertBrewer.setAttribute("id", "brewer");
            insertBrewer.innerHTML = `Name: ${beerRequested[i].brewer}`;
            document.getElementById("next_card").appendChild(insertBrewer);

            // let insertHereBrewer = document.getElementById("brewer");
            // insertHereBrewer.innerHTML = `Brewed by:  ${beerRequested[i].brewer}`;
        }

    }

    function randomTenBeers() {
        axios.get("http://ontariobeerapi.ca/beers").then((res) => {
            let beers = res.data;
            let beerArray = [];

            for (let i = 0; i < 10; i++) {
                let num = Math.floor(Math.random() * beers.length);
                beerArray.push(beers[num]);
            }
            // console.log(beerArray);
            // displayCards(beerArray);
        });
    }

    randomTenBeers();

    document.getElementById("cellar_reset").addEventListener("click", reset);

    function reset() {
        document.getElementById("search-beers").reset();
    }
}