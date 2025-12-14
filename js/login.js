document. getElementById("SignupForm").addEventListener("submit",function(event) {
  event.preventDefault() ;

  let password = getElementById("password"). value;
  let ConfirmPassword = document.getElementById(ConfirmPassword).value;

  if (password !== ConfirmPassword) {
    alert("Les mots de passe ne correspondent pas!");
  } else {
    alert("Inscription réussie!");
    window.location.href = "index.html";
  }
});

let users = JSON.parse(localStorage.getItem("users")) || [];
document. getElementById("LoginForm").addEventListener("submit", function(e) {
  e.preventDefault();
  let email = document.getElementById("LoginEmail"). value;
  let password = document.getElementById("LoginPassword"). value;

  let user = users.find(u => u.email === email && u.password === password) ;

  if (user) {
    localStorage.setItem("isLoggedIn", "true") ;
    alert("Connexion réussie!")
    window.location.href = "index.html" ;
  } else {
    alert("email ou mot de passe incorrect.")
  }
}) ;

if(localStorage.getItem("isLoggedIn") == "true") {
  document.getElementById("menu").style.display = "block" ;
}
