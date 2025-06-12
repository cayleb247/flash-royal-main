const form = document.getElementById("form");
const input = document.getElementById("input");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  signup("test", "pas", (json) => {
    console.log(json);
  });
});
