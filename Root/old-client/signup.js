const signupForm = document.querySelector(".signup-container form");
const signupUsername = document.getElementById("username");
const signupPassword = document.getElementById("password");

signupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  signup(signupUsername.value, signupPassword.value, () => {
    location.href = "menu.html";
  });

  signupForm.reset();
});
