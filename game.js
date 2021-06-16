var userClickedPattern = [];
var gameStarted = false;
var level = 0;

var buttonColors = ["green","red","yellow","blue",];
var gamePattern = [];

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function nextSequence(){
  level+=1;
  $("h1").text("Level " + level);
  var randomNumber =Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);
  playSound(randomChosenColor);


  $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
}

function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");

  setTimeout(function(){  $("#" + currentColor).removeClass("pressed"); }, 100);
}

function startOver(){
  level = 0;
  gamePattern = [];
  gameStarted = false;
}

function checkAnswer(currentLevel,indexOfLastAnswer){
  if(userClickedPattern[indexOfLastAnswer] === gamePattern[indexOfLastAnswer]){

  if(userClickedPattern.length === currentLevel){

    userClickedPattern = [];
    setTimeout(nextSequence,2000);
  }
}
else{
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },200);
  $("h1").text("Game over, Press Any key to restart");
  startOver();
}
}
$(".btn").click(function(){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(level,userClickedPattern.length-1);






});

$(document).keydown(function(){
  if(!gameStarted){
    gameStarted = true;
    nextSequence();
  }
});
