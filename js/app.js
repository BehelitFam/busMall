'use strict';

// Global variables that determine the number of options the users will be presented with, and the number 
// of times they will be asked to choose before the survey will end and the results will be displayed. 
var surveyChoices = 3;
var surveySize = 10;

// Creates reference to parent element where we will display our survey
var surveyParent = document.getElementsByClassName('choiceyChoices')[0];
console.log(surveyParent);

var resultsParent = document.getElementsByClassName('surveyData')[0];
console.log(resultsParent);

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
function Product (filepath, prodName, funName) {
   this.prodName = prodName;
   this.funName = funName;
   this.imgSource = filepath;
   this.clicked = 0;
   this.shown = 0;
   this.shownLast = false;
   Product.allProducts.push(this);
}

// Initializes a set of products to be used in the survey
function seedProducts() {
    new Product('img/banana.jpg', 'banana', 'Child-Safe Nanner Slicer');
    new Product('img/bathroom.jpg', 'bathroom', 'Restroom Distractor Stand');
    new Product('img/boots.jpg', 'boots', '"Has Fashion Finally Gone Too Far" Boots');
    new Product('img/breakfast.jpg', 'breakfast', 'Breakfast All-In-Why');
    new Product('img/bubblegum.jpg', 'bubblegum', 'Meatball...bubblegum...');
    new Product('img/chair.jpg', 'chair', 'The "I Actually Hate My Back" Chair');
    new Product('img/cthulhu.jpg', 'cthulhu', 'Cthulhu Arisen From Eternal Slumber');
    new Product('img/dog-duck.jpg', 'dog-duck', 'Barkish to Quackese Translation Module');
    new Product('img/dragon.jpg', 'dragon', '100% Authentic Dragon Meat');
    new Product('img/pen.jpg', 'pen', 'The Pen That\'s Mightier Than The Spork');
    new Product('img/pet-sweep.jpg', 'pet-sweep', 'Doggy Dignity Eliminator Shoes');
    new Product('img/r2bag.jpg', 'r2bag', 'R2D2 Taxidermy Bag');
    new Product('img/scissors.jpg', 'scissors', 'Pizzanic Ritual Scissors');
    new Product('img/shark.jpg', 'shark', 'Tasty Human Morsels by Chef Sharkie');
    new Product('img/tauntaun.jpg', 'tauntaun', 'Tauntaun Sleeping Bag with Integrated Smell Packet');
    new Product('img/unicorn.jpg', 'unicorn', '90% Authentic Unicorn Meat');
    new Product('img/usb.gif', 'usb', 'Descent into Lovecraftian Madness Flash Drive');
    new Product('img/water-can.jpg', 'water-can', 'Escherian Watering Pail');
    new Product('img/wine-glass.jpg', 'wine-glass', 'Industrial-Grade Wine Spiller');
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
    var choiceIndex = 0;

    for (var i = 0; i < prodPool.length; i++) {
        if (!prodPool[i].shownLast) {
            choicePool.push(i);
        } 
    }

    resetShownLast();

    for (var i = 0; i < choicePanes.length; i++) {
        randProd = Math.floor(Math.random() * choicePool.length);
        choiceIndex = choicePool[randProd];
        choices.push(prodPool[choiceIndex]);
        prodPool[choiceIndex].shownLast = true;
        choicePool.splice(randProd, 1);
    }

    for (var i = 0; i < choicePanes.length; i++) {
        choicePanes[i].src = choices[i].imgSource;
        if (surveyCount < surveySize) {
            choices[i].shown++;
        }
        currChoices[i] = choices[i];
        choicePanes[i].alt = currChoices[i].prodName;
    }
}

// Creates new document element using given parameters for name, text content and optional class,
// appends it to given parent element, and 
function makeChild(parent, childElementType, childText, childClass) {
    var el = document.createElement('' + childElementType);
    if (childText) {
        el.textContent = '' + childText;
    }
    if (childClass) {
        el.classList.add('' + childClass);
    }
    parent.appendChild(el);
    return el;
}

// Called when a survey option is clicked on. Records that the function was clicked on using the 
// Product object's 'clicked' property, and reloads the survey with a new, randomized set of options.
// Once the user has answered the number of survey questions specified by the surveySize variable,
// Removes the survey and displays a list of data for each product.
var clickProduct = function() {
    var chosenOne = searchProdsByName(this.alt);
    chosenOne.clicked++;
    surveyCount++;
    genProdChoices();
    if (surveyCount === surveySize) {
        surveyCompleted();
    }
}

// Searches the list of products and returns 
function searchProdsByName(productName) {
    var productName = productName;
    var prodRef;
    for (var i = 0; i < Product.allProducts.length; i++) {
        if (Product.allProducts[i].prodName === productName) {
            prodRef = Product.allProducts[i];
        }
    }
    return prodRef;
}

// Generates a randomized set of product options from available Product objects that will be used to survey
// user preferences. Adds event listeners to each survey option that call the clickProduct function to 
// record the user's choice and reloads new survey options every time an option is clicked on.
function survey() {
    genProdChoices();
    choicePanes.forEach(function(pane, index) {
        pane.addEventListener('click', clickProduct);   
    }); 
}

// Removes event listeners from survey option cards.
function killSurvey() {
    choicePanes.forEach(function(pane, index) {
        pane.removeEventListener('click', clickProduct); 
    });
}

// Displays list of all products and how many times each has been shown by the survey and chosen by the user, respectively.
function showList() {
    var elUl = makeChild(resultsParent, 'ul');
    var prods = Product.allProducts;
    var dataText = '';
    for (var i = 0; i < prods.length; i++) {
        dataText = prods[i].prodName + ' was shown ' + prods[i].shown
         + ' times, and chosen ' + prods[i].clicked + ' times. Chosen '
         + Math.ceil(100 * prods[i].clicked / (prods[i].shown + .00000001))
         + '% of the time.';
        makeChild(elUl, 'li', dataText);
    }
}

// Makes and returns array of all product names
function prodLabels() {
    var labels = [];
    var prods = Product.allProducts;
    for (var i = 0; i < prods.length; i++) {
        labels.push(prods[i].prodName);
    }
    console.log(labels);
    return labels;
}

// Makes and returns array of click counts for all products
function prodClickData() {
    var clicks = [];
    var prods = Product.allProducts;
    for (var i = 0; i < prods.length; i++) {
        clicks.push(prods[i].clicked);
    }
    console.log(clicks);
    return clicks;
}

// Returns a random rgb color value as a string
function randomColor() {
    var red = Math.floor(Math.random() * 255);
    var green = Math.floor(Math.random() * 255);
    var blue = Math.floor(Math.random() * 255);
    return 'rgb(' + red + ', ' + green + ', ' + blue + ')'
    
}

// Returns an array of specified length containing random rgb color values as strings
function randomColors(numColors) {
    var colorArray = [];
    if (numColors) {
        var i = 0;
        while (i < numColors) {
            colorArray.push(randomColor());
            i++;
        }
    }
    return colorArray;
}

// Creates a horizontal bar chart showing the number of times each product was clicked in the user survey
function showBarChart() {
    var prodNames = prodLabels();
    var clickData = prodClickData();

    var elBarChart = makeChild(resultsParent, 'canvas').getContext('2d');
    
    new Chart (elBarChart, {
        type: 'horizontalBar',
        data: {
            labels: prodNames,
            datasets: [{
                label: 'Number of Times Each Item was Clicked',
                backgroundColor: randomColor(),
                data: clickData
            }]
        },
        options: {
            responsive: false,
            maintainAspectRatio: true
        }
    });
}

// Creates a pie chart showing the percentage of clicks each Product received in the user survey
function showPieChart() {
    var prodNames = prodLabels();
    var clickData = prodClickData();

    var elPieChart = makeChild(resultsParent, 'canvas').getContext('2d');

    new Chart(elPieChart, {
        type: 'pie',
        data: {
            labels: prodNames,
            datasets: [{
                label: 'Percentage of Total Clicks',
                backgroundColor: randomColors(Product.allProducts.length),
                data: clickData
            }]
        },
        options: {
            responsive: false,
            maintainAspectRatio: true
        }
    });
}

function showCharts() {
    showBarChart();
    showPieChart();
}

function surveyCompleted() {
    killSurvey();
    showCharts();
}


seedProducts();
survey();
