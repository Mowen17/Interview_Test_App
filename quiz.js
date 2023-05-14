const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions= [];



let questions = [
    {
        question: "What is the captial of France?",
        choice1: "London",
        choice2: "Paris",
        choice3: "New York",
        choice4: "Tokyo",
        answer: 2
    },
    {
        question: "What is the largest planet in our solar System?",
        choice1: "Mars",
        choice2: "Jupiter",
        choice3: "Venus",
        choice4: "Saturn",
        answer: 2
    },
    {
        question: "What is the currency of Japan?",
        choice1: "Yen",
        choice2: "dollar",
        choice3: "Euro",
        choice4: "Pound",
        answer: 1
    }
];


//constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startQuiz = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestions();
};

getNewQuestions = () => {

    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        //go to the end page
        return window.location.assign("/end.html")
    }
    
    questionCounter++;
    questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
        currentQuestion = availableQuestions[questionsIndex];
        question.innerText = currentQuestion.question;

        choices.forEach(choice => {
            const number = choice.dataset["number"];
            choice.innerText = currentQuestion["choice" + number];
        });

        availableQuestions.splice(questionsIndex, 1);

        acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        console.log(e.target);
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];


       const classToApply = 
       selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        console.log(classToApply);

        if (classToApply == 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestions();
        }, 1000);

    });
});

incrementScore = num => {
    score +=num;
    scoreText.innerText = score;
};

startQuiz();