// nodes
const home = document.querySelector('.home');
const playBtn = document.querySelector('.home__play');
const tables = document.querySelector('.tables');
const game = document.querySelector('.game');
const levelSpan = document.querySelector('.game__level');
const numberOne = document.querySelectorAll('.number-one');
const numberTwo = document.querySelectorAll('.number-two');
const levelStatus = document.querySelector('.game__level-status');
const questionHelp = document.querySelector('.game__header__question__help');
const answersSection = document.querySelector('.game__answers');
const answerBtns = document.querySelectorAll('.game__answer');
const nextBtn = document.querySelector('.status__next');
const statusTitle = document.querySelector('.status__title');
const statusInfo = document.querySelector('.status__info');
const statusLevel = document.querySelector('.status__level');
const statusCorrectAnswer = document.querySelector('.status__answer');

answerBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    validateAnswer(btn);
  }, false);
});

let correctAnswer;
let multiplicand;
let multiplier;
let helpper;
let answers;
let level = 1;

playBtn.addEventListener('click', () => {
  home.classList.add('inactive');
  tables.classList.remove('inactive');
}, false);

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getHelpper(multiplicand, multiplier) {
  const help = [];

  if (multiplier === 0) {
    return help;
  }

  for (let i = 1; i <= multiplier; i++) {
    help.push(multiplicand);
  }

  return help;
}

function getAnswers(correctAnswer, multiplicand) {
  const placeOfCorrectAnswer = getRandomInt(4);
  const answers = [];

  for (let i = 0; i < 4; i++) {
    let answer;
    
    if (i === placeOfCorrectAnswer) {
      answer = correctAnswer;
    } else {
      answer = getRandomInt(multiplicand * 10);
    }

    answers.push(answer);
  }

  return answers;
}

function updateDOM({ level, multiplicand, multiplier, helpper }) {
  levelSpan.textContent = level;
  numberOne.forEach((number) => {
    number.textContent = multiplicand;
  });

  numberTwo.forEach((number) => {
    number.textContent = multiplier;
  });

  if (helpper) {
    questionHelp.textContent = helpper.join(' + ');
  }
}

function loadQuestion() {
  correctAnswer = multiplicand * multiplier;
  answers = getAnswers(correctAnswer, multiplicand);

  updateDOM({
    level,
    multiplicand,
    multiplier,
    helpper,
  });
}

function getAnswers(correctAnswer, multiplicand) {
  const placeOfCorrectAnswer = getRandomInt(4);
  const answers = [];

  for (let i = 0; i < 4; i++) {
    let answer;
      if (i === placeOfCorrectAnswer) {
        answer = correctAnswer;
      } else {
        answer = getRandomInt(multiplicand * 10);
        if (answer === correctAnswer || answers.includes(answer)) {
          answer = getRandomInt(multiplicand * 10);
        }
      }

    answers.push(answer);
  }

  return answers;
}

function loadNextLevel() {
  level += 1;
  multiplier = (level > 10) ? getRandomInt(10) : multiplier + 1;

  if (level <= 20) {
    helpper = getHelpper(multiplicand, multiplier);
  } else {
    questionHelp.style.display = 'none';
  }

  loadQuestion();
  loadAnswers();
}

function showWinStatus() {
  game.classList.add('inactive');

  statusTitle.textContent = 'Bien hecho!';
  statusInfo.textContent = 'Has completado el nivel:';
  statusLevel.textContent = level;
  statusCorrectAnswer.textContent = correctAnswer;
  nextBtn.textContent = 'Siguiente nivel';
  nextBtn.addEventListener('click', () => {
    levelStatus.classList.add('inactive');
    game.classList.remove('inactive');
  });

  levelStatus.classList.remove('inactive');
}

function gameOver() {
  game.classList.add('inactive');
  levelStatus.classList.remove('inactive');

  statusTitle.textContent = 'Game Over!';
  statusInfo.textContent = 'Has fallado en el nivel:';
  statusLevel.textContent = level;
  statusCorrectAnswer.textContent = correctAnswer;
  nextBtn.textContent = 'Home';

  nextBtn.addEventListener('click', () => {
    location.reload();
  });
}

function validateAnswer(btn) {
  const answer = parseInt(btn.textContent);

  if (answer === correctAnswer) {
    showWinStatus();
    loadNextLevel();
  } else {
    gameOver();
  }

}

function loadAnswers() {
  answers = getAnswers(correctAnswer, multiplicand);

  answerBtns.forEach((btn, index) => {
    btn.textContent = answers[index];
  });
}

function startGame(number) {
  tables.classList.add('inactive');
  game.classList.remove('inactive');

  multiplicand = number;
  multiplier = 1;
  level = 1;
  helpper = getHelpper(multiplicand, multiplier);

  loadQuestion();
  loadAnswers();
}