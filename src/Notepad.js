/**
 * Manages the assembly and comminication of the Editor components
 * (viewport and controller)
 * @module Notepad
 */
define(function(require) {

    var NotepadViewport   = require('src/NotepadViewport');
    var NotepadController = require('src/NotepadController');
    var Grid              = require('src/Grid');
    var SearchManager     = require('src/SearchManager');

    var Notepad = function(document) {
        var self = this;
        function onRegisterKey(e) {
            return self.onRegisterKey(e);
        }
        function onUpdateSearchMatches(matches) {
            return self.onUpdateSearchMatches(matches);
        }
        function reset() {
            return self._viewport.clearHighlighting();
        }

        // Components used by the notepad
        this._viewport = new NotepadViewport();
        this._grid = new Grid(this._viewport.size);
        this._controller = new NotepadController(onRegisterKey);
        this._searchManager = new SearchManager(
            this._grid,
            onUpdateSearchMatches,
            reset
        );
    };

    /**
     * Called when a valid character is pressed
     * @param {string} key - A char to add to the searchbox or viewport
     */
    Notepad.prototype.onRegisterKey = function(key) {
        if (this._searchManager.searching) {
            this._searchManager.add(key);
        } else {
            var layout = this._grid.setLayout(key);
            this._viewport.write(key, layout.pointer);
        }
    };

    /**
     * Called when a key is added to the search manager
     * @param {array} matches - A list of positions [12, 41, ...]
     * that match the search
     */
    Notepad.prototype.onUpdateSearchMatches = function(matches) {
        this._viewport.clearHighlighting();
        if (matches.length) {
            this._viewport.highlight(matches);
        }
    };

    return Notepad;
});