import { Flashcard, Set } from "./logic.js";
let currentQuestion;
window.onload = () => {
  displayRandomQuestion();
};

// let questionOne = new Flashcard("What's the color of the sky", "Blue", 1);
// let questionTwo = new Flashcard("What's Bear Tyree's real name", "Trinnean", 9);
// let questionThree = new Flashcard("Bleh", "bleh", 3);
// let questionFour = new Flashcard("Worst cave student", "alpin", 5);
// let questionFive = new Flashcard("caleb", "wang", 4);

// const questionArray = [
//   questionOne,
//   questionTwo,
//   questionThree,
//   questionFour,
//   questionFive,
// ];

let questionsJson = localStorage.getItem("questions");
let questions = JSON.parse(questionsJson);

let questionArray = [];

for (let question of questions) {
  questionArray.push(
    new Flashcard(question.question, question.answer, question.pointValue)
  );
}

function displayRandomQuestion() {
  let questionIndex = Math.floor(Math.random() * questionArray.length);
  const questionText = document.querySelector(".question");
  const pointText = document.querySelector(".question-value");
  questionText.textContent = questionArray[questionIndex].term;
  pointText.textContent = questionArray[questionIndex].value;
  currentQuestion = questionArray[questionIndex];
}

function checkAnswer(question, user_answer) {
  return question.definition == user_answer;
}

const inputForm = document.querySelector("form");
const answerInput = document.querySelector(".input-container input");

const wrongAnswerText = document.querySelector(".wrong-answer");

inputForm.addEventListener("submit", (event) => {
  console.log("hi");
  event.preventDefault();
  if (checkAnswer(currentQuestion, answerInput.value)) {
    displayRandomQuestion();
    inputForm.reset();
    if (!wrongAnswerText.classList.contains("invisible"))
      wrongAnswerText.classList.add("invisible");
  } else {
    inputForm.reset();
    wrongAnswerText.classList.remove("invisible");
  }
});
