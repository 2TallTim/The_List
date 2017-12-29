function NameList() {
    var list = [];
    NameList.removeName = function (name) {
        $("#nl-"+name).remove();
        list.splice(list.indexOf(name),1); //Remove item
        console.log(list);
        if(list.length < 4){
            animateOut($("#selectVariant"));
        }
    };

    NameList.addName = function(name,insertionPoint) {
        if(name.length === 0){
            return;
        }
        for (var n in list){
            if(name === list[n]){
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

        list.push(name);

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
        if(list.length >= 4){
            animateIn($("#selectVariant"));
        }
    };

}
