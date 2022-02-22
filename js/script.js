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
let word = "magnolia";
// array for guessed letters
const guessedLetters = [];
// remaining guesses
let remainingGuesses = 8;

const getWord = async function () {
    const request = await fetch ("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await request.text();
    //console.log(wordData);
    const wordArray = words.split("\n");
    //console.log(wordArray);
    const randomIndex = Math.floor(Math.random() * wordArray.length); 
    console.log(randomIndex);
    word = wordArray[randomIndex].trim();
    console.log(word); 
    wordSymbols (word);
}
//getWord();


//add symbol to represent letter in the word
const wordSymbols = function (word) {
    const wordSplit = [];
    for (const letter of word){
        //console.log(letter);
        wordSplit.push("●");
    }
    wordInProgress.innerText = wordSplit.join("");
};
getWord();
//wordSymbols(word);

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
    //check a -z 
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        message.innerText = "guess a letter!";
    } else if (input.length > 1) {
        message.innerText = "enter only one letter";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "enter a letter from a-z"
    } else {
        message.innerText = `You guessed ${input.toUpperCase()}!`;
        return input;
    }
 
};

//add guessed letters to array 
const makeGuess = function (letter){
    capitalLetter = letter.toUpperCase();
    if (guessedLetters.includes(capitalLetter)) {
        message.innerText = "You already guessed that letter";
    } else {
        guessedLetters.push(capitalLetter);
        guessCount(capitalLetter);
        updateLetters();
        updateWord(guessedLetters);
    }
    console.log(guessedLetters);
};

// add guessed letter to page
const updateLetters = function () {
    liGuessedLetters.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        liGuessedLetters.append(li);
    }
};

// update word in progress
const updateWord = function (guessedLetters) {
    const wordArray = word.toUpperCase().split("");
    //console.log(wordArray);
    const revealWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push('●');
        }
    }
    console.log(revealWord);
    console.log(wordInProgress);
    wordInProgress.innerText = revealWord.join('');
    winner();
};

const guessCount = function (guess) {
    const letterArray = word.toUpperCase().split('');
    if (!letterArray.includes(guess)) {
        message.innerText = `You guessed ${guess}, try again`;
        remainingGuesses -= 1;
        console.log(remainingGuesses);
    } else {
        message.innerText = `Good Job! ${guess} is in the word!`;
    }
    if (remainingGuesses === 0) {
        message.innerText = `Game over. The correct word is ${word}`;
        span.innerText = "0 guesses"
    } else if (remainingGuesses === 1) {
        span.innerText = "only 1 guess";
    } else {
        span.innerText = ` ${remainingGuesses} guesses`;
    }
};


// check if player guessed word and won 
const winner = function () {  
    //console.log(wordInProgress);
    //console.log(wordInProgress.innerText);
    if (wordInProgress.innerText === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = '<p class="highlight">You guessed correct the word! Congrats!</p>';
    }
};



