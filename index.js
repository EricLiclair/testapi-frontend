let username = document.getElementById("username");
let password = document.getElementById("password");
let bearer = document.getElementById("bearer");

let myBearerToken;

function createProfile(user) {
  let userDisplay = document.getElementById("userdisplay");
  userDisplay.innerHTML = `
    <h6>username</h6>
    <h4>${user.username}</h4>
    <h6>name</h6>
    <h4>${user.first_name + user.last_name}</h4>
    <h6>email</h6>
    <h4>${user.email}</h4>
    `;
}

function displayBearer(data) {
  console.log(data);
  myBearerToken = data["bearer"];
  bearer.innerHTML = `
    <h6>Your bearer token:</h6>
    <h4>${myBearerToken}</h4>
  `;
  createProfile(data["user"]);
}

function submitButton() {
  let url = "https://testmyapi.herokuapp.com/auth/get-token";

  let body = {
    username: username.value,
    password: password.value,
  };

  let request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  console.log(request);
  fetch(url, request)
    .then((response) => response.json())
    .then((data) => displayBearer(data));
}

//////////////////////////////////// create profile page

let createForm = document.getElementById("create-form");

function createProfileButtonClick(e) {
  let createFormData = new FormData(createForm);
  console.log(createFormData);
}
