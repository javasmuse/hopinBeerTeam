document.getElementById("cellar_search").addEventListener("click", getBeers);

let bType = document.getElementById("beer_type").value;
let bCountry = document.getElementById("country").value;
let bName = document.getElementById("beer_name").value;

function getBeers(event) {
    event.preventDefault(event);

    axios.get("http://ontariobeerapi.ca/beers").then((res) => {
        let beer = res.data;
        // console.log(beer);

        let lagers = beer.filter(bee => bee.type === "Lager");
        console.log(lagers);
    });
}