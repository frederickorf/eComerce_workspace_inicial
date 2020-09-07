//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
  checkUserLoggedIn();
});

document.getElementById("btnIniciar").addEventListener("click", function(){
  login();
});


// Chequea si existe un usuario logueado, en caso positivo nos devuelve al index.

function checkUserLoggedIn() {
  var user = getUserLoggedIn();
  if ((user != null)) {
      window.location.replace("index.html");
  }
}


// Realiza las comprobaciones necesarias para completar el login.

function login() {
  var usuario = document.getElementById("inputNick").value;
  var contraseña = document.getElementById("inputPassword").value;
  if ((usuario != "") && (contraseña != "")) {
      var user = getUser(usuario);
      if ((user != null) && (user.clave == contraseña)) {
          var recordarme = document.getElementById("checkRememberMe");
          if (recordarme.checked == true) {
              localStorage.setItem("userLoggedIn", usuario);
          }
          else {
              sessionStorage.setItem("userLoggedIn", usuario);
          }
          window.location.replace("index.html");
      }
      else {
          document.getElementById("lblMsg").innerHTML = "Contraseña y/o usuario incorrectos.";
          setTimeout(function () { document.getElementById("lblMsg").innerHTML = ""; }, 3000);
      }
  }

}


// Devuelve el nombre del usuario logueado actualmente.

function getUserLoggedIn() {
  var user = null;
  user = localStorage.getItem("userLoggedIn");
  if (user == null)
      user = sessionStorage.getItem("userLoggedIn");
  return user;
}


// Devuelve el usuario completo si esta registrado.

function getUser(usuario) {
  var user = null;
  user = JSON.parse(localStorage.getItem(usuario));
  return user;
}