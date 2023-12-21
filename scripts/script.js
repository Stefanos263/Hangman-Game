const wordDisplay = document.querySelector(".word-display");
const hangmanImage = document.querySelector(".hangman-box img");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");

let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;

const resetGame = () => {
    //reseting all game variables and UI elements 
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = `hangman-${wrongGuessCount}.svg`;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>` ).join("");
    gameModal.classList.remove("show");
}

const getRandomWord = () => {
    // selecting a random word and a hint from the wordList
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    console.log(word);
    document.querySelector(".hint-text b ").innerText = hint;
    resetGame();
}

const gameOver = (isVictory) => {
    // after 600s of game complete.. showing modal with relevant details
setTimeout(() => {
    const modalText = isVictory ? `You found the word :` : `The correct word was :`;
    gameModal.querySelector("img").src = `${isVictory ? `victory` : `lost`}.gif`;
    gameModal.querySelector("h4").innerText = `${isVictory ? `Gongrats!` : `GameOver`}`;
    gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>` ;
 gameModal.classList.add("show")
},300);
}

const initGame = (button, clickedLetter) => {
    // checking if clickedLetter exists on the currectWord
    if (currentWord.includes(clickedLetter)){
        //showing all corext letters on the word display
      [...currentWord].forEach((letter, index) => {
        if(letter === clickedLetter){
            correctLetters.push(letter);
            wordDisplay.querySelectorAll("li")[index].innerText = letter;
            wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
        }
      })
    }else {
        wrongGuessCount++;
        hangmanImage.src = `hangman-${wrongGuessCount}.svg`;
    }
    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    //calling gameover function if any of this condition meets
    if(wrongGuessCount === maxGuesses) return gameOver(false);
    if(correctLetters.length === currentWord.length) return gameOver(true);
}
// creating keyboard buttons and adding event listeners
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}

getRandomWord();
playAgainBtn.addEventListener("click",getRandomWord);