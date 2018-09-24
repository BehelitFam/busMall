var choicePanes = [];
for (var i = 0; i < document.getElementsByClassName('choiceCard').length; i++) {
    choicePanes.push(document.getElementsByClassName('choiceCard')[i]);
}


console.log(choicePanes);

var surveySize = 5;

Product.allProducts = [];

// Creates Product option with the product name and path to 
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
        choices[i].shown 
    }
}


function clickProduct() {
    
}


function survey() {
    genProdChoices();
    for (var i = 0; i < choicePanes.length; i++) {
        choicePanes[i].addEventListener('click', clickProduct);
    }
    for (var i = 0; i < choices; i++) {

    }
}

new Product('img/banana.jpg', 'banana');
new Product('img/bathroom.jpg', 'bathroom');
new Product('img/boots.jpg', 'boots');
new Product('img/breakfast.jpg', 'breakfast');
new Product('img/bubblegum.jpg', 'bubblegum');
new Product('img/chair.jpg', 'chair');

console.log

genProdChoices();
