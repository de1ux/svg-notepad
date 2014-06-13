define(function(require) {

    var NotepadController = function(onKeypressCallback) {
        var self = this;

        document.onkeydown = function(e) {
            self.registerKey(e);
        };
        self.onKeypressCallback = onKeypressCallback;
    };

    NotepadController.prototype.registerKey = function(e) {
        if (e.which === 32 ||
            e.which === 16 ||
            e.which === 8) {
            return;
        }
        var character = String.fromCharCode(e.which+32);
        // pipe the char to the controller's subscriber
        this.onKeypressCallback(character);
    };

    return NotepadController;
});

