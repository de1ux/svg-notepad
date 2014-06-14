/**
 * A viewport module that makes drawing to the SVG canvas
 * a bit easier
 * @module NotepadViewport
 */

define(function (require) {
    var SVG = require('../bower_components/svg.js/dist/svg.min');
    var FONT_WIDTH = 12;
    var FONT_STYLE = {
        family: 'Courier',
        size: FONT_WIDTH
    };

    var NotepadViewport = function(el) {
        // a div for the SVG to attach to
        var el = document.createElement('div');
        el.setAttribute('id', 'Notepad');
        el.style.margin = '40px';
        document.body.appendChild(el);
        // instantiate the SVG canvas
        this._canvas = SVG(el).size('90%', '100%');
        // get the interpreted height
        var svg = document.getElementsByTagName('svg')[0];
        this.size = [svg.clientWidth, svg.clientHeight];
        this._canvas
            .text('Initialized SVG to ' + this.size[0] + 'x' + this.size[1])
            .font(FONT_STYLE);
    };

    /**
     * Write a letter to the canvas
     * @param {string} letter - The char to write to canvas
     * @param {array}  xy - Where to write the char
     */
    NotepadViewport.prototype.write = function(letter, xy) {
        this._canvas.text(letter).x(xy[0])
                                 .y(xy[1])
                                 .font(FONT_STYLE);
    };

    NotepadViewport.prototype.clearHighlighting = function() {
        var children = this._canvas.children();
        for (var i = 1, len = children.length; i < len; i++) {
            children[i].attr('fill', 'black');
        }
    };

    NotepadViewport.prototype.highlight = function(indexes) {
        var children = this._canvas.children();
        for (var i = 0, len = indexes.length; i < len; i++) {
            children[indexes[i]+1].attr('fill', 'red');
        }
    };

    return NotepadViewport;
});