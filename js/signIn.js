const userEmail = document.getElementById("email");
const userPassword = document.getElementById("password");
const messageAreaWhenSigned = document.querySelector(".message");
const sinInBtn = document.querySelector(".signIn");

if (localStorage.getItem("users") !== null) {
  users = JSON.parse(localStorage.getItem("users"));
} else {
  users = [];
}

// check existing of user
function checkExistance(email) {
  email = email.trim().toLowerCase();
  let user = users.find((u) => u.email.toLowerCase() === email); // undefined if not found
  if (!user) {
    messageAreaWhenSigned.innerHTML = `<p class="messageAreaWhenSigned text-danger">Incorrect Email or Password</p>`;
  } else {
    if (user.password === userPassword.value) {
      messageAreaWhenSigned.innerHTML = `<p class="messageAreaWhenSigned "> Correct </p>`;
      sessionStorage.setItem("name", user.name);
      setInterval(() => {
        window.location.href = "/home.html";
      }, 1000);
    } else {
      messageAreaWhenSigned.innerHTML = `<p class="messageAreaWhenSigned text-danger">Incorrect Email or Password</p>`;
    }
  }
}

// take email and password
//check email
// if found check password for that email
//if match say hello
// if not match print error message
// if not found print error message

sinInBtn.addEventListener("click", function () {
  checkExistance(userEmail.value);
});
