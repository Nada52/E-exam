var addbtn = document.getElementById("createUser");
console.log("welcome");
var fristNameInput = document.getElementById("firstName");
var lastNameInput = document.getElementById("lastName");
var emailInput = document.getElementById("email");
var passwordInput = document.getElementById("password");


function addItemsToLocalStorage(){
  fristNameInput = fristNameInput.value;
  localStorage.setItem("first name",fristNameInput);
  lastNameInput = lastNameInput.value;
  localStorage.setItem("last name",lastNameInput);
  emailInput = emailInput.value;
  localStorage.setItem("email",emailInput);
  passwordInput = passwordInput.value;
  localStorage.setItem("password",passwordInput);
  role = "professor";
  localStorage.setItem("role",role);

}

function studentMode(){
    window.location.href = "studentSignUp.html";
}

addbtn.onclick = function add() {
  fetch("https://app-e-exam.herokuapp.com/sign_Up", {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({
      fristName: fristNameInput.value,
      lastName: lastNameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
      role: "professor",
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response);
    })
    .then(function (data) {
      alert('you sign up successfully !');
      console.log(data);
      addItemsToLocalStorage();
    })
    .catch(function (error) {
      console.warn("Something went wrong.", error);
    });
};

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