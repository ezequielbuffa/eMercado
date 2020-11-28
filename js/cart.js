var cartInicialSubTotal = document.getElementById('cartSubTotal');
var cartInicialSend = document.getElementById('sendCost');
var cartInicialTotal = document.getElementById('cartTotal');
var count = document.getElementById('articleCount');
var total = 0

//Functions
function cartPopulate(array){

    var cartContainer = document.getElementById('cartItems');
    var cartItem = "";
    for (let index = 0; index < array.length; index++) {
        let element = array[index];
    
        cartItem += 
        `   <div class="row mb-4 cart-row">
                <div class="col-md-5 col-lg-3 col-xl-3">
                    <div class="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
                        <img class="imageCart img-fluid w-100"
                        src="${element.src}" alt="Sample">
                    </div>
                </div>
                <div class="col-md-7 col-lg-9 col-xl-9">
                    <div>
                        <div class="d-flex justify-content-between">
                            <div>
                                <h5 id="articleName" class="nameCart">${element.name}</h5>
                            </div>
                            <div>
                                <div class="def-number-input number-input safari_only mb-0 w-100 ">
                                    <input  type="number" class="form-control count" id="articleCount" value="${element.count}" min='1'>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between align-items-center" >
                            <p>Precio: <strong id="articleCost" class="currency"> ${element.currency}</strong> <strong class="price">${+ ' ' + element.unitCost}</strong></p>
                        </div>
                    </div>
                    <button type="button" class="btn btn-danger" id="remove" style="float: right;">
                        <span class="glyphicon glyphicon-remove"></span> Remover
                    </button>
                </div>
            </div>
            <hr class="mb-4">`

                    cartContainer.innerHTML = cartItem;
                    let keysToRemove = ['costo de envio', 'cardInfo', 'bankInfo']
                    for (key of keysToRemove) {
                        localStorage.removeItem(key);
                    };
         };
}


function saveCardInfo(){
    document.getElementById('saveButton').onclick=function(e){
        var fieldIDArray = [$('#cardName'), $('#cardNumber'),$('#cardExpireMonth'),$('#cardExpireYear'),$('#cvv')];
        cardInfo = {
            'name': document.getElementById('cardName').value,
            'number': document.getElementById('cardNumber').value,
            'expDate': document.getElementById('cardExpireMonth').value + '/' + document.getElementById('cardExpireYear').value,
            'CVV': document.getElementById('cvv').value
        };

        cardInfoParsed = JSON.stringify(cardInfo);
        localStorage.setItem('cardInfo', cardInfoParsed);

        for (i = 4; i < fieldIDArray.length; i++) {
            if(fieldIDArray[i].val()){
                e.preventDefault();
                $('#exampleModal').modal('hide')
                
            }
        }
    };
}

function saveBankType(){
    document.getElementById('saveButtonBank').onclick=function(e){

        bankInfo = { 'typeBank': document.getElementById('ccmonth').value};
        bankInfoParsed = JSON.stringify(bankInfo);
        localStorage.setItem('bankInfo', bankInfoParsed);


        var bankIDArray = [$('#ccmonth')]
        for (i=0;i<bankIDArray.length; i++){
            if(bankIDArray[i].val()){
                e.preventDefault();
                $('#exampleModal1').modal('hide')
            }
        }
    };
}

function cartTotalUpdate(){
    var cartRows = document.getElementsByClassName('cart-row');
    var cost = localStorage.getItem('costo de envio');
    for (let i = 0; i < cartRows.length; i++) {
        const cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('price')[0]
        var quantityElement = cartRow.getElementsByClassName('count')[0]
        var currency = cartRow.getElementsByClassName('currency')[0].innerText
        var price = parseInt(priceElement.innerText)
        var quantity = parseInt(quantityElement.value)
        var countChange= cartRow.getElementsByClassName('count')[0]
    
        if(currency === "UYU"){
            total += (price * quantity)
        }else{
            total += (price * quantity)*40
        }

        countChange.onchange=function(e){
            cartTotal()
        }

        cartInicialSubTotal.innerText = "UYU" + ' ' + parseInt(total)

        if (cost){
            cartInicialSend.innerText = "%" + cost
        }else{
            cartInicialSend.innerText = "%"
        }
        
        cartInicialTotal.innerText = "UYU" + ' ' + parseInt(total);
    }
}

function removeCartItems() {
    var removeCartItemButtons  = document.getElementsByClassName('btn-danger')
        for (var i = 0; i < removeCartItemButtons.length; i++) {
            var button = removeCartItemButtons[i]
            button.addEventListener('click', function(event) {
            var buttonClicked = event.target
            buttonClicked.parentElement.parentElement.remove()
        })
        }
}

function cartTotal(){
    total = 0
    var cartRows = document.getElementsByClassName('cart-row');
    var cost = localStorage.getItem('costo de envio');
    for (let i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('price')[0]
        var quantityElement = cartRow.getElementsByClassName('count')[0]
        var currency = cartRow.getElementsByClassName('currency')[0].innerText
        var price = parseInt(priceElement.innerText)
        var quantity = parseInt(quantityElement.value)

        if(currency === "UYU"){
            total += (price * quantity)
        }else{
            total += (price * quantity)*40
        }

    }

    cartInicialSubTotal.innerText = "UYU" + ' ' + parseInt(total)

        if (cost){
            cartInicialSend.innerText = "%" + cost
        }else{
            cartInicialSend.innerText = "%"
        }
        
        cartInicialTotal.innerText = "UYU" + ' ' + parseInt(total);
}

function removeCartItems() {
    var removeCartItemButtons  = document.getElementsByClassName('btn-danger')
        for (var i = 0; i < removeCartItemButtons.length; i++) {
            var button = removeCartItemButtons[i]
            button.addEventListener('click', function(event) {
            var buttonClicked = event.target
            buttonClicked.parentElement.parentElement.remove()
            cartTotal()
        })
        }
}

function buyButton(){
    var buy = document.getElementById('buyButton');
        buy.onclick=(e) =>{
            return fetch(BUY_FILE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    buyInfo: {
                        name: document.getElementById('cardName').value,
                        cardNumbre: document.getElementById('cardNumber').value,
                        expirationDate: document.getElementById('cardExpireMonth').value + '/' + document.getElementById('cardExpireYear').value,
                        cvv: document.getElementById('cvv').value,
                        shipping: document.getElementById('selectCost').value,
                        bank: document.getElementById('ccmonth').value
                    }
                })
            });
            
        }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_ARTICLES_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            cart = resultObj.data.data.articles;

             cartPopulate(cart);
             removeCartItems()
             cartTotalUpdate()
             saveBankType()
             saveCardInfo() 
             buyButton()
        }

        document.getElementById('selectCost').onclick=function(e){
            var selectCost = e.target.value;
            localStorage.setItem('costo de envio', selectCost);
            var cost = localStorage.getItem('costo de envio');
            cartInicialSend.innerText = '%' + cost;
            cartInicialTotal.innerText = "UYU" + ' ' + parseInt(total+ (total*(cost/100)));
        };
        


    })
})