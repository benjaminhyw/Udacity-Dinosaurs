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
  this.height = humanData.height;
  this.weight = humanData.weight;
  this.diet = humanData.diet;
}

// Create Dino Objects

// Create Human Object

// Use IIFE to get human data from form
const getHumanData = () => {};

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.

// Generate Tiles for each Dino in Array

// Add tiles to DOM

// Remove form from screen

// On button click, prepare and display infographic
const compareButtonHandler = (event) => {
  console.log("Button was clicked");
};
const compareButton = document.getElementById("btn");
compareButton.addEventListener("click", compareButtonHandler);
