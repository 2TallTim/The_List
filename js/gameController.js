var stateElements = [];
var state = 0;
var players;
$(document).ready(function () {
//    Initialize Game State
    players = new NameList();
    console.log("Ready!");
    stateElements = [
        $("#welcomeFrame"), // 0
        $("#addNameFrame"), // 1
        $("#gameFrame")     // 2
    ];
    for (var e in stateElements){
        stateElements[e].css("display","none");
    }
    animateIn(stateElements[0]);
});

//#########################
// State Specific Functions
//#########################

function startGame() {
    changeState(1);
}

function addName(){
    var n = $("#nameInput").val();
    players.addName(n,$("#namesList"));
}

//####################
// Animation Functions
//####################

function changeState(to){
    animateOut(stateElements[state]);
    animateIn(stateElements[to]);
    state = to;
}

function animateOut(obj){
    obj.css("display","initial");
    obj.css("opacity",1);
    obj.css("top",0);
    obj.animate({
            opacity:0,
            top: "-100px"
        },
        300,
        function() {
            obj.css("display","none");
        }
    )
}

function animateIn(obj){
    obj.css("display","initial");
    obj.css("opacity",0);
    obj.css("top", "100px");
    obj.animate({
            opacity:1,
            top: "0px"
        },1000
    )
}