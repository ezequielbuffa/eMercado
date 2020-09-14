const ORDER_ASC_BY_COST = "PrecioAsc";
const ORDER_DESC_BY_COST = "PrecioDesc";
const ORDER_DESC_BY_RELEVANCE = "Relevancia";
var minPrice = undefined;
var maxPrice = undefined;

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_COST)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_COST){
            result = array.sort(function(a, b) {
                if ( a.cost > b.cost ){ return -1; }
                if ( a.cost < b.cost ){ return 1; }
                return 0;
            });
    }else if (criteria === ORDER_DESC_BY_RELEVANCE){
        result = array.sort(function(a, b) {
            if ( a.soldCount > b.soldCount ){ return -1; }
            if ( a.soldCount < b.soldCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function showProductsList(){

    let htmlContentToAppend = "";
    var search = document.getElementById("search").value;

    for(let i = 0; i < currentProductsArray.length; i++){
        let products = currentProductsArray[i];

        if (((minPrice == undefined) || (minPrice != undefined && parseInt(products.cost) >= minPrice)) &&
            ((maxPrice == undefined) || (maxPrice != undefined && parseInt(products.cost) <= maxPrice))&& (products.name.toUpperCase().includes(search.toUpperCase()))){

            htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + products.imgSrc + `" alt="` + products.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ products.name + `</h4>
                            <small class="text-muted">` + products.soldCount + ` Vendidos</small>
                        </div>
                        <div class="d-flex w-100 justify-content-between">
                        </div>
                        <p class="mb-1">` + products.description + `</p>
                        <br>
                        <h5>` + products.currency + " " + products.cost + `</p>
                    </div>
                </div>
            </a>
            `
        }

        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro los productos ordenadas
    showProductsList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProducts(ORDER_ASC_BY_COST, resultObj.data);
        }
    });

    document.getElementById("sortAscCost").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDescCost").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortDescSold").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_RELEVANCE);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterPriceMin").value = "";
        document.getElementById("rangeFilterPriceMax").value = "";

        minPrice = undefined;
        maxPrice = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterPrice").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por precio
        //de productos.
        minPrice = document.getElementById("rangeFilterPriceMin").value;
        maxPrice = document.getElementById("rangeFilterPriceMax").value;

        if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0){
            minPrice = parseInt(minPrice);
        }
        else{
            minPrice = undefined;
        }

        if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0){
            maxPrice = parseInt(maxPrice);
        }
        else{
            maxPrice = undefined;
        }

        showProductsList();
    });

    document.getElementById("search").addEventListener("keyup", function () {
        
        showProductsList();
    });
}); 

