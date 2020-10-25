

function cartPopulate(array){

    var cartContainer = document.getElementById('cartItems');
    var cartItem = "";
    for (let index = 0; index < array.length; index++) {
        let element = array[index];
    
        cartItem += `<tr class="cart-row">
                            <td class="col-sm-8 col-md-6">
                                <div class="media">
                                    <a class="thumbnail pull-left" href="#"> <img class="media-object" src="${element.src}" style="width: 72px; height: 72px;"> </a>
                                    <div class="media-body">
                                        <h4 class="media-heading" id="articleName">${element.name}</h4>
                                    </div>
                                </div>
                            </td>
                            <td class="col-sm-1 col-md-1" style="text-align: center">
                                <input  type="number" class="form-control count" id="articleCount" value="${element.count}" min='1'>
                            </td>
                            <td class="col-sm-1 col-md-1 text-center cart-price" ><strong id="articleCost">${element.currency + ' ' + element.unitCost}</strong></td>
                            <td class="col-sm-1 col-md-1 text-center"><strong id="articleTotal">${element.currency + ' ' +  (element.count * element.unitCost)}</strong></td>
                            <td class="col-sm-1 col-md-1">
                                <button type="button" class="btn btn-danger" id="remove">
                                    <span class="glyphicon glyphicon-remove"></span> Remover
                                </button>
                            </td>
                         </tr>`

                    cartContainer.innerHTML = cartItem;

                    var count = document.getElementById('articleCount').value;
                    var cartInicialSubTotal = document.getElementById('cartSubTotal');
                        cartInicialSubTotal.innerText = element.currency + ' ' +  (count * element.unitCost);
                    var cartInicialSend = document.getElementById('sendCost');
                        cartInicialSend.innerText = '%';
                    document.getElementById('sendCost').innerText = '%';
                    var cartInicialTotal = document.getElementById('cartTotal');
                    cartInicialTotal.innerText = element.currency + ' ' + (element.count * element.unitCost);
                    let keysToRemove = ['costo de envio', 'Card info', 'Card expiration']
                    for (key of keysToRemove) {
                        localStorage.removeItem(key);
                    }

                    
                    
                    
                    document.getElementById('articleCount').onchange=function(e){
                        var subTotal = e.target.value * element.unitCost;
                        var subTotalElement = document.getElementById('articleTotal');
                        subTotalElement.innerText = element.currency + ' ' + subTotal;
                        cartInicialSubTotal.innerText = element.currency + ' ' +  subTotal;
                        var cost = localStorage.getItem('costo de envio');
                        var porcentaje = cost*subTotal /100;
                        cartInicialTotal.innerText = element.currency + ' ' +  (porcentaje + subTotal);

                    }
                    document.getElementById('selectCost').onclick=function(e){
                        var selectCost = e.target.value;
                        var count = document.getElementById('articleCount').value;
                        localStorage.setItem('costo de envio', selectCost);
                        var cost = localStorage.getItem('costo de envio');
                        cartInicialSend.innerText = '%' + cost;
                        var porcentaje = cost*((count * element.unitCost) /100);
                        var cartInicialTotal = document.getElementById('cartTotal');
                        
                        cartInicialTotal.innerText = element.currency + ' ' + (porcentaje + (count * element.unitCost));
                        

                    }

                    document.getElementById('saveButton').onclick=function(e){
                        var cardNameNumber = document.getElementById('cardName').value + ' ' + document.getElementById('cardNumber').value;
                        var cardExpiration = document.getElementById('cardExpireMonth').value + ' '+ document.getElementById('cardExpireYear').value + ' '+ document.getElementById('cvv').value;
                        localStorage.setItem('Card info', cardNameNumber)
                        localStorage.setItem('Card expiration', cardExpiration)

                        var fieldIDArray = [$('#cardName'), $('#cardNumber'),$('#cardExpireMonth'),$('#cardExpireYear'),$('#cvv')];
                        
                        for (i = 4; i < fieldIDArray.length; i++) {
                            if(fieldIDArray[i].val()){
                                e.preventDefault();
                                $('#exampleModal').modal('hide')
                                
                            }
                        }
                       
                        
                    }

                    document.getElementById('saveButtonBank').onclick=function(e){

                        var bankIDArray = [$('#ccmonth')]
                        for (i=0;i<bankIDArray.length; i++){
                            if(bankIDArray[i].val()){
                                e.preventDefault();
                                $('#exampleModal1').modal('hide')
                            }
                        }
                    }
                
         }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            cart = resultObj.data.articles;

             cartPopulate(cart);


        }

        var removeCartItemButtons  = document.getElementsByClassName('btn-danger')
        for (var i = 0; i < removeCartItemButtons.length; i++) {
            var button = removeCartItemButtons[i]
            button.addEventListener('click', function(event) {
            var buttonClicked = event.target
            buttonClicked.parentElement.parentElement.remove()
            document.getElementById('cartSubTotal').innerText = 'UYU 0'
            document.getElementById('cartTotal').innerText = 'UYU 0'
            document.getElementById('sendCost').innerText = ' '
            
        })
    }
        
    })
})