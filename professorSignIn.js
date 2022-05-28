var signInBtn2 = document.getElementById("signInProfessor");
console.log("welcome");
var emailInput2 = document.getElementById("signInProfessorEmail");
var passwordInput2 = document.getElementById("signInProfessorPassword");


signInBtn2.onclick = function login() {
  fetch("https://app-e-exam.herokuapp.com/sign_In", {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({
      email: emailInput2.value,
      password: passwordInput2.value,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then(res =>{
   
    return res.json();

  }).then(data => {
    console.log(data);
    localStorage.setItem("token", data['token']);
    window.location.href = "homeProfessor.html";
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