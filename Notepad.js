
var Grid = function(maxXY) {
    return [
        [0,0], // pointer for the current text position
        [maxXY[0],maxXY[1]] // reference for the max XY
    ];
};

var Notepad = function(document) {
    // a div for the viewport to bind to
    this._el = document.createElement('div');
    this._el.setAttribute('id', 'Notepad');
    document.body.appendChild(this._el);

    this._viewport = new NotepadViewport(this._el);
    this._grid = new Grid(this._viewport.size);
    //this.controller = new NotepadController();
};

Notepad.prototype.insert = function(text) {
    this._viewport.write(text, [100, 100]);
};