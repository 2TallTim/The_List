var stateElements = [];
var state = 0;

// ##############################
//  Initialization and listeners
// ##############################

$(document).ready(function () {
//    Initialize Game State
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

    $("#nameInput").keyup(function(event) {
        var key = event.which;
        if (key === 13) {
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

function stateAddNames() {
    changeState(1);
}

function addName() {
    var n = $("#nameInput").val();
    NameList.addName(n,$("#namesList"));
    $("#nameInput").val('');
}

// #####################
//  Animation Functions
// #####################

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
        },300
    )
}