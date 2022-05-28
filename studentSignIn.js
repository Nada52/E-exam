var signInBtn = document.getElementById("signIn");
console.log("welcome");
var emailInput = document.getElementById("signInEmail");
var passwordInput = document.getElementById("signInPassword");


signInBtn.onclick = function login() {
  fetch("https://app-e-exam.herokuapp.com/sign_In", {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({
      email: emailInput.value,
      password: passwordInput.value,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then(res =>{
   
    return res.json();

  }).then(data => {
    console.log(data);
    localStorage.setItem("token", data['token']);
    window.location.href = "homeStudent.html";
  }).catch(err => {
    console.log(err);
    alert("Login Failed, try again!");
  })
}

// api url
 const api_url = "https://app-e-exam.herokuapp.com/users";

// Defining async function
async function getapi(url) {
  // Storing response
  const response = await fetch(url);

  // Storing data in form of JSON
  var data = await response.json();
  console.log(data);
}
// Calling that async function
getapi(api_url);


