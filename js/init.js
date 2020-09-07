const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function (url) {
  var result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  checkUserLoggedIn();
});


// Cierra sesion devolviendo a la seccion login.

document.getElementById("btnCerrarSesion").addEventListener("click", function(){
  userLogOut();
});


//Comprueba si existe un usuario logueado permitiendo visualizar en caso positivo,
// de lo contrario nos devuelve a la seccion de login.

function checkUserLoggedIn() {
  var user = getUserLoggedIn();
  if ((user != null) && (userExistence(user))) {
      $('#navbarDropdownUser').text(user);
  }
  else {
      window.location.replace("login.html");
  }
}


// Retorna true si el usuario pasado como parametro esta registrado.

function userExistence(userLogin) {
  var user = null;
  user = JSON.parse(localStorage.getItem(userLogin));

  if (user == null)
      user = JSON.parse(sessionStorage.getItem(userLogin));

  if (user.usuario == userLogin)
      return true;
}


// Devuelve el nombre del usuario logueado actualmente.

function getUserLoggedIn() {
  var user = null;
  user = localStorage.getItem("userLoggedIn");
  if (user == null)
      user = sessionStorage.getItem("userLoggedIn");
  return user;
}


// Cierra la sesion actual y nos devuelve a la seccion login.

function userLogOut() {
  localStorage.removeItem('userLoggedIn');
  sessionStorage.removeItem('userLoggedIn');
  window.location.replace("login.html");
}