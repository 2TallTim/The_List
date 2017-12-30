var stateElements = [];
var state = 0;

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
        stateElements[e].css("display","none");
    }

    animateIn(stateElements[0]);

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

function stateAddNames() {
    changeState(1);
}

function stateSelectVariant() {
    changeState(2);
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
    if(to>state) { //reverse animation if we're going backwards
        animateOut(stateElements[state]);
        animateIn(stateElements[to]);
    }else{
        animateOut(stateElements[state],true);
        animateIn(stateElements[to],true);
    }
    state = to;
}

function animateOut(obj,reverse=false){
    obj.css("display","block");
    obj.css("opacity",1);
    obj.css("left",0);
    if(reverse){
        obj.animate({
                opacity: 0,
                left: "300px"
            },
            400,
            function () {
                obj.css("display", "none");
            }
        );
    }else {
        obj.animate({
                opacity: 0,
                left: "-300px"
            },
            400,
            function () {
                obj.css("display", "none");
            }
        );
    }
}

function animateIn(obj,reverse=false){
    obj.css("display","block");
    obj.css("opacity",0);
    if(reverse){
        obj.css("left","-400px");
    }else {
        obj.css("left", "400px");
    }

    obj.animate({
            opacity: 1,
            left: "0px"
        }, 500
    );
}