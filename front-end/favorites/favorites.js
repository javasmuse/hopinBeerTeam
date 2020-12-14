// Constants
const HEROKU_BACK_END_BASE_URL = "https://hopin-back-end.herokuapp.com"
const addFavBeerForm = document.getElementById("add-favorite-beer-form");
const favoriteBeerContainer = document.getElementById("favorites-container");
// Give our form submit functionality
addFavBeerForm.addEventListener('submit', addFavoriteBeer);
// Fill container on initial load
loadContainer(favoriteBeerContainer);

// Loads a container and fills it with
// user favorites data from heroku back end
// container -> a div container intending to hold child elements
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

// Adds a new favorite beer based on the user's
// input in the add beer form. Invoked when the 
// form is submitted.
// event -> the event that called this function
function addFavoriteBeer(event) {
    event.preventDefault();
    // Get the relevant data object
    let beerFormData = event.target;
    // Generate a random id for the new beer
    // TODO Change to back end implementation
    let id = randomNumberInRange(100, 10000);
    // Create all beer object fields
    let name = beerFormData[0].value;
    let imgUrl = beerFormData[1].value;
    let category = beerFormData[2].value;
    let abv = beerFormData[3].value;
    let type = beerFormData[4].value;
    let brewer = beerFormData[5].value;
    let country = beerFormData[6].value;
    let comments = [];

    // Create the new beer object
    let newBeer = new Beer(id, name, imgUrl, category,
        abv, type, brewer, country, comments);
    // Add the new beer object to heroku backend
    pushBeerObjToBackEnd(newBeer);
}

function editButtonCondition(beerEditBtn, listArray) {
    // Flip button's purpose and text to save
    beerEditBtn.innerHTML = "Save";
    // Create and display input fields
    for (let index = 0; index < listArray.length; index++) {
        let currElement = listArray[index];
        // Add inputs for children ending at the first button
        if (currElement.localName === "button") {
            // Condition where we hit the edit button itself
            // break loop
            break;
        }
        // Create an input for each child and place it adjacently after child
        let editInput = document.createElement("input");
        if (currElement.nextSibling) {
            currElement.parentNode.insertBefore(editInput, currElement.nextSibling);
        } else {
            currElement.parentNode.appendChild(editInput);
        }
    }
}

// Updates the beer data in heroku backend
// Invokved when the edit button is clicked
// Displays input fields next to beer information
// and sends/updates/puts new values into the backend
// when Save is clicked.
// beerEditBtn -> the edit button for each beer card
// newBeerCard -> the beer card element
function updateBeerFavoritesData(beerEditBtn, newBeerCard) {
    // Create array of children elements to iterate over
    const listItems = newBeerCard.children;
    const listArray = Array.from(listItems);
    // User clicks Edit initally
    if (beerEditBtn.innerHTML === "Edit") {
        editButtonCondition(beerEditBtn, listArray);

    } else {
        // User clicked save button
        beerEditBtn.innerHTML = "Edit";
        // Update back end data 
        let allEditInputs = newBeerCard.getElementsByTagName("input");
        let updatedBeerData = {
            name: allEditInputs[1].value,
            imgUrl: allEditInputs[2].value,
            category: allEditInputs[3].value,
            abv: allEditInputs[4].value,
            type: allEditInputs[5].value,
            brewer: allEditInputs[6].value,
            country: allEditInputs[7].value
        };
        let beerId = listArray[0].innerHTML;
        console.log(beerId);
        axios.put(`${HEROKU_BACK_END_BASE_URL}/user/favorites/${beerId}`,
                updatedBeerData)
            .then(function (response) {
                loadContainer(favoriteBeerContainer);
                alert(response.data);
            })
            .catch(function (error) {
                alert(error);
                console.log(error);
            });

    }
}

function createBeerCard(beerObj) {
    // Create a container element to hold a new beer card
    let newBeerCard = document.createElement("div");
    newBeerCard.className = "beer-card";
    // TODO Implement without showing id
    let beerIdElement = document.createElement("p");
    beerIdElement.class = "beer-id";
    beerIdElement.innerHTML = beerObj.id;
    newBeerCard.appendChild(beerIdElement);

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

    // Create a button to edit
    let beerEditBtn = document.createElement("button");
    beerEditBtn.innerHTML = "Edit";
    beerEditBtn.addEventListener("click", () => {
        updateBeerFavoritesData(beerEditBtn, newBeerCard);
    });
    newBeerCard.appendChild(beerEditBtn);

    // Create a button to delete
    let beerDeleteBtn = document.createElement("button");
    beerDeleteBtn.innerHTML = "Delete";
    beerDeleteBtn.addEventListener("click", () => {
        deleteBeerObjFromBackEnd(beerObj.id);
    });
    newBeerCard.appendChild(beerDeleteBtn);

    // Create, set value and append to parent the beer comments
    //TODO implement view for comments
    let beerCommentsElement = document.createElement("div");
    beerCommentsElement.innerHTML = "TODO - IMPLEMENT COMMENTS";
    newBeerCard.appendChild(beerCommentsElement);

    // Send back the created beer card with its children
    return newBeerCard;
}

function prependBeerCardToContainer(container, beerObj) {
    let beerCard = createBeerCard(beerObj);
    container.prepend(beerCard);
}

function pushBeerObjToBackEnd(beerObj) {
    axios.post(`${HEROKU_BACK_END_BASE_URL}/user/favorites`, beerObj)
        .then(function (response) {
            if (response.data === "success") {
                loadContainer(favoriteBeerContainer);
                alert("We added your new favorite beer!");
            }
        })
        .catch(function (error) {
            alert(error);
            console.log(error);
        });
}

function deleteBeerObjFromBackEnd(beerId) {
    axios.delete(`${HEROKU_BACK_END_BASE_URL}/user/favorites/${beerId}`)
        .then(function (response) {
            // TODO CHECK FOR SUCCESS MSG - IMPLEMENT/VERIFY IN BACKEND
            loadContainer(favoriteBeerContainer);
            alert(response.data);
        })
        .catch(function (error) {
            alert(error);
            console.log(error);
        });

}


function randomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}


// Beer object template
// id is beer_id from api call
// name is name form api call
// imgUrl is image url from api call
// ... and so on
// exception is comments. initialize as
// empty array if no data is available
function Beer(id, name, imgUrl, category, abv,
    type, brewer, country, comments) {
    this.id = id;
    this.name = name;
    this.imgUrl = imgUrl;
    this.category = category;
    this.abv = abv;
    this.type = type;
    this.brewer = brewer;
    this.country = country;
    this.comments = comments;
}