$(document).ready(function () {
    var clicks = 0;
    var timeleft;
    var gameOn = false
    var bonusOn = false;
    var clicksToLevel;
    var level = 1;
$("#start").click(startTimer);
    
function startTimer() {
    var topClicks = 0,
        topLevel = 0;
    $("#gameon-header").show();
    $(".runaway-box").show();
    $("#start").hide();
    $("#description").hide();
    gameOn = true;
    timeleft = 10000;
    clicks = 0;
    
    var $specialTimer = setInterval (function() {
        if (gameOn == true)
            bonusLevel();
    }, Math.floor(18000 + (Math.random()*80)-40)*1000)
    
    
    var $timer = setInterval (function(){
        if (timeleft > 0 ){
            timeleft-=100;
            $("#timer")[0].innerHTML = "Time left: " + timeleft;
        }
        if (timeleft == 0) {
            gameOn = false;
            clearInterval($timer);
            $("#start").show();
            if (clicks > topClicks) {
                topClicks = clicks;
                topLevel = level;
                $("#top-clicks")[0].innerHTML = "Best score: level " + topLevel + " (" + topClicks + " clicks)";
            }
        }
    }, 100);
}


 function changeLevel() {
     var timeToAdd;
     var totalClicks = 0;
     var speed;
     timeToAdd = (Math.pow(level, 2)*500)+10000;
     clicksToLevel = Math.pow(level, 2)+(Math.floor(timeToAdd/1000));
     console.log("Time to add: " + timeToAdd)
     console.log("Clicks to levelup " + clicksToLevel)
     if (clicks >= clicksToLevel) {
         clicks = 0;
         totalClicks += clicks;
         timeleft += timeToAdd;
         level += 1;
         speed = 1-Math.pow(level/10, 2)
         changeSpeed(speed);
     }
    $("#level")[0].innerHTML = "Level: " + level; 
}
    
    
function changeSpeed(speed) {
   $(".runaway-box").css({"-webkit-transition": "top "+speed+"s, left "+speed+"s",
                        "transition": "top "+speed+", left "+speed+"s"});
     
    }
    
function changeClicks() {
    clicks+=1;
    if (bonusOn == true)
        clicks += 1;
    changeLevel();
    $("#clicks")[0].innerHTML = "Clicks to levelup  : " + (clicksToLevel-clicks);
     
}
    
    
    /*
function specialBox() {
    var $startTop = Math.floor((Math.random()*0.2)+0.9);
    var $startLeft = Math.floor((Math.random()*0.2)+0.9);
    var $top = (1+$startTop)%2;
    var $left = (1+$startLeft)%2;
    var speed = 2;
    $(".special-box").show();
    $(".special-box-position").css({"top": $startTop + "00vh", "left": $startLeft + "00vw" });
  //  $(".special-box").css({"-webkit-transition": "top "+speed+"s, left "+speed+"s",
   //                             "transition": "top "+speed+", left "+speed+"s"});
    $(".special-box-position").css({"top": $top + "00vh", "left": $left + "00vw" });
    console.log("start: " + $startLeft + $startTop);
    console.log("end: " + $top + $left);
}
    */
//bonus level
function bonusLevel() {
    bonusOn = true;
    var count = 0;
    var bonusDuration = setInterval(function() {
        bonusOn = false;
    }, 10000);
    var timerBoss = setInterval(function() {
        if (bonusOn == true) {
            if (count == 0)
                count = 1;
                    else 
                count =0;
            toggleColor(count);  
        } else {
            clearInterval(timerBoss);
            clearInterval(bonusDuration)
        }
    }, 1000);
}


//bonus level toggle
function toggleColor(count) {
    if (count == 0)
        $("body").css({"background-color": "yellow"});
    if (count == 1)
        $("body").css({"background-color": "white"});
}

// box movement
 $(".runaway-box").on("click", function(){
    if (timeleft > 0 && gameOn){
        changeClicks();
        var $top = Math.floor((Math.random() * 50) + 20);
        var $left = Math.floor((Math.random() * 80) + 1);
        $(".position").css({"top": $top + "vh", "left": $left + "vw"});
    }
});

    
    
    
    
});