const logoutBtn = document.querySelector(".logout");
const welcomeSection = document.querySelector(".welcome");

if (sessionStorage.getItem("name") !== null) {
  welcomeSection.innerHTML = `<h1 class="m-2">Hello, ${sessionStorage.getItem(
    "name"
  )} </h1>`;
} else {
  window.location.href = "./signIn.html";
}

logoutBtn.addEventListener("click", function () {
  sessionStorage.clear();
  window.location.href = "./signIn.html";
});
