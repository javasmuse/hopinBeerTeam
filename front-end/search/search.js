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
    let bType = document.getElementById("beer_type").value;
    let bName = document.getElementById("beer_name").value;
    let bCountry = document.getElementById("country").value;

    if (bName === "" && bType === "" && bCountry === "") {
      return console.log("Please enter at least one field");
    } else if (bName !== "" && bType === "" && bCountry === "") {
      let beerName = beers.filter((bee) => bee.name === bName);
      console.log(beerName);
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
      console.log(beerList);
    }
  });
}
