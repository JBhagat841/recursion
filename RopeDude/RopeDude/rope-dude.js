/* eslint-disable no-unused-vars */

const ASCIIART = [
  `
  +---+
  |   |
  O   |
 /|\\\  |
 / \\\  |
      |
=========`,
  `
  +---+
  |   |
  O   |
 /|\\\  |
 /    |
      |
      
=========`,
  `
  +---+
  |   |
  O   |
 /|\\\  |
      |
      |
=========`,
  `
  +---+
  |   |
  O   |
 /|   |
      |
      |
=========`,
  `
  +---+
  |   |
  O   |
  |   |
      |
      |
=========`,
  `
  +---+
  |   |
  O   |
      |
      |
      |
=========`,
  `
  +---+
  |   |
      |
      |
      |
      |
=========`,
];

class RopeDude {
  constructor(secretWord) {
    this.remainingGuesses = 6;
    this.lettersGuessed = [];
    this.gameState = 'playing';
    this.secretWord = secretWord.toLowerCase().split('');
  }

  computeGameState() {
    let won = this.secretWord.every(
      letter => this.lettersGuessed.includes(letter) || letter === ' '
    );
    if (this.remainingGuesses === 0) {
      this.gameState = 'lost';
    } else if (won) {
      this.gameState = 'won';
    } else {
      this.gameState = 'playing';
    }
  }
  getSecretWordPuzzle() {
    return this.secretWord
      .map(letter => {
        if (this.lettersGuessed.includes(letter) || letter === ' ') {
          return letter;
        } else {
          return '#';
        }
      })
      .join('');
  }

  getGameStateMessage() {
    if (this.gameState === 'playing') {
      return `There is a total of ${
        this.remainingGuesses
        } guesses remaining:\n${
        this.remainingGuesses === 6
          ? ASCIIART[ASCIIART.length - 1]
          : ASCIIART[this.remainingGuesses]
        }`;
    } else if (this.gameState === 'lost') {
      return `Game Over, the word was "${this.secretWord.join('')}":\n${
        ASCIIART[0]
        }`;
    } else {
      return `Winner Winner Chicken Dinner, you won!`;
    }
  }

  submitGuess(guess) {
    guess = guess.toLowerCase();
    const incorrect = !this.secretWord.includes(guess);
    const uniqueGuess = !this.lettersGuessed.includes(guess);
    if (this.gameState !== 'playing') {
      return;
    }

    if (uniqueGuess) {
      this.lettersGuessed.push(guess);
    }

    if (incorrect && uniqueGuess) {
      this.remainingGuesses--;
    }
  }
}

const game = new RopeDude('hello');


const simulateRopeDude = (secretWord) => {
  const characters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  const game = new RopeDude(secretWord);

  function playRopeDude() {
    if (game.gameState !== 'playing') {
      return game.getGameStateMessage();
    } else {
      const randomIndex = Math.floor(Math.random() * 26);
      const guess = characters[randomIndex];
      game.submitGuess(guess);
      game.computeGameState();
      return playRopeDude();
    }
  }

  return playRopeDude();
}

// for(let i = 0; i < 1000; i++) {
//  console.log(simulateRopeDude('coffee')); 
// }