// Global Vars
let guessesLeft = 6;
let currentGuess = [];
let nxtLtr = 0;
let wordList = ["apple", "cards", "cramp", "hello", "found"];
let rightGuessString = wordList[Math.floor(Math.random() * wordList.length)];
console.log(Math.floor(Math.random() * wordList.length));
console.log(rightGuessString);

const createBoard = () => {
  const board = document.querySelector("#board");
  for (let i = 0; i < 6; i++) {
    let rowDiv = document.createElement("div");
    rowDiv.classList = `row row${i}`;
    for (let j = 0; j < 5; j++) {
      let tile = document.createElement("div");
      tile.classList.add("tile");
      rowDiv.append(tile);
    }
    board.append(rowDiv);
  }
};

const createKeyboardButton = (array) => {
  const keyboardRow = document.createElement("div");
  array.forEach((letter) => {
    const tile = document.createElement("button");
    tile.textContent = letter;
    tile.classList.add("keyboardLetter");
    keyboardRow.append(tile);
  });
  return keyboardRow;
};

const createKeyboard = () => {
  const keyboardContainer = document.querySelector("#keyboard");

  const keyboardArr1 = ["q", "w", "e", "r", "t", "y ", "u", "i", "o", "p"];
  const keyboardArr2 = ["a", "s", "d", "f", "g", "h", "i", "j", "k", "l"];
  const keyboardArr3 = ["enter", "z", "x", "c", "v", "b", "n", "m", "delete"];

  const keyboard1 = createKeyboardButton(keyboardArr1);
  keyboard1.classList.add("keyboard1");
  const keyboard2 = createKeyboardButton(keyboardArr2);
  keyboard2.classList.add("keyboard2");
  const keyboard3 = createKeyboardButton(keyboardArr3);
  keyboard3.classList.add("keyboard3");

  keyboardContainer.append(keyboard1, keyboard2, keyboard3);
};

document.addEventListener("keyup", (e) => {
  if (guessesLeft === 0) {
    return;
  }

  let keypressed = String(e.key);
  console.log(keypressed);
  if (keypressed === "Backspace" && nxtLtr !== 0) {
    deleteLetter();
    return;
  }

  if (keypressed === "Enter") {
    checkGuess();
    return;
  }

  let validKey = keypressed.match(/[a-z]/gi);
  if (!validKey || keypressed === "Backspace" || keypressed === "Enter") {
    return;
  } else {
    addLetter(keypressed);
  }
});

const addLetter = (keypressed) => {
  if (nxtLtr === 5) return;
  let row = document.querySelector(`.row${6 - guessesLeft}`);
  console.log(row);
  let tile = row.children[nxtLtr];
  handleAnimation(tile, "pulse");
  tile.textContent = keypressed;
  currentGuess.push(keypressed);
  nxtLtr += 1;
};

const deleteLetter = () => {
  let row = document.querySelector(`.row${6 - guessesLeft}`);
  let tile = row.children[nxtLtr - 1];
  tile.textContent = "";
  currentGuess.pop();
  nxtLtr -= 1;
};

const checkGuess = async () => {
  let row = document.querySelector(`.row${6 - guessesLeft}`);
  let guessString = "";
  let rightGuess = Array.from(rightGuessString);

  for (const val of currentGuess) {
    guessString += val;
  }

  if (guessString.length != 5) {
    alert("Not enough letters!");
    return;
  }

  for (let i = 0; i < 5; i++) {
    let letterColor = "";
    let tile = row.children[i];
    // let letter = currentGuess[i];

    let letterPosition = rightGuess.indexOf(currentGuess[i]);
    // is letter in the correct guess
    if (letterPosition === -1) {
      letterColor = "grey";
    } else {
      // now, letter is definitely in word
      // if letter index and right guess index are the same
      // letter is in the right position
      if (currentGuess[i] === rightGuess[i]) {
        // shade green
        letterColor = "#538d4e";
      } else {
        // shade box yellow
        letterColor = "#b59f3b";
      }

      rightGuess[letterPosition] = "#";
    }

    await sleep(250);
    await handleAnimation(tile, "flipInX");
    tile.style.backgroundColor = letterColor;
  }

  if (guessString === rightGuessString) {
    userGuessedCorrect(row);
    guessesLeft = 0;
    return;
  } else {
    guessesLeft -= 1;
    currentGuess = [];
    nxtLtr = 0;

    if (guessesLeft === 0) {
      alert(`correct word was: "${rightGuessString}"`);
    }
  }
};

const userGuessedCorrect = async (row) => {
  console.log("it came to user guessed correct");
  for (let i = 0; i < 5; i++) {
    let tile = row.children[i];
    await sleep(250);
    await handleAnimation(tile, "bounce");
  }
  return;
};

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// Animations
const handleAnimation = (element, animation, prefix = "animate__") =>
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = element;

    node.classList.add(`${prefix}animated`, animationName);
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
    }

    node.addEventListener("animationend", handleAnimationEnd, { once: true });
    resolve(1);
  });

window.addEventListener("load", () => {
  createBoard();
  createKeyboard();
});
