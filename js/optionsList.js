//container for list of options.

function OptionsList(op){
    var frequencies = [];

    var fileURLs = ["tame.json","standard.json","nsfw.json"];
    var optList = [];
    loadOptionsFile(fileURLs[op]).then(function (value) {
       optList = value;
       OptionsList.initializeSelector();
       genRound();
    });

    function loadOptionsFile(u){
        return $.getJSON(u).then(function (data) {
            return data;
        });
    }

    OptionsList.initializeSelector = function(){

        console.log("Selector Initialized");
        for (var i = 0; i < optList.length; i++){
            frequencies[i] = [1,1,1,1,1];
        }
    };

    OptionsList.selectOptions = function(){
        //Generate weighted cumulative averages.
        //These will range from 1 if a player has played none of the past 5 games to
        //about 0.2 if a player has played all of the last 5 games
        if(optList.length<4)
            return ["an error has occurred."];


        var wFrequencies = [];
        var prev = 0;
        for (var i in frequencies){
            var accum = 1;
            for(var j in frequencies[i]){
                accum += frequencies[i][j]*Math.pow(0.75,j+1);
            }
            accum = 1.0/(accum);
            wFrequencies.push(prev + accum);
            prev += accum;
        }

        //Normalize
        var n = wFrequencies[wFrequencies.length-1];
        for(i in wFrequencies){
            wFrequencies[i] /= n;
        }

        //Select players
        var selections = [];
        wFrequencies.splice(0,0,0); //0 at beginning. Enables "findIndex" to work correctly.
        for (i = 0; i < 4; i++){
            do {
                var s = Math.random();
                var idx = wFrequencies.findIndex(function (value) {
                    return value > s;
                }) - 1;//Offset 1. We're actually looking for the value the random number is below.
            }while(selections.indexOf(idx) !== -1);
            selections.push(idx);
        }

        //Update frequencies
        for(i = 0; i < frequencies.length;i++){
            frequencies[i].splice(-1, 1);
            if(selections.indexOf(i) !== -1) {
                frequencies[i].splice(0, 0, 1);
            }else {
                frequencies[i].splice(0, 0, 0);
            }
        }
        console.log(selections);
        var opt = []
        for (i = 0; i < selections.length; i++){
            opt.push(optList[selections[i]]);
        }
        return opt;
    }


}