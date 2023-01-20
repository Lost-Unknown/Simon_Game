var buttonColor = ["red", "blue","green","yellow"];
var gamePattern= [];
var userClickedPattern = [];
var gameStarted = "no";
var level = 0;
$(document).on("keydown",function (){
    if(gameStarted === "no"){
        $("#level-title").html("Level 0"); 
        nextSequence();
        gameStarted="yes"; 
    }
});
$(".btn").on("click",function(){
    userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
    animatePress(userChosenColor);
    playSound(userChosenColor);
});

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").html("Level " + level)
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColor[randomNumber];
    gamePattern.push(randomChosenColor);
    $("." + randomChosenColor).fadeOut().fadeIn();
    playSound(randomChosenColor);
}


function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3")
    audio.play();
}
function animatePress(currentColor){
    $("#"+ currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+ currentColor).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
        }
    }
    else{
        var gameOverAudio = new Audio("sounds/wrong.mp3");
        gameOverAudio.play();
        $("body").addClass("game-over");
        $("h1").html("Game Over, Press Any Key to Restart!");
        setTimeout(function (){
            $("body").removeClass("game-over");
        },200);

        startOver();
    }
}
function startOver(){
    level=0;
    gamePattern=[];
    gameStarted="no";
}