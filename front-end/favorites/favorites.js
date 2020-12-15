// Constants
const HEROKU_BACK_END_BASE_URL = "https://hopin-back-end.herokuapp.com";
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
            alert("Sorry, we could not find your favorites. Try again later.");
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
    let image_url = beerFormData[1].value;
    let style = beerFormData[2].value;
    let abv = beerFormData[3].value;
    let brewer = beerFormData[4].value;
    let country = beerFormData[5].value;

    // Create the new beer object
    let newBeer = new Beer(id, name, image_url, style,
        abv, brewer, country);
    // Add the new beer object to heroku backend
    pushBeerObjToBackEnd(newBeer);
}

// Makes an axios call to add the beer object to
// heroku back end.  Reloads favorites container with 
// new updated data if a success response is received.
// beerObj -> the beer object to add
function pushBeerObjToBackEnd(beerObj) {
    axios.post(`${HEROKU_BACK_END_BASE_URL}/user/favorites`, beerObj)
        .then(function (response) {
            if (response.data === "success") {
                loadContainer(favoriteBeerContainer);
                alert("We added your new favorite beer!");
            }
        })
        .catch(function (error) {
            alert("Sorry, we could not add your beer. Try again later.");
            console.log(error);
        });
}

// Displays edit inputs next to beer cards child elements
// Allows user to update any or all fields for the favorite beer
// beerEditBtn -> the edit/save button object
// listArray -> the children of the beer card ie. name, abv etc.
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
        setPlaceHolderText(editInput, index);
        if (currElement.nextSibling) {
            currElement.parentNode.insertBefore(editInput, currElement.nextSibling);
        } else {
            currElement.parentNode.appendChild(editInput);
        }
    }
}

function setPlaceHolderText(inputElement, index) {
    switch (index) {
        case 0:
            inputElement.placeholder = "Enter a new name";
            break;
        case 1:
            inputElement.placeholder = "Choose a new image url";
            break;
        case 2:
            inputElement.placeholder = "Pick a new style";
            break;
        case 3:
            inputElement.placeholder = "Enter alcohol by volume";
            break;
        case 4:
            inputElement.placeholder = "Who is the brewer";
            break;
        case 5:
            inputElement.placeholder = "Country of origin";
            break;
        default:
            inputElement.placeholder = "Enter a new value";
    }

}

// Saves the current input values from editing to heroku back end
// Updates all values that are not undefined or empty strings
// Reloads the container when complete
// beerEditBtn -> the edit/save button object
// newBeerCard -> the beer card specific to this save call
// listArray -> the children of the beer card ie. name, abv etc.
function saveButtonCondition(beerEditBtn, newBeerCard, beerId) {
    // User clicked save button
    beerEditBtn.innerHTML = "Edit";
    // Update back end data 
    let allEditInputs = newBeerCard.getElementsByTagName("input");
    // Initialize new beer data
    let updatedBeerData = {
        name: allEditInputs[0].value,
        image_url: allEditInputs[1].value,
        style: allEditInputs[2].value,
        abv: allEditInputs[3].value,
        brewer: allEditInputs[4].value,
        country: allEditInputs[5].value,
    };
    // Update/put call to heroku back end
    axios.put(`${HEROKU_BACK_END_BASE_URL}/user/favorites/${beerId}`,
            updatedBeerData)
        .then(function (response) {
            // Reload container when complete and alert response to user
            loadContainer(favoriteBeerContainer);
            alert("We updated your changes!");
        })
        .catch(function (error) {
            alert("Sorry, we could not edit your beer. Try again later.");
            console.log(error);
        });
}

// Updates the beer data in heroku backend
// Invokved when the edit button is clicked
// Displays input fields next to beer information
// and sends/updates/puts new values into the backend
// when Save is clicked.
// beerEditBtn -> the edit button for each beer card
// newBeerCard -> the beer card element
function updateBeerFavoritesData(beerEditBtn, newBeerCard, beerId) {
    // Create array of children elements to iterate over
    const listItems = newBeerCard.children;
    const listArray = Array.from(listItems);
    // Same edit button is used for both conditions below
    // Behaves like a toggle switch
    // User clicks Edit
    if (beerEditBtn.innerHTML === "Edit") {
        editButtonCondition(beerEditBtn, listArray);
        return;
    }
    // User clicks Save
    if (beerEditBtn.innerHTML === "Save") {
        saveButtonCondition(beerEditBtn, newBeerCard, beerId);
        return;
    }
}

// Deletes the beer object from heroku back end.
// Uses the beer id to find the correct beer to delete
// beerId -> the id of the beer object to delete
function deleteBeerObjFromBackEnd(beerId) {
    axios.delete(`${HEROKU_BACK_END_BASE_URL}/user/favorites/${beerId}`)
        .then(function (response) {
            // TODO CHECK FOR SUCCESS MSG IMPLEMENT/VERIFY IN BACKEND
            loadContainer(favoriteBeerContainer);
            alert("We deleted that beer for you!");
        })
        .catch(function (error) {
            alert("Sorry, we could not delete your beer. Try again later.");
            console.log(error);
        });

}

// Helper function to generate numbers within
// a certain range.  Used to generate ids for beer objects.
// min - the lower bound value
// max - the upper bound value
function randomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}


// Beer object template
// id is beer_id from api call
// name is name form api call
// image_url is image url from api call
// ... and so on
// exception is comments. initialize as
// empty array if no data is available
function Beer(id, name, image_url, style, abv, brewer, country) {
    this.id = id;
    this.name = name;
    this.image_url = image_url;
    this.style = style;
    this.abv = abv;
    this.brewer = brewer;
    this.country = country;
}

// Creates the entire beer card
// Creates child elements/nodes based
// on the beer object and its fields 
// beerObj -> the beer object data to populate
function createBeerCard(beerObj) {
    // Create a container element to hold a new beer card
    let newBeerCard = document.createElement("div");
    newBeerCard.className = "beer-card";
    newBeerCard.style.backgroundColor = "rgba(22,22,22,0.9)";
    // TODO Implement without showing id -- deleted by commenting out
    // let beerIdElement = document.createElement("p");
    // beerIdElement.class = "beer-id";
    // beerIdElement.innerHTML = beerObj.id;
    // newBeerCard.appendChild(beerIdElement);

    // Create, set value and append to parent the beer name
    let beerNameElement = document.createElement("h3");
    beerNameElement.setAttribute("id", "nameEl");
    beerNameElement.textContent = beerObj.name.toUpperCase();
    beerNameElement.innerHTML = `name: ${beerObj.name}`;
    newBeerCard.appendChild(beerNameElement);

    // Create, set value and append to parent the image url
    let beerImageElement = document.createElement("img");
    beerImageElement.setAttribute("id", "imgEl");
    beerImageElement.src = beerObj.image_url;
    newBeerCard.appendChild(beerImageElement);


    // Create, set value and append to parent the beer category
    let beerCategoryElement = document.createElement("p");
    beerCategoryElement.innerHTML = `cat: ${beerObj.category}`;
    newBeerCard.appendChild(beerCategoryElement);

    // Create, set value and append to parent the beer abv
    let beerAbvElement = document.createElement("p");
    beerAbvElement.innerHTML = `abv: ${beerObj.abv}%`;
    newBeerCard.appendChild(beerAbvElement);

    // Create, set value and append to parent the beer type
    let beerTypeElement = document.createElement("p");
    beerTypeElement.innerHTML = `style: ${beerObj.type}`;
    newBeerCard.appendChild(beerTypeElement);

    // Create, set value and append to parent the beer brewer
    let beerBrewerElement = document.createElement("p");
    beerBrewerElement.innerHTML = `brewer: ${beerObj.brewer}`;
  
    newBeerCard.appendChild(beerBrewerElement);

    // Create, set value and append to parent the beer country
    let beerCountryElement = document.createElement("p");

    beerCountryElement.innerHTML = `origin: ${beerObj.country}`;
  
    newBeerCard.appendChild(beerCountryElement);

    // Create a button to edit
    let beerEditBtn = document.createElement("button");
    beerEditBtn.innerHTML = "Edit";
    beerEditBtn.className = "yes";
    beerEditBtn.setAttribute("id", "buttonOne");
    beerEditBtn.addEventListener("click", () => {
        updateBeerFavoritesData(beerEditBtn, newBeerCard, beerObj.id);
    });
    newBeerCard.appendChild(beerEditBtn);

    // Create a button to delete
    let beerDeleteBtn = document.createElement("button");
    beerDeleteBtn.innerHTML = "Delete";
    beerDeleteBtn.className = "yes";
    beerDeleteBtn.setAttribute("id", "buttonTwo");

    beerDeleteBtn.addEventListener("click", () => {
        deleteBeerObjFromBackEnd(beerObj.id);
    });
    newBeerCard.appendChild(beerDeleteBtn);


    // Send back the created beer card with its children
    return newBeerCard;
}









//AGE VERIFICATION



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
//TODO ids
//TODO Center the header
//TODO Change edit response
//TODO Delete response back to user
//TODO Placeholder text for edit input fields
//TODO Response name 127.0.0.1:55000 (alert)
//TODO Check for duplicate 


//TODO Normalize the data being sent to back end
//TODO Change object "type" field to style when displaying
//TODO Remove comments for now
//TODO Add ratings