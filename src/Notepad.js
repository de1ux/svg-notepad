/**
 * Manages the assembly and comminication of the Editor components
 * (viewport and controller)
 * @module Notepad
 */
define(function(require) {

    var NotepadViewport   = require('src/NotepadViewport');
    var NotepadController = require('src/NotepadController');
    var Grid              = require('src/Grid');

    var Notepad = function(document) {
        // a div for the viewport to bind to
        this._el = document.createElement('div');
        this._el.setAttribute('id', 'Notepad');
        document.body.appendChild(this._el);

        this._viewport = new NotepadViewport(this._el);
        this._controller = new NotepadController(this.onRegisterKey);
        this._grid = new Grid(this._viewport.size);
        //this.controller = new NotepadController();
    };

    Notepad.prototype.insert = function(text) {
        this._viewport.write(text, [100, 100]);
    };

    Notepad.prototype.onRegisterKey = function(key) {
        console.log('Notepad got key ' + key);
    };

    return Notepad;
});