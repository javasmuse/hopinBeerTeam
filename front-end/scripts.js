document.getElementById("cellar_search").addEventListener("click", getBeers);

let bType = document.getElementById("beer_type").value;
let bCountry = document.getElementById("country").value;
let bName = document.getElementById("beer_name").value;

function getBeers(event) {
    event.preventDefault(event);

<<<<<<< HEAD
    axios.get("http://ontariobeerapi.ca/beers").then((res) => {
        let beer = res.data;
        // console.log(beer);

        let lagers = beer.filter(bee => bee.type === "Lager");
        console.log(lagers);
    });
}
=======

    axios.get("http://ontariobeerapi.ca/beers").then((res) => {
            let beer = res.data;
            // console.log(beer);




            let lagers = beer.filter(bee => bee.type === "Lager");
            console.log(lagers);
        }





    });

function overAge() {
    const container = document.getElementById("ageVer");
    container.remove();
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
    exitButton.addEventListener("click", function(event) {
        window.open("https://parents.caprisun.com/");
        window.close();
    });
    container.appendChild(exitButton);
    // Append container to body;
    page.appendChild(container);
};
>>>>>>> 45693231687fa6fbf9f1c1c7910590c746d33d79
