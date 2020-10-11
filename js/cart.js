function cartPopulate(cart){

    var cartContainer = document.getElementById('cartItems');
    totalCart = 0
    for (let index = 0; index < cart.length; index++) {
        const element = cart[index];
    
        var cartItem = `<tr class="cart-row">
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

                    var cartInicialTotal = document.getElementById('cartTotal')
                    cartInicialTotal.innerText = element.currency + ' ' +  (element.count * element.unitCost)

                    document.getElementById('articleCount').onchange=function(e){
                        var total = e.target.value * element.unitCost
                        var totalElement = document.getElementById('articleTotal');
                        totalElement.innerText = element.currency + ' ' + total;
                        var cartTotal = document.getElementById('cartTotal');
                        cartTotal.innerText = element.currency + ' ' + total;
                    }
                    

                    console.log(element)
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
            document.getElementById('cartTotal').innerText = 'UYU 0'
        })
    }
        
    })
})