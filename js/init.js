const CATEGORIES_URL = "http://localhost:4040/categories";
const PUBLISH_PRODUCT_URL = "http://localhost:4040/products_publish";
const CATEGORY_INFO_URL = "http://localhost:4040/category_info";
const PRODUCTS_URL = "http://localhost:4040/products";
const PRODUCT_INFO_URL = "http://localhost:4040/products_info";
const PRODUCT_INFO_COMMENTS_URL = "http://localhost:4040/products_comments";
const CART_INFO_URL = "http://localhost:4040/cart_info";
const CART_BUY_URL = "http://localhost:4040/cart_buy";
const CART_ARTICLES_URL = "http://localhost:4040/cart_articles";
const BUY_FILE_URL = "http://localhost:4040/buy_files"


var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
  let email = localStorage.getItem('email');
  let userElement = document.getElementById('username');
  userElement.innerHTML = email;
  if(email === null){
    window.location.href = "./login.html";
  }
});

var logoutButton = document.getElementById("logout");
logoutButton.onclick = () => {
  localStorage.clear();
  window.location.href = "./login.html";
}

