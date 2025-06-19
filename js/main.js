const userName = document.getElementById("name");
const userEmail = document.getElementById("email");
const userPassword = document.getElementById("password");
const nameFeedback = document.querySelector(".name-feedback");
const emailFeedback = document.querySelector(".email-feedback");
const passwordFeedback = document.querySelector(".password-error-messages");
const sinUpBtn = document.querySelector(".sinup");
const messageAreaWhenSigned = document.querySelector(".message");

let errMessages = [];

if (localStorage.getItem("users") !== null) {
  users = JSON.parse(localStorage.getItem("users"));
} else {
  users = [];
}

//display Error Message
function displayError(ele, message) {
  ele.classList.replace("d-none", "d-block");
  ele.classList.replace("valid-feedback", "invalid-feedback");
  ele.textContent = message;
}
//display correct message
function displayCorrect(ele, message) {
  ele.classList.replace("d-none", "d-block");
  ele.classList.replace("invalid-feedback", "valid-feedback");
  ele.textContent = message;
}

//Displaying errors of password
function passwordErrors(arr) {
  let cartona = "";
  for (let i = 0; i < arr.length; i++) {
    cartona += `<li class="">${arr[i]}</li>`;
  }
  passwordFeedback.innerHTML = cartona;
  userPassword.classList.replace("mb-4", "mb-3");
}

//Validate Name
function checkName(name) {
  name = name.trim();
  let regex = /^[A-Z][a-z]{2,15}\s?([A-Z]?[a-z]{2,15})?$/;
  if (regex.test(name)) {
    userName.classList.add("is-valid");
    userName.classList.remove("is-invalid");
    userName.classList.remove("mb-3");
    displayCorrect(nameFeedback, "Looks good!");
  } else {
    userName.classList.remove("is-valid");
    userName.classList.add("is-invalid");
    userName.classList.remove("mb-3");
    displayError(nameFeedback, "Must start with capital and all is letters");
    return true;
  }
}

//validate email
function checkEmail(email) {
  email = email.trim().toLowerCase();
  let regex = /^[a-zA-Z]*(\.?|[a-zA-Z])*\d{0,6}@(gmail|yahoo)\.(com|org)$/;
  if (regex.test(email)) {
    userEmail.classList.add("is-valid");
    userEmail.classList.remove("is-invalid");
    userEmail.classList.remove("mb-3");
    displayCorrect(emailFeedback, "Looks good!");
  } else {
    userEmail.classList.remove("is-valid");
    userEmail.classList.add("is-invalid");
    userEmail.classList.remove("mb-3");
    displayError(emailFeedback, "Email bust be like m@gmail.com");
    return true;
  }
}

// validate Password
function checkPassword(password) {
  errMessages = [];
  if (password.length < 8 || password.length > 16) {
    errMessages.push("length must be from 8 to 16");
  }
  if (!/[A-Z]+/.test(password)) {
    errMessages.push("must contain atleast one Uppercase ");
  }
  if (!/[a-z]+/.test(password)) {
    errMessages.push("must contain atleast one Lowercase ");
  }
  if (!/\W/.test(password)) {
    errMessages.push("must contain atleast one special Character ");
  }

  if (errMessages.length > 0) {
    userPassword.classList.remove("is-valid");
    userPassword.classList.add("is-invalid");
    passwordErrors(errMessages);
    return true;
  } else {
    userPassword.classList.add("is-valid");
    userPassword.classList.remove("is-invalid");
    passwordFeedback.innerHTML = "";
    userPassword.classList.replace("mb-3", "mb-4");
  }
}

// check existing of user
function checkExistance(email) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].email.toLowerCase() === email.toLowerCase()) {
      return true;
    } else {
      return false;
    }
  }
}

//Adding a new user
function addUser() {
  if (
    !(
      checkName(userName.value) ||
      checkEmail(userEmail.value) ||
      checkPassword(userPassword.value)
    )
  ) {
    if (checkExistance(userEmail.value)) {
      console.log("Existed");
    } else {
      users.push({
        name: userName.value,
        email: userEmail.value,
        password: userPassword.value,
      });
      localStorage.setItem("users", JSON.stringify(users));
      messageAreaWhenSigned.innerHTML = `<p class="messageAreaWhenSigned">You have been Signed, and will be directed to Login page</p>`;
      setInterval(() => {
        window.location.href = "./signIn.html";
      }, 2500);
    }
  }
}

//------------------------------- Events Handler -------------------------------
userName.addEventListener("input", function () {
  checkName(userName.value);
});

userEmail.addEventListener("input", function () {
  checkEmail(userEmail.value);
});

userPassword.addEventListener("input", function (e) {
  checkPassword(userPassword.value);
});

//Handle sinUp Btn
sinUpBtn.addEventListener("click", function () {
  addUser();
});
