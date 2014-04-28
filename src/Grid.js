define(function(require) {

    var Grid = function(maxXY) {
        this.layout = {
            pointer: [0,0], // pointer for the current text position
            size:   [maxXY[0],maxXY[1]] // reference for the max XY
        };
    };

    /**
     * Calculates a new layout with consideration of the new character
     * @param {string} character - A char to add to the grid
     * @returns {object} Layout - A new layout for viewport to write to
     */
    Grid.prototype.setLayout = function(character) {
        // if there's no room on the line
        if (!canFitOnLine(this.layout, character)) {
            addLine(this.layout);
        }
        this.layout.pointer[0] += 12;
        return this.layout;
    };

    function canFitOnLine(layout, character) {
        // later we'll use character to measure a width, for now every
        // char is width 12
        if (layout.pointer[0] + 12 > layout.size[0]) {
            return false;
        }
        return true;
    }

    function addLine(layout) {
        // TODO - no room for more lines?
        layout.pointer[1] += 12;
        layout.pointer[0] = 0;
    }

    return Grid;
});