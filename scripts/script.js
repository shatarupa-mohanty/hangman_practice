const hintText = document.querySelector(".hint b");
const wordDisplay = document.querySelector(".word");
const keyboard = document.querySelector(".keyboard");
const chances = document.querySelector(".incorrect b");
const hangImg = document.querySelector(".hangman_state img");
const gamestatus = document.querySelector(".card_head");

let currword;
let wrngCount = 0;
const maxguess = 6;
let correctword = [];

const resetGame = () => {
    document.querySelector(".results").classList.remove("show");
    wrngCount = 0;
    correctword = [];
    hangImg.src = `images/hangman-${wrngCount}.svg`;
    randomWord();
    chances.innerText = `${wrngCount} / ${maxguess}`;
    keyboard.querySelectorAll("button").forEach((btn) => btn.disabled = false)
}

const gameOver = (isVictory) => {
    // gamestatus.innerText = `${isVictory} ? 'YOU WON' : 'GAME OVER'`;
    if (isVictory) {
        gamestatus.innerText = 'YOU WON!!';
        document.querySelector(".report_card img").src = 'images/victory.gif';
        document.querySelector(".answer").innerHTML = `You found the word: <b>${currword}</b>`;
        // document.querySelector(".answer b").innerText = ``;
        document.querySelector(".results").classList.add("show");
        // console.log("wonnn");
    }
    else {
        gamestatus.innerText = 'YOU LOST!!';
        document.querySelector(".report_card img").src = 'images/lost.gif';
        document.querySelector(".answer").innerHTML = `The correct word was: <b>${currword}</b>`;
        // document.querySelector(".answer b").innerText = `${currword}`;
        document.querySelector(".results").classList.add("show");
    }
}

const initGame = (button, clickedLetter) => {
    if (currword.includes(clickedLetter)) {
        [...currword].forEach((letter, index) => {
            if (letter === clickedLetter) {
                correctword.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
            }
        })
    } else {
        wrngCount++;
        chances.innerText = `${wrngCount} / ${maxguess}`;
        hangImg.src = `images/hangman-${wrngCount}.svg`;
    }
    button.disabled = true;

    if (wrngCount === maxguess) return gameOver(false);
    if (currword.length === correctword.length) return gameOver(true);

}

for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboard.appendChild(button);
    button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)));
}

const randomWord = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    console.log(word);
    currword = word;
    hintText.innerText = hint;
    wordDisplay.innerHTML = word.split("").map(() => '<li class="letter"></li>').join("");
}

randomWord();

document.querySelector(".play_again").addEventListener("click", resetGame);