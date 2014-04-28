/**
 * A viewport module that makes drawing to the SVG canvas
 * a bit easier
 * @module NotepadViewport
 */
var FONT_WIDTH = 12;
var FONT_STYLE = {
    family: 'Courier',
    size: FONT_WIDTH
};

var NotepadViewport = function(el) {
    // do we need this private var?
    this._el = el;

    // TODO - abstract the metrics to another class
    this.size = [el.clientWidth, el.clientHeight];

    // instantiate the SVG canvas
    this._canvas = SVG(el).size('100%', '100%');
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