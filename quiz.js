const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');

var secondsLeft = 60;
var timerInterval;
function setTime() {
    timerInterval = window.setInterval(function () {
        secondsLeft--;
        var Elspt = document.getElementById("time");
        Elspt.innerHTML = secondsLeft + " seconds left";
        if (secondsLeft === 0 || secondsLeft < 0) {
            clearInterval(timerInterval);
            //sendMessage("Times Up!");
            setTimeout(function() { alert("Time's Up!"); }, time);
        }
    }, 1000);
}


// questions 
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
var answer = "correct";

let questions = [
    {
        question: 'Which one of these characters is not friends with Harry Potter?',
        choice1: 'Ron Weasley',
        choice2: 'Neville Longbottom',
        choice3: 'Draco Malfoy',
        choice4: 'Hermione Granger',
        answer: 3
    },
    {
        question: 'What is the color of Donald Duck’s bowtie',
        choice1: 'Red',
        choice2: 'Yellow',
        choice3: 'Blue',
        choice4: 'White',
        answer: 1
    },
    {
        question: 'What was the name of the band Lionel Richie was a part of?',
        choice1: 'King Harvest',
        choice2: 'Spectrums',
        choice3: 'Commodores',
        choice4: 'The Marshalle  Tucker Band',
        answer: 3
    },
    {
        question: 'Which animal does not appear in the Chinese zodiac?',
        choice1: 'Dragon',
        choice2: 'Rabbit',
        choice3: 'Dog',
        choice4: 'Hummingbird',
        answer: 1
    },
    {
        question: 'Which country held the 2016 Summer Olympics?',
        choice1: 'China',
        choice2: 'Ireland',
        choice3: 'Brazil',
        choice4: 'Italy',
        answer: 3
    },
    {
        question: 'Which planet is the hottest?',
        choice1: 'Venus',
        choice2: 'Saturn',
        choice3: 'Mercury',
        choice4: 'Mars',
        answer: 1
    },
    {
        question: 'Who was the only U.S. President to resign?',
        choice1: 'Herbert Hoover',
        choice2: 'Richard Nixon',
        choice3: 'George W. Bush',
        choice4: 'Barack Obama',
        answer: 2
    },
    {
        question: 'What does the “D” in “D-Day” stand for?',
        choice1: 'Dooms',
        choice2: 'Dark',
        choice3: 'Denmark',
        choice4: 'Dunkirk',
        answer: 4
    },
    {
        question: 'In Pirates of the Caribbean, what was the name of Captain Jack Sparrow’s ship?',
        choice1: 'The Marauder',
        choice2: 'The Black Pearl',
        choice3: 'The Black Python',
        choice4: 'The Slytherin',
        answer: 2
    },
    {
        question: 'What is the rarest blood type?',
        choice1: 'O',
        choice2: 'A',
        choice3: 'B',
        choice4: 'AB-Negative',
        answer: 4
    }
];




//CONSTANTS

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
    setTime();
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        //go to the end page
        return window.location.assign('end.html');
    }
    questionCounter++;
    questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;


    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        console.log(selectedAnswer);

        const classToApply =
            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if (classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        } else {
            secondsLeft = secondsLeft - 5;
        };

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});


incrementScore = num => {
    score += num;
    scoreText.innerText = score;

};
startGame();
