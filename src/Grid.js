define(function(require) {

    var Grid = function(maxXY) {
        return [
            [0,0], // pointer for the current text position
            [maxXY[0],maxXY[1]] // reference for the max XY
        ];
    };

    return Grid;
});