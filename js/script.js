//The unordered list where the player’s guessed letters will appear.
const liGuessedLetters = document.querySelector(".guessed-letters");

//The button with the text “Guess!” in it.
const guessButton = document.querySelector(".guess");

//The text input where the player will guess a letter.
const letterInput = document.querySelector(".letter");

//The empty paragraph where the word in progress will appear.
const wordInProgress = document.querySelector(".word-in-progress");

//The paragraph where the remaining guesses will display.
const remaining = document.querySelector(".remaining");

//The span inside the paragraph where the remaining guesses will display.
const span = document.querySelector("span");

//The empty paragraph where messages will appear when the player guesses a letter.
const message = document.querySelector(".message");

//The hidden button that will appear prompting the player to play again.
const playButton = document.querySelector(".play-again");

//test word
const word = "magnolia";
const guessedLetters = [];

//add symbol to represent letter in the word
const wordSymbols = function (word) {
    const wordSplit = [];
    for (const letter of word){
        //console.log(letter);
        wordSplit.push("●");
    }
    wordInProgress.innerText = wordSplit.join("");
};

wordSymbols(word);

//log guessed letter and clear input field
guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    const inputValue = letterInput.value;
    //console.log(inputValue);
    letterInput.value = "";
    message.innerText = "";
    const validatedInput = validate(inputValue);
    //console.log(validatedInput);
    if (validatedInput !== undefined) {
        makeGuess(validatedInput);
    }
});

//validate letter input 
const validate = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        message.innerText = "guess a letter!";
    } else if (input.length > 1) {
        message.innerText = "enter only one letter";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "enter a letter from a-z"
    } else {
        message.innerText = "Good guess!";
        return input;
    }
 
};


//guessed letters 
const makeGuess = function (letter){
    capitalLetter = letter.toUpperCase();
    if (guessedLetters.includes(capitalLetter)) {
        message.innerText = "You already guessed that letter";
    } else {
        guessedLetters.push(capitalLetter);
    }
    console.log(guessedLetters);
};