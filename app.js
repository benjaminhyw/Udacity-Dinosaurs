const dinoObjects = [];
const tileObjects = [];

function loadJSON(callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open("GET", "dino.json", true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

// Create Dino Constructor
function Dinosaur(dinoData) {
  this.species = dinoData.species;
  this.weight = dinoData.weight;
  this.height = dinoData.height;
  this.diet = dinoData.diet;
  this.where = dinoData.where;
  this.when = dinoData.when;
  this.fact = dinoData.fact;
}

// Create Human Constructor
function Human(humanData) {
  this.name = humanData.name;
  this.feet = humanData.feet;
  this.inches = humanData.inches;
  this.weight = humanData.weight;
  this.diet = humanData.diet;
}

// Create Dino Objects
loadJSON((text) => {
  const dinos = JSON.parse(text).Dinos;
  dinos.forEach((dinoObject) => {
    dinoObjects.push(new Dinosaur(dinoObject));
  });
});

// Create Human Object
const createHumanObject = (formData) => {
  return new Human(formData);
};

// Use IIFE to get human data from form
const getFormData = () =>
  (function () {
    const name = document.getElementById("name").value;
    const feet = document.getElementById("feet").value;
    const inches = document.getElementById("inches").value;
    const weight = document.getElementById("weight").value;
    const diet = document.getElementById("diet").value;

    return {
      name,
      feet,
      inches,
      weight,
      diet,
    };
  })();

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.

// Generate Tiles for each Dino in Array
const generateTiles = () => {
  const humanObject = createHumanObject(getFormData());
  console.log(humanObject);
  console.log(dinoObjects);

  dinoObjects.forEach((dinoObject) => {
    const dinoTile = document.createElement("div");
    dinoTile.className = "grid-item";
    dinoTile.innerHTML = `<h3>${dinoObject.species}</h3>`;

    tileObjects.push(dinoTile);
  });

  const humanTile = document.createElement("div");
  humanTile.className = "grid-item";
  humanTile.innerHTML = `<h3>${humanObject.name}</h3>`;

  // BEFLORE NOTE: 4 is hardcoded middle index.
  // NOTE Cont'd: Refactor so there is no hardcoded index
  // ALSO: This should happen AFTER DinoTiles have been generated, and we push in a human tile in the middle instead of object
  tileObjects.splice(4, 0, humanTile);
};

// Add tiles to DOM
const addTilesToDom = () => {
  const gridNode = document.getElementById("grid");
  tileObjects.forEach((tileObject) => {
    gridNode.appendChild(tileObject);
  });
};

// Remove form from screen
const hideForm = () => {
  const form = document.getElementById("dino-compare");
  form.style.display = "none";
};

// On button click, prepare and display infographic
const compareButtonHandler = (event) => {
  console.log("Button was clicked");
  generateTiles();
  addTilesToDom();
  hideForm();
};
const compareButton = document.getElementById("btn");
compareButton.addEventListener("click", compareButtonHandler);
