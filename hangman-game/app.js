const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popupEL = document.getElementById('popup-container');
const notificationEl = document.getElementById('notification-container');
const finalMsg = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

// DEFINE WORDS
const words = ['application', 'dog', 'tram', 'lodz'];

// GET A RANDOM WORD FROM THE ARRAY
let selectedWord = words[Math.floor(Math.random() * words.length)];

// ARRAY FOR CORRECT LETTERS
const correctLetters = [];

// ARRAY FOR WRONG LETTERS
const wrongLetters = [];

// DISPLAY HIDDEN WORD
function displayWord() {
  wordEl.innerHTML = `
    ${selectedWord
      .split('')
      .map(
        (letter) => `
          <span class="letter">
          ${correctLetters.includes(letter) ? letter : ''}
          </span>
        `
      )
      .join('')}
  `;

  const innerWord = wordEl.innerText.replace(/\n/g, '');

  if (innerWord === selectedWord) {
    finalMsg.innerText = 'Gratulacje, wygrałeś! 😎🍆';
    popupEL.style.display = 'flex';
  }
}

// UPDATE WRONG LETTERS
function updateWrongLettersEl() {
  // DISPLAY WRONG LETTERS
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;

  // DISPLAY PARTS
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  });

  // CHECK IF LOST
  if (wrongLetters.length === figureParts.length) {
    finalMsg.innerText = 'You Lost.';
    popupEL.style.display = 'flex';
  }
}

//SHOW NOTIFICATION
function showNotificationEl() {
  notificationEl.classList.add('show');

  setTimeout(() => {
    notificationEl.classList.remove('show');
  }, 3000);
}
// KEYDOWN LETTER PRESS
window.addEventListener('keydown', (e) => {
  //console.log(e.keyCode);
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        displayWord();
      } else {
        showNotificationEl();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWrongLettersEl();
      } else {
        showNotificationEl();
      }
    }
  }
});

// RESTART GAME
playAgainBtn.addEventListener('click', () => {
  // EMPTY THE ARRAYS
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();

  updateWrongLettersEl();

  popupEL.style.display = 'none';
});

displayWord();
