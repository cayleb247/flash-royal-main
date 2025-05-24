// import { Flashcard, Set } from "./logic.js";

// // Setup

// let currentQuestion;
// let currentPoints = 0;
// let currentHealth = 100;

// // window.onload = () => {
// //   displayRandomQuestion();
// // };
// function displayRandomQuestion() {
//   if (questionArray.length === 0) {
//     console.log("No questions available");
//     return;
//   }
//   let questionIndex = Math.floor(Math.random() * questionArray.length);
//   const questionText = document.querySelector(".question");
//   const pointText = document.querySelector(".question-value");
//   questionText.textContent = questionArray[questionIndex].term;
//   pointText.textContent = questionArray[questionIndex].value;
//   currentQuestion = questionArray[questionIndex];
// }
// const energyMeter = document.querySelectorAll(".energy-meter > *");

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

// // let questionsJson = localStorage.getItem("questions");

// // let questions = JSON.parse(questionsJson);

// // let questionArray = [];

// // for (let question of questions) {
// //   questionArray.push(
// //     new Flashcard(question.question, question.answer, question.pointValue)
// //   );
// // }
// // console.log(questionArray);
// displayRandomQuestion();

// function checkAnswer(question, user_answer) {
//   return question.definition == user_answer;
// }

// const inputForm = document.querySelector("form");
// const answerInput = document.querySelector(".input-container input");

// const wrongAnswerText = document.querySelector(".wrong-answer");

// function addPoints(value) {
//   console.log(value);
//   currentPoints += value;
//   if (currentPoints > 9) {
//     currentPoints = 9;
//   }
//   console.log(currentPoints);
// }

// function substractPoints(value) {
//   if (!((currentPoints -= value) < 0)) {
//     currentPoints -= value;
//   }
// }

// function renderPoints() {
//   for (const energy of energyMeter) {
//     if (!energy.classList.contains("invisible")) {
//       energy.classList.add("invisible");
//     }
//   }
//   for (let i = 0; i < currentPoints; i++) {
//     energyMeter[i].classList.remove("invisible");
//   }
// }

// function incorrectAnswer() {}

// inputForm.addEventListener("submit", (event) => {
//   event.preventDefault();
//   if (checkAnswer(currentQuestion, answerInput.value)) {
//     addPoints(currentQuestion.value);
//     renderPoints();
//     inputForm.reset();
//     if (!wrongAnswerText.classList.contains("invisible"))
//       wrongAnswerText.classList.add("invisible");
//     displayRandomQuestion();
//   } else {
//     inputForm.reset();
//     wrongAnswerText.classList.remove("invisible");
//   }
// });

import { Flashcard, Set } from "./logic.js";

// Setup

let currentQuestion;
let currentPoints = 0;
let currentHealth = 20;

window.onload = () => {
  displayRandomQuestion();
};

const energyMeter = document.querySelectorAll(".energy-meter > *");

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

function addPoints(value) {
  console.log(value);
  currentPoints += value;
  if (currentPoints > 9) {
    currentPoints = 9;
  }
  console.log(currentPoints);
}

function substractPoints(value) {
  if (!((currentPoints -= value) < 0)) {
    currentPoints -= value;
  }
}

function renderPoints() {
  for (const energy of energyMeter) {
    if (!energy.classList.contains("invisible")) {
      energy.classList.add("invisible");
    }
  }
  for (let i = 0; i < currentPoints; i++) {
    energyMeter[i].classList.remove("invisible");
  }
}

function renderHealth() {
  const healthText = document.querySelector(".health-text");
  healthText.textContent = `${currentHealth}%`;
  const health = document.querySelector(".health");
  health.style.width = `${currentHealth}%`;
}

function incorrectAnswer() {}

inputForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (checkAnswer(currentQuestion, answerInput.value)) {
    addPoints(currentQuestion.value);
    renderPoints();
    inputForm.reset();
    if (!wrongAnswerText.classList.contains("invisible"))
      wrongAnswerText.classList.add("invisible");
    displayRandomQuestion();
  } else {
    inputForm.reset();
    wrongAnswerText.classList.remove("invisible");
  }
});
