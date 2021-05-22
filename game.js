var buttonColors = ["green", "red", "yellow","blue"];
var gamePattern = [];
var userClickedPattern = [];
var gameStart = false;
var gameStart2 = false;
var level = 0;


$(document).keydown(function() {
    if (!gameStart) {
        console.log('tried')
        $('h1').text('LEVEL: ' + level);
        nextSequence();
        gameStart = true;
    }
})

$('.btn').click(function(e) {
        var buttonColor = e.target.id;
        userClickedPattern.push(buttonColor);
        checkAnswer(userClickedPattern.length-1);
        if (gameStart) {
            playSound(buttonColor);
        }
});


function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }


//Animate randomly selected color user

$('.btn').click(function (e) { 
    $('#' + e.target.id).animate({
        opacity: '0.2'
    }, 125)
    $('#' + e.target.id).animate({
        opacity: '1'
    }, 125)
});


function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000)
        }
    } else {
        playSound("wrong")
        if (gameStart) {
            $('body').addClass('game-over');

            setTimeout(function () {
                $('body').removeClass('game-over');
            }, 250);
    
            $('h1').text('Game Over, Press Any Key to Restart');
    
            startOver();
        }
    }
}



function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomColor = buttonColors[randomNumber];
    gamePattern.push(randomColor);
    
    level++;
    $('h1').text('LEVEL: ' + level);
    
    $('.btn').ready(function () { 
        $('#' + randomColor).animate({
            opacity: '0.2'
        }, 125)
        $('#' + randomColor).animate({
            opacity: '1'
        }, 125)
    });

    playSound(randomColor);
}

function startOver() {
    level = 0;
    gamePattern = [];
    gameStart = false;
    userClickedPattern === [];
}