const formElement = document.getElementById("dino-compare");
const formName = "human-form";
formElement.name = formName;
const dinoObjects = [];
let tileObjects = [];
let humanObject = {};

// Load JSON Data
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
  this.heightInInches = humanData.feet * 12 + humanData.inches;
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
    const feet = Number(document.getElementById("feet").value);
    const inches = Number(document.getElementById("inches").value);
    const weight = Number(document.getElementById("weight").value);
    const diet = document.getElementById("diet").value.toLowerCase();

    return {
      name,
      feet,
      inches,
      weight,
      diet,
    };
  })();

// Create Dino Compare Method 1
Dinosaur.prototype.compareDiet = function () {
  return `The ${this.species} was a ${this.diet}, ${
    this.diet === humanObject.diet ? "just like you!" : "unlike you!"
  }`;
};

// Create Dino Compare Method 2
Dinosaur.prototype.compareHeight = function () {
  let heightComparisonFact;

  if (this.height > humanObject.heightInInches) {
    heightComparisonFact = `That's ${
      this.height - humanObject.heightInInches
    } inches taller than you!`;
  } else if (this.height < humanObject.heightInInches) {
    heightComparisonFact = `That means you are taller by ${
      humanObject.heightInInches - this.height
    } inches!`;
  } else if (this.height === humanObject.heightInInches) {
    heightComparisonFact = "You are identical in height.";
  }

  return `This ${this.species} was ${this.height} inches tall.  ${heightComparisonFact}`;
};

// Create Dino Compare Method 3
Dinosaur.prototype.compareWeight = function () {
  let weightComparisonFact;

  if (this.weight > humanObject.weight) {
    weightComparisonFact = `That's ${
      this.weight - humanObject.weight
    } lbs heavier than you!`;
  } else if (this.weight < humanObject.weight) {
    weightComparisonFact = `That means you are heavier by ${
      humanObject.weight - this.weight
    }lbs!`;
  } else if (this.weight === humanObject.weight) {
    weightComparisonFact = "You weigh the same.";
  }

  return `This ${this.species} was ${this.weight} lbs.  ${weightComparisonFact}`;
};

// Generate Tiles
const generateTiles = () => {
  humanObject = createHumanObject(getFormData());

  dinoObjects.forEach((dinoObject) => {
    const { species, where, when, fact } = dinoObject;
    const dinoFacts = [
      dinoObject.compareWeight(),
      dinoObject.compareHeight(),
      dinoObject.compareDiet(),
      `This species existed in ${where}`,
      `This species existed in the ${when} time period`,
      fact,
    ];

    const dinoTile = document.createElement("div");
    dinoTile.className = "grid-item";
    dinoTile.innerHTML = `<h3>${species}</h3><img src='./images/${species.toLowerCase()}.png' /><p>${
      species === "Pigeon"
        ? fact
        : dinoFacts[Math.floor(Math.random() * dinoFacts.length)]
    }</p>`;

    tileObjects.push(dinoTile);
  });

  // Shuffle the tileObjects array
  tileObjects = tileObjects
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  const humanTile = document.createElement("div");
  humanTile.className = "grid-item";
  humanTile.innerHTML = `<h3>${humanObject.name}</h3><img src='./images/human.png' />`;

  // BEFLORE NOTE: 4 is hardcoded middle index.
  // NOTE Cont'd: Refactor so there is no hardcoded index
  tileObjects.splice(4, 0, humanTile);
};

// Validate form
const isFormValid = () => {
  const form = document.forms[formName];
  const name = form.name.value.trim();
  const feet = form.feet.value.trim();
  const inches = form.inches.value.trim();
  const weight = form.weight.value.trim();
  const diet = form.diet.value.trim();

  if (!name || !feet || !inches || !weight || !diet) {
    alert("Form is not complete - Please fill out all fields then try again!");
    return false;
  }

  return true;
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
  formElement.style.display = "none";
};

// On button click, prepare and display infographic
const compareButtonHandler = (event) => {
  if (isFormValid()) {
    generateTiles();
    addTilesToDom();
    hideForm();
  }
};
const compareButton = document.getElementById("btn");
compareButton.addEventListener("click", compareButtonHandler);
