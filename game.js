let level = 0;

let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

$(document).one("keydown", function() {
    nextSequence();
})

function nextSequence() {
    userClickedPattern = [];
    let randomNumber = Math.round(Math.random() * 3);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(250).fadeIn(250);
    playSounds(randomChosenColour);
    animatePress(randomChosenColour);
    $("h1").text("Level " + level);
    level++;
}

$(".btn").on("click", (event) => {
    let userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    playSounds(event.target.id);
    animatePress(event.target.id);
    checkAnswer(userClickedPattern);
})

function playSounds(name) {
    let sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    let ok = 0;
    if (gamePattern.length === userClickedPattern.length) {
        for (let i = 0; i < gamePattern.length; i++) {

            if (gamePattern[i] == userClickedPattern[i]) {
                ok++;

            } else {
                let wrong = new Audio("sounds/wrong.mp3");
                wrong.play();
                $("body").addClass("game-over");
                setTimeout(() => {
                    $("body").removeClass("game-over");
                }, 500);
                $("h1").text("You Lose Press a Key to Restart");
                startOver();
            }

        }
        if (ok == gamePattern.length && ok !== 0) {
            setTimeout(() => {
                nextSequence();
            }, 1300);
        }
    }
}


function startOver() {
    level = 0;
    gamePattern = [];
    $(document).one("keydown", function() {
        nextSequence();
    })
}