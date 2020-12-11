document.getElementById("getAll").addEventListener("click", getAllBeers);

function getAllBeers(event) {
  event.preventDefault(event);

  axios.get("http://ontariobeerapi.ca/beers").then((res) => {
    let beers = res.data;
    console.log(beers);
  });
}

document.getElementById("cellar_search").addEventListener("click", getBeers);
let bType = document.getElementById("beer_type").value;
let bName = document.getElementById("beer_name").value;
let bCountry = document.getElementById("country").value;

function getBeers(event) {
  event.preventDefault(event);

  axios.get("http://ontariobeerapi.ca/beers").then((res) => {
    //Here we will put a filter to return only the beers requested
  });
}
