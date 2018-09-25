'use strict';


// Global variables that determine the number of options the users will be presented with, and the number 
// of times they will be asked to choose before the survey will end and the results will be displayed. 
var surveyChoices = 3;
var surveySize = 25;



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

var surveyCount = 0;

// Initializes array of all products
Product.allProducts = [];

// Creates Product object, using the given image filepath and name. Contains counters that store how many times
// this product has been shown and clicked on in the user survey. Adds each 
function Product (filepath, prodName) {
   this.prodName = prodName;
   this.imgSource = filepath;
   this.clicked = 0;
   this.shown = 0;
   Product.allProducts.push(this);
}



// Generates the product choices to be presented to the user and adds to the number of times a product has been shown.
function genProdChoices() {
    var choices = [];
    var choicePool = [];
    var prodPool = Product.allProducts;
    var randProd = 0;

    for (var i = 0; i < prodPool.length; i++) {
        choicePool.push(i);
    }

    for (var i = 0; i < choicePanes.length; i++) {
        randProd = Math.floor(Math.random() * choicePool.length);
        choices.push(prodPool[choicePool[randProd]]);
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

function clickProduct(index) {
    var index = index;
    currChoices[index].clicked++;
    surveyCount++;
    genProdChoices();
    if (surveyCount === surveySize) {
        showTable();
    }
}

function survey() {
        genProdChoices();
        console.log('current choices are ' + currChoices);
        choicePanes.forEach(function(pane, index) {
            pane.addEventListener('click', function(){clickProduct(index)});   
        });
            
        
        console.log('exited survey forEach loop');   
    //}
}

function killSurvey() {
    choicePanes.forEach(function(pane, index) {
        pane.removeEventListener('click', function(){clickProduct(index)});   
    });
}

function showTable() {
    killSurvey();
    surveyParent.innerHTML = '';
    console.log('entered showTable');
    var elUl = makeChild(surveyParent, 'ul', '');
    var prods = Product.allProducts;
    for (var i = 0; i < prods.length; i++) {
        makeChild(elUl, 'li', (prods[i].prodName + ' was shown ' + prods[i].shown + ' times, and chosen ' + prods[i].clicked + ' times.'));
    }
}

function makeChild(parent, childElementType, childText, childClass) {
    var el = document.createElement('' + childElementType);
    el.textContent = '' + childText;
    if (childClass) {
        el.classList.add('' + childClass);
    }
    parent.appendChild(el);
    return el;
}

new Product('img/banana.jpg', 'Child-Safe Banana Slicer');
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
