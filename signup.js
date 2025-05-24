const signupForm = document.querySelector(".signup-container form");
const signupUsername = document.getElementById("username");
const signupPassword = document.getElementById("password");

signupForm.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log(signupUsername.value, signupPassword.value);
    
    signupForm.reset();
})