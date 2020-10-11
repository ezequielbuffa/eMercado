var product_info = {};
var product_info_comments = {};
var product_info_relatedProducts = {};

function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 1; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
            <div class="carousel-item">
                <img class="d-block w-100" src="` + imageSrc + `" alt="">
            </div>
        `
    }
    document.getElementById("carousel-inner").innerHTML += htmlContentToAppend;
}

function showRelatedProducts(array){

    let htmlContentToAppend = "";

    for(let i = 1; i < array.length; i=i+2){
        let relatedProducts = array[i]

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="container">
                <div class="d-block mb-4 h-100">
                    <a href="">
                        <img class="img-fluid img-thumbnail" src="` + relatedProducts.imgSrc + `" alt="${relatedProducts.description}">
                    </a>
                </div>
                <h4 class="mb-1">${relatedProducts.name}</h3>
                <p class="mb-1">${relatedProducts.description}</p>
                <p class="mb-1"><b>` + relatedProducts.currency +`</b> ${relatedProducts.cost}</p>
                <small class="mb-1">Vendidos: ${relatedProducts.soldCount}</small>
            </div>
        </div>
        `
        

        document.getElementById("productInfoRelatedProducts").innerHTML = htmlContentToAppend;
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
                `+checkedStar(product_info_comments[i].score)+`
            </div>
            <hr>
        </div>
        `
        
        document.getElementById("productsInfoComments").innerHTML = htmlContentToAppend;
    }
}

function checkedStar(n) {
    var checked = `<span class="fa fa-star checked"></span>`;
    var noChecked = `<span class="fa fa-star "></span>`;

    return (checked.repeat(n)+ noChecked.repeat(5-n));
    
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

            productInfoNameHTML.innerHTML = product_info.name;
            productInfoDescriptionHTML.innerHTML = product_info.description;
            productInfoCostHTML.innerHTML = product_info.currency + ' ' + product_info.cost;
            productInfoSoldCountHTML.innerHTML = product_info.soldCount;
            productInfoCategoryHTML.innerHTML = product_info.category;
           
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

    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product_info_relatedProducts = resultObj.data;

            showRelatedProducts(product_info_relatedProducts);
        }
    })
});

document.getElementById("send").onclick= function (e) {

    let date = new Date();
    let name = localStorage.getItem("email");
    let com = document.getElementById("commentBox").value;
    let stars = document.getElementById("star_rating");

    stars = parseInt(stars);
    
    const newcomment = {
        dateTime: date,
        description: com,
        score: stars,
        user: name
    }

    product_info_comments.push(newcomment);

    showComments(product_info_comments);
};

