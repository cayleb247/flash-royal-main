import { Set, Flashcard } from "./logic.js";

const flashcardForm = document.querySelector(".flashcard-creation-container form")
const createFlashcardButton = document.querySelector(".new-flashcard");

function createFlashcardElement() {
    // Create the main container
    const flashcardDiv = document.createElement('div');
    flashcardDiv.className = 'flashcard-creation';

    // Create Term input group
    const termGroup = document.createElement('div');
    termGroup.className = 'flashcard-input';

    const termTextarea = document.createElement('textarea');
    termTextarea.name = 'term';
    termTextarea.id = 'term';

    const termLabel = document.createElement('label');
    termLabel.setAttribute('for', 'term');
    termLabel.textContent = 'Term';

    termGroup.appendChild(termTextarea);
    termGroup.appendChild(termLabel);

    // Create Definition input group
    const defGroup = document.createElement('div');
    defGroup.className = 'flashcard-input';

    const defTextarea = document.createElement('textarea');
    defTextarea.name = 'definition';
    defTextarea.id = 'definition';

    const defLabel = document.createElement('label');
    defLabel.setAttribute('for', 'definition');
    defLabel.textContent = 'Definition';

    defGroup.appendChild(defTextarea);
    defGroup.appendChild(defLabel);

    // Create Value input group
    const valueGroup = document.createElement('div');
    valueGroup.className = 'flashcard-input';

    const valueInput = document.createElement('input');
    valueInput.type = 'number';
    valueInput.id = 'value';
    valueInput.name = 'value';
    valueInput.min = '1';
    valueInput.max = '9';

    const valueLabel = document.createElement('label');
    valueLabel.setAttribute('for', 'value');
    valueLabel.textContent = 'Value';

    valueGroup.appendChild(valueInput);
    valueGroup.appendChild(valueLabel);

    // Append all to the main container
    flashcardDiv.appendChild(termGroup);
    flashcardDiv.appendChild(defGroup);
    flashcardDiv.appendChild(valueGroup);

    // Append to an existing container in the HTML
    flashcardForm.appendChild(flashcardDiv);
}


createFlashcardButton.addEventListener("click", () => {
    console.log("create flashcard");
    createFlashcardElement();
})

const publishButton = document.querySelector(".publish-button")

publishButton.addEventListener("click", () => {
    console.log("create set");
    const flashcardsTerms = document.querySelectorAll("#term");
    const flashcardsDefs = document.querySelectorAll("#definition");
    const flashcardsValues = document.querySelectorAll("#value");
    const setName = document.querySelector("#set-name")
    let flashcardArray = []

    for (let i=0;i<flashcardsTerms.length;i++) {
        flashcardArray.push(new Flashcard(flashcardsTerms[i].value, flashcardsDefs[i].value, flashcardsValues[i].value));
    }

    let newSet = new Set(setName.value, flashcardArray);
    console.log(newSet);

    flashcardForm.reset();
})