'use strict';

// Global variables that determine the number of options the users will be presented with, and the number 
// of times they will be asked to choose before the survey will end and the results will be displayed. 
var surveyChoices = 3;
var surveySize = 25;

// Creates reference to parent element where we will display our survey
var surveyParent = document.getElementsByClassName('choiceyChoices')[0];
console.log(surveyParent);

// Constructs clickable option cards that will display the products survey participants will choose from
for (var i = 0; i < surveyChoices; i++) {
    var elDiv = makeChild(surveyParent, 'div', '', 'choiceCard');
    makeChild(elDiv, 'img', '', 'choiceImg');
    makeChild(elDiv, 'p', 'Choice ' + (i + 1));
}

// Creates an array of all survey option cards
var choicePanes = [];
for (var i = 0; i < document.getElementsByClassName('choiceImg').length; i++) {
    choicePanes.push(document.getElementsByClassName('choiceImg')[i]);
}

// Creates an array to store the products currently displayed as survey options
var currChoices = [];

// Creates variable to store number of times user has responded to survey choices
var surveyCount = 0;

// Initializes array of all products
Product.allProducts = [];

// Creates Product object, using the given image filepath and name. Contains counters that store how many times
// this product has been shown and clicked on in the user survey.
function Product (filepath, prodName) {
   this.prodName = prodName;
   this.imgSource = filepath;
   this.clicked = 0;
   this.shown = 0;
   this.shownLast = false;
   Product.allProducts.push(this);
}

// Sets "shownLast" property for all Product objects to false
function resetShownLast() {
    for (var i = 0; i < Product.allProducts.length; i++) {
        Product.allProducts[i].shownLast = false;
    }
}

// Generates randomized, non-duplicate product choices to be presented to the user and adds to the number
// of times each displayed product has been shown.
function genProdChoices() {
    var choices = [];
    var choicePool = [];
    var prodPool = Product.allProducts;
    var randProd = 0;

    for (var i = 0; i < prodPool.length; i++) {
        if (!prodPool[i].shownLast) {
            choicePool.push(i);
        } 
    }

    resetShownLast();

    for (var i = 0; i < choicePanes.length; i++) {
        randProd = Math.floor(Math.random() * choicePool.length);
        choices.push(prodPool[choicePool[randProd]]);
        prodPool[choicePool[randProd]].shownLast = true;
        console.log(prodPool[choicePool[randProd]]);
        choicePool.splice(randProd, 1);
    }

    for (var i = 0; i < choicePanes.length; i++) {
        choicePanes[i].src = choices[i].imgSource;
        if (surveyCount < surveySize) {
            choices[i].shown++;
        }
        currChoices[i] = choices[i];
    }
}

// Called when a survey option is clicked on. Records that the function was clicked on using the 
// Product object's 'clicked' property, and reloads the survey with a new, randomized set of options.
// Once the user has answered the number of survey questions specified by the surveySize variable,
// Removes the survey and displays a list of data for each product.
function clickProduct(index) {
    var index = index;
    currChoices[index].clicked++;
    surveyCount++;
    genProdChoices();
    if (surveyCount === surveySize) {
        killSurvey();
        showTable();
    }
}

// Generates a randomized set of product options from available Product objects that will be used to survey
// user preferences. Adds event listeners to each survey option that call the clickProduct function to 
// record the user's choice and reloads new survey options every time an option is clicked on.
function survey() {
    genProdChoices();
    console.log('current choices are ' + currChoices);
    choicePanes.forEach(function(pane, index) {
        pane.addEventListener('click', function(){clickProduct(index)});   
    });
    console.log('exited survey forEach loop');   
}

// Removes event listeners from survey option cards.
function killSurvey() {
    choicePanes.forEach(function(pane, index) {
        pane.removeEventListener('click', function(){clickProduct(index)});   
    });
    surveyParent.innerHTML = '';
}

// Displays list of all products and how many times each has been shown by the survey and chosen by the user, respectively.
function showTable() {
    var elUl = makeChild(surveyParent, 'ul', '');
    var prods = Product.allProducts;
    for (var i = 0; i < prods.length; i++) {
        makeChild(elUl, 'li', (prods[i].prodName + ' was shown ' + prods[i].shown
        + ' times, and chosen ' + prods[i].clicked + ' times. Chosen ' + Math.floor(100 * prods[i].clicked / prods[i].shown)
         + '% of the time.'));
    }
}

// Creates new document element using given parameters for name, text content and optional class,
// appends it to given parent element, and 
function makeChild(parent, childElementType, childText, childClass) {
    var el = document.createElement('' + childElementType);
    el.textContent = '' + childText;
    if (childClass) {
        el.classList.add('' + childClass);
    }
    parent.appendChild(el);
    return el;
}

new Product('img/banana.jpg', 'Child-Safe Nanner Slicer');
new Product('img/bathroom.jpg', 'Restroom Distractor Stand');
new Product('img/boots.jpg', '"Has Fashion Finally Gone Too Far" Boots');
new Product('img/breakfast.jpg', 'Breakfast All-In-Why');
new Product('img/bubblegum.jpg', 'Meatball...bubblegum...');
new Product('img/chair.jpg', 'The "I Actually Hate My Back" Chair');
new Product('img/cthulhu.jpg', 'Cthulhu Arisen From Eternal Slumber');
new Product('img/dog-duck.jpg', 'Barkish to Quackese Translation Module');
new Product('img/dragon.jpg', '100% Authentic Dragon Meat');
new Product('img/pen.jpg', 'The Pen That\'s Mightier Than The Spork');
new Product('img/pet-sweep.jpg', 'Doggy Dignity Eliminator Shoes');
new Product('img/r2bag.jpg', 'R2D2 Taxidermy Bag');
new Product('img/scissors.jpg', 'Pizzanic Ritual Scissors');
new Product('img/shark.jpg', 'Tasty Human Morsels by Chef Sharkie');
new Product('img/tauntaun.jpg', 'Tauntaun Sleeping Bag with Integrated Smell Packet');
new Product('img/unicorn.jpg', '90% Authentic Unicorn Meat');
new Product('img/usb.gif', 'Descent into Lovecraftian Madness Flash Drive');
new Product('img/water-can.jpg', 'Escherian Watering Pail');
new Product('img/wine-glass.jpg', 'Industrial-Grade Wine Spiller');

survey();
