define(function(require) {

    var NotepadController = function(onKeypressCallback) {
        var self = this;
        document.onkeydown = function(e) {
            self.registerKey(e);
        };
        self.onKeypressCallback = onKeypressCallback;
    };

    NotepadController.prototype.registerKey = function(e) {
        var character = String.fromCharCode(e.which);
        // pipe the char to the controller's subscriber
        this.onKeypressCallback(character);
    };

    return NotepadController;

    /* useful snippet for later
       aka gimme those commit points
    document.onkeydown = function() {
                    var letter = String.fromCharCode(window.event.which);
                    var text = draw.text(letter).x(x);
                    x += 12;
                };
    */
});

