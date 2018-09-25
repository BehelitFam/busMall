'use strict';


var choicePanes = [];
for (var i = 0; i < document.getElementsByClassName('choiceCard').length; i++) {
    choicePanes.push(document.getElementsByClassName('choiceCard')[i]);
}

var currChoices = [];
var surveySize = 5;
var surveyCount = 0;
console.log(choicePanes);

Product.allProducts = [];

// Creates Product option with the product name and path to 
function Product (filepath, prodName) {
   this.prodName = prodName;
   this.imgSource = filepath;
   this.clicked = 0;
   this.shown = 0;
   Product.allProducts.push(this);
   this.choiceId = '';
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
        choices[i].choiceId = choicePanes[i].id;
        choices[i].shown++;
        currChoices[i] = choices[i];
    }

}


// function clickProduct(blah) {
//     var i = blah;
//     console.log('i is ' + i);
//     console.log('clicked is ' + currChoices[i].clicked);
//     currChoices[i].clicked++;
//     console.log(currChoices[i].prodName + ' clicked ' + currChoices[i].clicked + ' times');
//     genProdChoices();
// }


function survey() {
   //for (var j = 0; j < surveySize; j++) {
        genProdChoices();
       // console.log('we are on choice number ' + (j + 1));
        console.log('current choices are ' + currChoices);
        choicePanes.forEach(function(pane, index) {
            console.log('pane is ' + pane);
            pane.addEventListener('click', function(){
                console.log('click event triggered');
                currChoices[index].clicked++;
                console.log(currChoices[index].prodName + ' clicked: ' + currChoices[index].clicked);
                genProdChoices();
                surveyCount++;
            });
        });
            
        
        console.log('exited survey forEach loop');   
    //}
}

new Product('img/banana.jpg', 'banana');
new Product('img/bathroom.jpg', 'bathroom');
new Product('img/boots.jpg', 'boots');
new Product('img/breakfast.jpg', 'breakfast');
new Product('img/bubblegum.jpg', 'bubblegum');
new Product('img/chair.jpg', 'chair');

survey();
console.log('after survey()');
console.log(Product.allProducts[0].shown);
console.log(Product.allProducts[0].clicked);