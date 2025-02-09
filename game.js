var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern =[];

var userClickedPattern = [];

var gameStarted = false;

var level = 0;

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour); 
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

$(document).keydown(function(){
    if(gameStarted === false){
        gameStarted = true;
        level = 0;
        $("h1").text("Level " + level);
        nextSequence();
    }
});

function playSound(name) { 
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);

}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){  // the return sono colori non numeri userClickedPattern[0] = red or whatever|gamePattern[0] = un colore
        console.log("Success");

       if(userClickedPattern.length === gamePattern.length){
        setTimeout(function(){
            nextSequence();
        }, 1000);
    } 
  } else {
        console.log("Wrong!");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
        $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }}

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level); 

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber]; // this is a var that holds one of the colours' name, picked randomly based on the random num generation i created
    gamePattern.push(randomChosenColour);

    $("#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function startOver(){
    level = 0;
    gamePattern = [];
    gameStarted = false;
}