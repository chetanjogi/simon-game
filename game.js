
var buttonColours=["red","blue","green","yellow"];
var gamePattern =[];
var userClickedPattern=[];
var started= false;
var level=0;

$(document).on("keypress",function(){
  if(!started){
    $("#level-title").text("Level "+ level);
    nextSequence();
    started =true;
  }
});

$(".btn").click(function(){
  var useChosenColour= $(this).attr("id");
  userClickedPattern.push(useChosenColour);
  playSound(useChosenColour);
  animePress(useChosenColour);
  checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    console.log("success");
    if(userClickedPattern.length===gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  } else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over,Press Any Key to Restart");
    startOver();
  }

}
function startOver(){
  started=false;
  level=0;
  gamePattern=[];
}

function nextSequence(){

  userClickedPattern=[];
  level++;
  $("#level-title").text("Level "+ level);
  var randomNumber= Math.floor(Math.random()*4);

  var randomChosenColour=buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

function playSound(name){
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animePress(currentcolour){
  $("#"+currentcolour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentcolour).removeClass("pressed");
  },100);
}
