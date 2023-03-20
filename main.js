import './style.css';
import baffle from 'baffle';

// Declare needed variables
const characters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
  'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a',
  'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q',
  'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5',
  '6', '7', '8', '9', '~', '`', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')',
  '_', '-', '+', '=', '{', '[', '}', ']', ',', '|', ':', ';', '<', '>', '.', '?',
  '/'];
const infoIcon = document.querySelector('.fa-circle-question');
const infoBox = document.querySelector('.info-box');
const warningBox = document.querySelector('.warning-box');
const passwordLength = document.getElementById('password-length');
const upperCase = document.getElementById('uppercase');
const lowerCase = document.getElementById('lowercase');
const numbers = document.getElementById('numbers');
const symbols = document.getElementById('symbols');
const generateButton = document.getElementById('app-btn');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const copyIcon = document.getElementById('copy-icon');
const checkIcon = document.getElementById('check-icon');
const copyIcon2 = document.getElementById('copy-icon2');
const checkIcon2 = document.getElementById('check-icon2');

// Animate the green header part using Baffle.js
const text = baffle('#green-header');
text.set({
  characters: 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz~!@#$%^&*()-+=[]{}|;:,./<>?',
  speed: 100,
});
text.start();
text.reveal(2000);

// Show the info box
infoIcon.addEventListener('pointerover', () => {
  infoBox.classList.add('active');
});

// Hide the info box
infoIcon.addEventListener('pointerout', () => {
  infoBox.classList.remove('active');
});

// Check if the character is a lowercase letter
function isLowerCase(character) {
  return (
    character === character.toLowerCase()
        && character.match(/[a-zA-Z]/i)
  );
}

// Check if the character is an uppercase letter
function isUpperCase(character) {
  return (
    character === character.toUpperCase()
        && character.match(/[a-zA-Z]/i)
  );
}

// Check if the character is a number
function isNumber(character) {
  return !Number.isNaN(Number(character));
}

// Check if the character is a symbol
function getSymbols(character) {
  const symbols = ['~', '`', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')',
    '_', '-', '+', '=', '{', '[', '}', ']', ',', '|', ':', ';', '<', '>', '.', '?',
    '/'];
  return symbols.includes(character);
}

// Generate a random password
function generatePassword() {
  let randomPassword = '';
  let newCharacters = characters;

  // Generate a random password based on the selected options
  switch (true) {
    case lowerCase.checked && upperCase.checked && numbers.checked && symbols.checked:
      newCharacters = characters;
      break;

    case lowerCase.checked && upperCase.checked && numbers.checked:
      newCharacters = characters.filter(isLowerCase)
        .concat(characters.filter(isUpperCase))
        .concat(characters.filter(isNumber));
      break;

    case lowerCase.checked && upperCase.checked && symbols.checked:
      newCharacters = characters.filter(isLowerCase)
        .concat(characters.filter(isUpperCase))
        .concat(characters.filter(getSymbols));
      break;

    case lowerCase.checked && numbers.checked && symbols.checked:
      newCharacters = characters.filter(isLowerCase)
        .concat(characters.filter(isNumber))
        .concat(characters.filter(getSymbols));
      break;

    case upperCase.checked && numbers.checked && symbols.checked:
      newCharacters = characters.filter(isUpperCase)
        .concat(characters.filter(isNumber))
        .concat(characters.filter(getSymbols));
      break;

    case lowerCase.checked && upperCase.checked:
      newCharacters = characters.filter(isLowerCase)
        .concat(characters.filter(isUpperCase));
      break;

    case lowerCase.checked && numbers.checked:
      newCharacters = characters.filter(isLowerCase)
        .concat(characters.filter(isNumber));
      break;

    case upperCase.checked && numbers.checked:
      newCharacters = characters.filter(isUpperCase)
        .concat(characters.filter(isNumber));
      break;

    case numbers.checked && symbols.checked:
      newCharacters = characters.filter(isNumber)
        .concat(characters.filter(getSymbols));
      break;

    case upperCase.checked && symbols.checked:
      newCharacters = characters.filter(isUpperCase)
        .concat(characters.filter(getSymbols));
      break;

    case lowerCase.checked && symbols.checked:
      newCharacters = characters.filter(isLowerCase)
        .concat(characters.filter(getSymbols));
      break;

    case lowerCase.checked:
      newCharacters = characters.filter(isLowerCase);
      break;

    case upperCase.checked:
      newCharacters = characters.filter(isUpperCase);
      break;

    case numbers.checked:
      newCharacters = characters.filter(isNumber);
      break;

    case symbols.checked:
      newCharacters = characters.filter(getSymbols);
      break;

    default:
      newCharacters = characters;
  }

  // Generate the random password based on password length & checkboxes
  for (let i = 0; i < passwordLength.value; i += 1) {
    const randomIndex = Math.floor(Math.random() * newCharacters.length);
    randomPassword += newCharacters[randomIndex];
  }
  return randomPassword;
}

// Add event listener to the generate button
generateButton.addEventListener('click', () => {
  if (passwordLength.value > 5 && passwordLength.value < 16) {
    password.innerText = generatePassword();
    password2.innerText = generatePassword();

    const pass = baffle('.password');
    pass.set({
      characters: characters.join(''),
      speed: 10,
    });
    pass.start();
    pass.reveal(2000);
  } else if (passwordLength.value < 6) {
    passwordLength.value = 6;
    warningBox.style.display = 'flex';
    setTimeout(() => {
      warningBox.style.display = 'none';
    }, 3000);
  } else {
    passwordLength.value = 15;
    warningBox.style.display = 'flex';
    setTimeout(() => {
      warningBox.style.display = 'none';
    }, 3000);
  }
});

// Copy the password to the clipboard
function copyPassword(event) {
  if (event.target.innerText === 'Click on the button to generate a password') {
    return;
  }
  navigator.clipboard.writeText(event.target.innerText);
}

// Add event listener to the 1st password field to be copied
password.addEventListener('click', (event) => {
  if (event.target.innerText === 'Click on the button to generate a password') {
    return;
  }
  copyPassword(event);
  copyIcon.style.display = 'none';
  checkIcon.style.display = 'block';
  setTimeout(() => {
    checkIcon.style.display = 'none';
  },
  400);
  setTimeout(() => {
    copyIcon.style.display = 'block';
  },
  400);
});

// Add event listener to the 2nd password field to be copied
password2.addEventListener('click', (event) => {
  if (event.target.innerText === 'Click on the button to generate a password') {
    return;
  }
  copyPassword(event);
  copyIcon2.style.display = 'none';
  checkIcon2.style.display = 'block';
  setTimeout(() => {
    checkIcon2.style.display = 'none';
  },
  400);
  setTimeout(() => {
    copyIcon2.style.display = 'block';
  },
  400);
});
