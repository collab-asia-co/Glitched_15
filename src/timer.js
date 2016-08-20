function Timer() {
    var startTime = Date.now();

    this.show = function() {
        var now = Date.now();
        var sec = Math.round((now - startTime) / 1000);
        console.log(sec);
    };

}
