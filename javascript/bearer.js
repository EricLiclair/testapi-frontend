const HTTPRequest = function (type = "POST", endpoint, formData, callBack) {
  let baseURL = "https://testmyapi.herokuapp.com/";
  let body = {};
  for (let [name, value] of formData) {
    body[name] = value;
  }
  let request = {
    method: type,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  let url = baseURL + endpoint;
  console.log(request);
  fetch(url, request)
    .then((response) => response.json())
    .then((data) => callBack(data))
    .catch((error) => callBack(error, true));
};

// to display bearer information
const displayBearerInformation = function (data, error = false) {
  let user = data["user"];
  let bearer = data["bearer"];
  let userDisplay = document.getElementById("userdisplay");
  if (!error) {
    userDisplay.innerHTML = `
      <h6>bearer token</h6>
      <h4>${bearer}</h4>
      <br>
      <h6>username</h6>
      <h4>${user.username}</h4>
      <h6>name</h6>
      <h4>${user.first_name + " " + user.last_name}</h4>
      <h6>email</h6>
      <h4>${user.email}</h4>
      <input
        type="button"
        class="btn btn-primary"
        value="create your profile"
        onclick="window.location.href='/createprofile.html'"
      />
      `;
  } else {
    alert("Something went wrong. Retry with correct credentials");
  }
};

const bearerForm = document.getElementById("bearerForm");

bearerForm.onsubmit = function (event) {
  event.preventDefault();
  var bearerFormData = new FormData(bearerForm);
  HTTPRequest(
    "POST",
    "auth/get-token",
    bearerFormData,
    displayBearerInformation
  );
};
