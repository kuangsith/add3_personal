document.getElementById("startGameButton").addEventListener("click", startGame);
document.getElementById("newQuestionButton").addEventListener("click", showQuestion);

let correctAnswer;

const correctImages = ["correct/correct1.jpg", "correct/correct2.jpg", "correct/correct3.jpg", "correct/correct4.jpg"];
const incorrectImages = ["wrong/wrong1.jpg", "wrong/wrong2.jpg", "wrong/wrong3.jpg", "wrong/wrong4.jpg"];

function startGame() {
    document.getElementById("startGameSection").classList.add("hidden");
    showQuestion();
}

function showQuestion() {
    document.getElementById("resultSection").classList.add("hidden");
    document.getElementById("questionSection").classList.remove("hidden");

    // Randomly pick the answer between 9 and 19
    correctAnswer = Math.floor(Math.random() * 11) + 9;

    // Randomly pick x and y based on the correctAnswer
    const x = Math.floor(Math.random() * (correctAnswer - 3)) + 1;
    const y = Math.floor(Math.random() * (correctAnswer - x - 2)) + 1;
    const z = correctAnswer - x - y;
    

    document.getElementById("question").textContent = `${x} + ${y} + ${z}`;

    const choices = generateChoices(correctAnswer);
    const choiceButtons = document.querySelectorAll(".choiceBtn");
    choiceButtons.forEach((btn, index) => {
        btn.textContent = choices[index];
        btn.addEventListener("click", checkAnswer);
    });
}


function generateChoices(correct) {
    const choices = new Set();

    while (choices.size < 3) {
        let randomChoice = Math.floor(Math.random() * 11) + 9;
        if (randomChoice !== correct) {
            choices.add(randomChoice);
        }
    }

    const choicesArray = Array.from(choices);
    const correctPos = Math.floor(Math.random() * 4);

    choicesArray.splice(correctPos, 0, correct);
    
    // Sort the choices
    return choicesArray.sort((a, b) => a - b);
}



function getRandomImage(imagesArray) {
    const randomIndex = Math.floor(Math.random() * imagesArray.length);
    return imagesArray[randomIndex];
}

function checkAnswer(event) {
    const playerChoice = parseInt(event.target.textContent);

    document.getElementById("questionSection").classList.add("hidden");
    document.getElementById("resultSection").classList.remove("hidden");

    const resultText = document.getElementById("resultText");
    const resultImage = document.getElementById("resultImage");
    const playerChoiceElem = document.getElementById("playerChoice");
    const actualAnswerElem = document.getElementById("actualAnswer");

    // Update player's choice color and text
    playerChoiceElem.textContent = playerChoice;
    if (playerChoice === correctAnswer) {
        playerChoiceElem.classList.add("correctChoice");
        playerChoiceElem.classList.remove("incorrectChoice");
    } else {
        playerChoiceElem.classList.add("incorrectChoice");
        playerChoiceElem.classList.remove("correctChoice");
    }

    // Update the actual answer text
    const questionText = document.getElementById("question").textContent;
    actualAnswerElem.textContent = `${questionText} = ${correctAnswer}`;

    if (playerChoice === correctAnswer) {
        resultText.textContent = "Correct";
        resultText.style.color = "green";
        resultImage.src = getRandomImage(correctImages);  // Use random correct image
    } else {
        resultText.textContent = "Incorrect";
        resultText.style.color = "red";
        resultImage.src = getRandomImage(incorrectImages);  // Use random incorrect image
    }
}

