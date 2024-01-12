
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(".btn").click(function() {
    if (started === true){
      var userChosenColour = $(this).attr("id");
      userClickedPattern.push(userChosenColour);
      playSound(userChosenColour);
      animatePress(userChosenColour);
      checkAnswer(userClickedPattern.length - 1);
  
}});

function nextSequence() {

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  $("h1").text("Level " + level);
  level++;
}

//2. Create a new function called playSound() that takes a single input parameter called name.
function playSound(name) {

  //3. Take the code we used to play sound in the nextSequence() function and add it to playSound().
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(name){
  $("#" + name).addClass("pressed");
  setTimeout(function(){
    $("#" + name).removeClass("pressed");
  }, 100);
}


$(document).keypress(function(){

  if(started === false){
    started = true;
    nextSequence();
    $("h1").text("Level 0");
    $("body").removeClass("game-over");
    
  }});


function checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    }
  
  }
  else if (gamePattern.length===0){
    $("h1").text("Press A Key to Start");
  }
    
  else {
    var wrongAudio = new Audio("sounds/wrong.mp3");
    wrongAudio.play();
    startOver(); 
  }
};

function startOver(){
  $("h1").text("Game Over, Press Any Key to Restart");
  $("body").addClass("game-over");
  started = false;
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  
}