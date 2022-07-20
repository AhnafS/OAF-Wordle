const createRow = () => {
  const row = document.createElement("div");
  row.classList.add("row");
  for (let i = 1; i <= 5; i++) {
    const tile = document.createElement("div");
    tile.classList.add(`col${i}`, "col");
    row.append(tile);
  }
  return row;
};

const insertRows = () => {
  const gameContainer = document.querySelector("#gameContainer");
  for (let i = 1; i <= 6; i++) {
    const row = createRow();
    row.classList.add(`row${i}`, "row");
    gameContainer.append(row);
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
  const keyboardContainer = document.querySelector("#keyboardContainer");

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

(() => {
  insertRows();
  createKeyboard();
})();
