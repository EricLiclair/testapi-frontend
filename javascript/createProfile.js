const HTTPRequest = function (type = "POST", endpoint, formData, callBack) {
  const baseURL = "https://testmyapi.herokuapp.com/";

  let body = {};
  for (let [name, value] of formData) {
    body[name] = value;
  }

  const bearerToken = "ad9566e92d3eb4154c67248246cfff143b28c047";
  let authToken = "Bearer " + bearerToken;

  let request = {
    method: type,
    headers: {
      "Content-type": "application/json",
      Authorization: authToken,
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

// to display response
const displayProfile = function (data, error = false) {
  let userDisplay = document.getElementById("userdisplay");
  if (!error) {
    userDisplay.innerHTML = `
        <h6>institute</h6>
        <h4>${data.institute}</h4>
        <br>
        <h6>branch</h6>
        <h4>${data.branch}</h4>
        <h6>year</h6>
        <h4>${data.year}</h4>
        <h6>github url</h6>
        <h4><a href="${data.github_url}"></a></h4>
        <h6>rpimary programming language</h6>
        <h4>${data.primary_language}</h4>
        <input
          type="button"
          class="btn btn-primary"
          value="create your profile"
          onclick="window.location.href='/createprofile.html'"
        />
        `;
  } else {
    alert(data);
  }
};

const createProfileForm = document.getElementById("createProfileForm");

createProfileForm.onsubmit = function (event) {
  event.preventDefault();
  var createProfileFormData = new FormData(createProfileForm);
  HTTPRequest(
    "POST",
    "api/v1/create-profile",
    createProfileFormData,
    displayProfile
  );
};
