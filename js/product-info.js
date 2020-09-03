var product_info = {};
var product_info_comments = {};

function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productInfoImagesGallery").innerHTML = htmlContentToAppend;
    }
}

function showComments(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){

        htmlContentToAppend += `
        <div class="container">
            <div class="head">
                <small><strong>`+ product_info_comments[i].user + `</strong> `+ product_info_comments[i].dateTime + `</small>
            </div>
            <div>
                <p class="row"> `+ product_info_comments[i].description + ` </p>
                <span class="fa fa-star checked"> `+ product_info_comments[i].score + ` </span>
            </div>
            <hr>
        </div>
        `

        document.getElementById("productsInfoComments").innerHTML = htmlContentToAppend;
    }
}

function add(ths,sno){


    for (var i=1;i<=5;i++){
        var cur=document.getElementById("star"+i)
        cur.className="fa fa-star"
    }
    
    for (var i=1;i<=sno;i++){
        var cur=document.getElementById("star"+i)
        if(cur.className=="fa fa-star"){
            cur.className="fa fa-star checked"
        }
    }
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product_info = resultObj.data;

            let productInfoNameHTML  = document.getElementById("productInfoName");
            let productInfoDescriptionHTML = document.getElementById("productInfoDescription");
            let productInfoCostHTML = document.getElementById("productInfoCost");
            let productInfoSoldCountHTML = document.getElementById("productInfoSoldCount");
            let productInfoCategoryHTML = document.getElementById("productInfoCategory");
            //let productInfoRelatedProductsHTML = document.getElementById("productInfoRelatedProducts");

            productInfoNameHTML.innerHTML = product_info.name;
            productInfoDescriptionHTML.innerHTML = product_info.description;
            productInfoCostHTML.innerHTML = product_info.currency + ' ' + product_info.cost;
            productInfoSoldCountHTML.innerHTML = product_info.soldCount;
            productInfoCategoryHTML.innerHTML = product_info.category;
            //productInfoRelatedProductsHTML.innerHTML = product_info.relatedProducts;

            //Muestro las imagenes en forma de galería
            showImagesGallery(product_info.images);
        }
    })

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product_info_comments = resultObj.data;

            showComments(product_info_comments);
        }
    })
});
