var stateElements = [];
var state = 0;
var activeVariant = -1;
// ##############################
//  Initialization and listeners
// ##############################

$(document).ready(function () {
//    Initialize Game State
    console.log("Ready!");
    stateElements = [
        $("#welcomeFrame"),         // 0
        $("#addNameFrame"),         // 1
        $("#selectVariantFrame"),   // 2
        $("#gameFrame")             // 3
    ];
    for (var e in stateElements){
        stateElements[e].css("opacity","0");
    }

    animateIn(stateElements[0],false);

    $("#nameInput").keyup(function(event) {
        var key = event.which;
        if (key === 13) { //Enter key
            addName();
        }
    });

    $("#selectVariant").css("display","none");

    NameList();

    $("#loadingFrame").css("display","none");
});

// ##########################
//  State Specific Functions
// ##########################

function nextAddNames() {
    if(activeVariant !== -1){
        stateStartGame(activeVariant);
    }else{
        stateSelectVariant();
    }
}

function stateAddNames() {
    changeState(1);
}

function stateSelectVariant() {
    //When we come back to this screen
    $("#selectVariant").text("Return to game");
    changeState(2);
}

function stateStartGame(variant){
    activeVariant = variant;
    OptionsList(variant);
    changeState(3);
    NameList.initializeSelector();
}

function addName() {
    var n = $("#nameInput").val();
    NameList.addName(n,$("#namesList"));
    $("#nameInput").val('');
}
// ####################
//  Gameplay Functions
// ####################

function genRound() {
    var players = NameList.selectPlayers();
    var choices = OptionsList.selectOptions();
    $("#picker").text(players[0]);
    $("#p1").text(players[1]+",");
    $("#p2").text(players[2]+",");
    $("#p3").text(players[3]);

    $("#o1").text(choices[0]+",");
    $("#o2").text(choices[1]+",");
    $("#o3").text(choices[2]+"?");
}

// #####################
//  Animation Functions
// #####################

function changeState(to){
    if(to>state) { //reverse animation if we're going backwards
        animateOut(stateElements[state],false);
        animateIn(stateElements[to],false);
    }else{
        animateOut(stateElements[state],true);
        animateIn(stateElements[to],true);
    }
    state = to;
}

function animateOut(obj, reverse){
    if(reverse){
        obj.removeClass("slide-in-left slide-in-right slide-out-left").css("opacity",1);
        setTimeout(function(){ obj.addClass("slide-out-right");}, 1);
    }else {
        obj.removeClass("slide-in-left slide-in-right slide-out-right").css("opacity",1);
        setTimeout(function(){ obj.addClass("slide-out-left"); }, 1);

    }
}

function animateIn(obj,reverse){
    obj.css("display","block");
    if(reverse){
        obj.removeClass("slide-out-left slide-out-right slide-in-right").css("opacity",0);
        void obj.get().offsetWidth;
        setTimeout(function(){ obj.addClass("slide-in-left");}, 1);
    }else {
        obj.removeClass("slide-out-left slide-out-right slide-in-left").css("opacity",0);
        setTimeout(function(){ obj.addClass("slide-in-right");}, 1);

    }
}