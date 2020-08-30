var questions = [{
    title: "Which US president was the first to be born in a hospital?",
    choices: ["FDR", "Carter", "Kennedy", "JFK"],
    answer: "Carter"
},
{
    title: "Who is the creator of the classic book characters Tom Sawyer and Huckleberry Finn?",
    choices: ["Charles Dickens", "Dr.Seuss", "Ernest Hemingway", "Mark Twain"],
    answer: "Mark Twain"
},
{
    title: "Which country is both an island and a continent?",
    choices: ["Ireland", "New Zeland", "Australia", "Japan"],
    answer: "Australia"
},
{
    title: "What are the three states of matter?",
    choices: ["Doesn't, Kinda, Does", "Solid, Liquid, Gas", "This, That, There", "Physical, Astrological, Theory"],
    answer: "Solid, Liquid, Gas"
},
{
    title: "A hexagon has how many sides?",
    choices: ["10", "7", " 3", "6"],
    answer: "6"
}
]


var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;


function start() {

timeLeft = 100;
document.getElementById("timeLeft").innerHTML = timeLeft;

timer = setInterval(function() {
    timeLeft--;
    document.getElementById("timeLeft").innerHTML = timeLeft;
 
    if (timeLeft <= 0) {
        clearInterval(timer);
        endGame(); 
    }
}, 1000);

next();
}


function endGame() {
clearInterval(timer);

var quizContent = `
<h2>O No, Game Over!</h2>
<h3>You got a ` + score +  ` /100</h3>
<h3>That means you got ` + score / 20 +  ` questions correct, bravo!</h3>
<input type="text" id="name" placeholder="First name"> 
<button onclick="setScore()">Set score!</button>`;

document.getElementById("quizBody").innerHTML = quizContent;
}


function setScore() {
localStorage.setItem("highscore", score);
localStorage.setItem("highscoreName",  document.getElementById('name').value);
getScore();
}


function getScore() {
var quizContent = `
<h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
<h1>` + localStorage.getItem("highscore") + `</h1><br> 

<button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Try Again, Don't Give Up!</button>

`;

document.getElementById("quizBody").innerHTML = quizContent;
}


function clearScore() {
localStorage.setItem("highscore", "");
localStorage.setItem("highscoreName",  "");

resetGame();
}


function resetGame() {
clearInterval(timer);
score = 0;
currentQuestion = -1;
timeLeft = 0;
timer = null;

document.getElementById("timeLeft").innerHTML = timeLeft;

var quizContent = `
<h1>
    JavaScript Quiz!
</h1>
<h3>
    Click to play!   
</h3>
<button onclick="start()">Start!</button>`;

document.getElementById("quizBody").innerHTML = quizContent;
}


function incorrect() {
timeLeft -= 15; 
next();
}


function correct() {
score += 20;
next();
}


function next() {
currentQuestion++;

if (currentQuestion > questions.length - 1) {
    endGame();
    return;
}

var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"

for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
    var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
    buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
    if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
        buttonCode = buttonCode.replace("[ANS]", "correct()");
    } else {
        buttonCode = buttonCode.replace("[ANS]", "incorrect()");
    }
    quizContent += buttonCode
}


document.getElementById("quizBody").innerHTML = quizContent;
}