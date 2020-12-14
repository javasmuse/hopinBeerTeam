// document.getElementById("getAll").addEventListener("click", getAllBeers);

function getAllBeers(event) {
    event.preventDefault(event);

    axios.get("http://ontariobeerapi.ca/beers").then((res) => {
        let beers = res.data;
        console.log(beers);
    });
}

function randomTenBeers() {
    axios.get("http://ontariobeerapi.ca/beers").then((res) => {
        let beers = res.data;
        let beerArray = [];

        for (let i = 0; i < 10; i++) {
            let num = Math.floor(Math.random() * beers.length);
            beerArray.push(beers[num]);
        }
        console.log(beerArray);
    });
}

randomTenBeers();

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

            console.log(beerName[0].name);
            let photoURL = beerName[0].image_url;


            let image = document.getElementById("photoHere");
            image.src = photoURL;

            let insertHereName = document.getElementById("name");
            insertHereName.innerHTML = "Name:  " + beerName[0].name;

            let insertHereStyle = document.getElementById("style");
            insertHereStyle.innerHTML = "Style:  " + beerName[0].type;

            let insertHereABV = document.getElementById("abv");
            insertHereABV.innerHTML = `ABV: ${beerName[0].abv}%`;

            let inHereCountry = document.getElementById("place");
            inHereCountry.innerHTML = `Origin: ${beerName[0].country}`;

            let insertHereBrewer = document.getElementById("brewer");
            insertHereBrewer.innerHTML = `Brewed by:  ${beerName[0].brewer}`;



        } else if (bName === "" && bType !== "" && bCountry === "") {
            let beerType = beers.filter((bee) => bee.type === bType);
            console.log(beerType);
        } else if (bName === "" && bType === "" && bCountry !== "") {
            let beerCountry = beers.filter((bee) => bee.country === bCountry);
            console.log(beerCountry);
        } else if (bName === "" && bType !== "" && bCountry !== "") {
            let beerList = beers.filter(
                (bee) => bee.country === bCountry && bee.type === bType
            );
            // console.log(beerList);
            // console.log(beerList[0].name);

        }
    });

    document.getElementById("cellar_reset").addEventListener("click", reset);

    function reset() {
        document.getElementById("search-beers").reset();
    }
}