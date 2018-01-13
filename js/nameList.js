function NameList() {
    var namesList = [];
    var frequencies = [];
    NameList.removeName = function (name) {
        $("#nl-"+name).remove();
        namesList.splice(namesList.indexOf(name),1); //Remove item
        console.log(namesList);
        if(namesList.length === 3){
            animateOut($("#selectVariant"));
        }
    };

    NameList.addName = function(name,insertionPoint) {
        if(name.length === 0){
            return;
        }
        for (var n in namesList){
            if(name === namesList[n]){
                $(".alert").alert('close'); //Close existing alerts

                //Create the alert
                var alert = $(document.createElement("div"));
                alert.addClass("alert alert-warning alert-dismissible show");
                alert.text("That name is already on list! You can't add someone twice.");

                var close = $(document.createElement("button"));
                close.addClass("close").attr("data-dismiss","alert").text("×");
                alert.append(close);

                $("#alerts").append(alert);

                return;
            }
        }

        namesList.push(name);

        //DOM Elements for list entry
        var entry = $(document.createElement("li"));
        entry.prop("id","nl-"+name);
        entry.addClass("list-group-item");
        entry.text(name);

        var spn = $(document.createElement("span"));
        spn.css("float","right");
        spn.addClass("nl-remove");

        var del = $(document.createElement("a"));
        del.prop("href","#");
        del.click(function () {
            NameList.removeName(name);
        });
        del.text("×");

        spn.append(del);
        entry.append(spn);

        insertionPoint.append(entry);
        //Showing game start button
        if(namesList.length === 4){
            animateIn($("#selectVariant"));
        }
    };

    NameList.initializeSelector = function(){
        for (var i in namesList){
            frequencies[i] = [1,1,1,1,1];
        }
    };

    //Probability is inversely proportional to an exponential average of if the player has
    // played in the last 5 games. This is normalized across all players before usage.
    // This makes recent games matter more.

    NameList.selectPlayers = function(){
        //Generate weighted cumulative averages.
        //These will range from 1 if a player has played none of the past 5 games to
        //about 0.2 if a player has played all of the last 5 games
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
        var nm = [];
        for (i = 0; i < selections.length; i++){
            nm.push(namesList[selections[i]]);
        }
        return nm;
    }

}
