//This JS file is for tutoring purposes only 

//Here we create variables for all elements on the html
//Where the questions will render
var questionSector = document.getElementById("questions")

//Timer sector
var timerSector = document.getElementById("timer")

//start screen sector
var startScreenSector = document.getElementById("start-screen")

//start button
var startButton = document.getElementById("buttonStart")

//Next button
var startQ = document.getElementById("buttonQ")

//Grab the timer html placeholder
var timerPlacement = document.getElementById("timer")
//Create Timer variables 
var theTime = questions.length * 15; 

//create time placeholder (holds the actual time)
var theSeconds;

//current question the user is on
var currentQuestion = 0;

//holds the current options
var currentChoice = document.getElementById("question-choices")
//Create a funtion that will begin (render your questions) the quiz
function startQuiz() {
    //hide start-screen
    //call the start screen variable and hide it 
    startScreenSector.setAttribute("class", "hide")

        //This removes the hide attribute
    questionSector.removeAttribute("class")

    //Start Timer
    theSeconds = setInterval(tickTimes, 1000)

    //Adding the time to the page
    timerPlacement.textContent = theTime;
    renderQuestions();
}

//Creating the function that allows for ticking - timing the speed of the timer 
function tickTimes(){
    //update the time
    theTime--;
    timerPlacement.textContent = theTime;
    //create an if statement for if the timer hits 0
    if (theTime <= 0){
        console.log("game ended");
        quizEnd();
    }
}

//Render the questions
function renderQuestions(){
    //get the users current question 
    var userIsOnQuestion = questions[currentQuestion];

    //update the title on the html with the current question title 
    var titleOnHtml = document.getElementById("question-title")
    titleOnHtml.textContent = userIsOnQuestion.title;

    //clear out any old choices
    currentChoice.innerHTML = "";
    
    //loop over the choices within your array and append to the currentChoice id
    userIsOnQuestion.choices.forEach(function(choices, i){
        //create new buttons with each choice 
        //create a variable that CREATES buttons
        var choiceButtons = document.createElement("button")
        choiceButtons.setAttribute("class", "choice");
        choiceButtons.setAttribute("value", choices);

        //place the text directly onto the button
        choiceButtons.textContent = i + 1 + ". " + choices;
        //attach click eventlistener to each choice
        choiceButtons.onclick = nextQuestion;
        //display on the page
        currentChoice.appendChild(choiceButtons);
    })
}

//Function that will determine wrong or right
function nextQuestion(){
    //check if user guessed right
    if(this.value !== questions[currentQuestion].answer){
        //penalize time
        theTime -= 15;

        if(theTime <= 0){
            theTime = 0
            quizEnd();
        }

        //display the new time on page
        timerPlacement.textContent = theTime;
        alert('wrong')
        

    } else {
        alert('correct')
    };
    //move to the next question
    currentQuestion++;

//check if we are out of the questions
    if (currentChoice === questions.lenght) {
    quizEnd();
    } else {
    renderQuestions();
 }
}
// stop timer
function quizEnd() {
    clearInterval(theSeconds);
    var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = theTime;
    finalScoreEl.style.display = "block";
}
// end screen
var endScreenSector = document.getElementById("end-screen");
endScreenSector.removeAttribute("class");

//show final score


//hide question section
questionSector.setAttribute("class", "hide");







//Add an evelistener to the button 
startButton.onclick = startQuiz;
startQ.onclick = nextQuestion;