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
        window.notepad = this;
        // a div for the viewport to bind to
        this._el = document.createElement('div');
        this._el.setAttribute('id', 'Notepad');
        this._el.style.margin = '40px';
        document.body.appendChild(this._el);

        var self = this;
        function onRegisterKey(e) {
            return self.onRegisterKey(e);
        }
        function onUpdateSearchMatches(matches) {
            return self.onUpdateSearchMatches(matches);
        }
        self._searching = false;

        this._viewport = new NotepadViewport(this._el);
        this._grid = new Grid(this._viewport.size);
        this._controller = new NotepadController(onRegisterKey);
        this._searchManager = new SearchManager(this._grid, onUpdateSearchMatches);

        // a div for the searchbox query and controls to appear in
        this._initSearchbox();
    };

    Notepad.prototype.onRegisterKey = function(key) {
        if (this._searching) {
            this._searchManager.add(key);
            this._searchport.innerHTML = this._searchManager.queryString;
        } else {
            var layout = this._grid.setLayout(key);
            this._viewport.write(key, layout.pointer);
        }
    };

    Notepad.prototype.onUpdateSearchMatches = function(matches) {
        this._viewport.clearHighlighting();
        if (matches.length) {
            this._viewport.highlight(matches);
        }
    };

    Notepad.prototype._initSearchbox = function() {
        var searchToggleButton = document.createElement('button');
        searchToggleButton.style.position = 'absolute';
        searchToggleButton.style.top = '28px';
        searchToggleButton.style.right = '15px';
        searchToggleButton.innerHTML = 'Toggle search';
        document.body.appendChild(searchToggleButton);
        this._searchport = document.createElement('div');
        this._searchport.innerHTML = 'Search for what?';
        this._searchport.style.position = 'absolute';
        this._searchport.style.top = '8px';
        this._searchport.style.right = '15px';
        document.body.appendChild(this._searchport);

        var self = this;
        var reset = function() {
            self._searchManager.reset();
            self._searchport.innerHTML = 'Search for what?';
        };
        searchToggleButton.onclick = function() {
            if (self._searching) {
                self._searching = false;
                this.style.backgroundColor = '';
                reset();
            } else {
                self._searching = true;
                this.style.backgroundColor = 'yellow';
            }
        };
    };

    return Notepad;
});