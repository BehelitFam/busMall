'use strict';

var surveyChoices = 4;
var surveyParent = document.getElementsByClassName('choiceyChoices')[0];
console.log(surveyParent);

for (var i = 0; i < surveyChoices; i++) {
    var elDiv = makeChild(surveyParent, 'div', '', 'choiceCard');
    makeChild(elDiv, 'img', '', 'choiceImg');
    makeChild(elDiv, 'p', 'Choice ' + (i + 1));
}

var choicePanes = [];
for (var i = 0; i < document.getElementsByClassName('choiceImg').length; i++) {
    choicePanes.push(document.getElementsByClassName('choiceImg')[i]);
}

var currChoices = [];
var surveySize = 10;
var surveyCount = 0;
console.log(choicePanes);

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

new Product('img/banana.jpg', 'banana');
new Product('img/bathroom.jpg', 'bathroom');
new Product('img/boots.jpg', 'boots');
new Product('img/breakfast.jpg', 'breakfast');
new Product('img/bubblegum.jpg', 'bubblegum');
new Product('img/chair.jpg', 'chair');

survey();
