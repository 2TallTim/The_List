function NameList() {
    this.list = [];
    this.addName = function(name,insertionPoint) {
        for (var n in this.list){
            if(name === this.list[n]){
                console.log("Whoops!");
                var alert = $(document.createElement("div"));
                alert.addClass("alert alert-warning alert-dismissible fade show");
                alert.text("That name is already on list! You can't add someone twice.");
                var close = $(document.createElement("button"));
                close.addClass("close").attr("data-dismiss","alert").text("×");
                alert.append(close);
                $("#alerts").append(alert);
                return;
            }
        }
        this.list.push(name);
        var entry = $(document.createElement("li"));
        entry.addClass("list-group-item");
        entry.text(name);
        insertionPoint.append(entry);
    }
}
