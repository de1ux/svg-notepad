define(function(require) {
    /**
        GridStructure's data structure
        {
            pages: [ // used for recording positional logic
                [
                    ['a', 1, 10],
                    ['s', 13, 10],
                    ['d', 25, 10]
                ],
                [
                    ['a', 1, 10],
                    ['s', 13, 10],
                    ['d', 25, 10]
                ]
            ]
            text: [ // used in text search
                'asd',
                'asd'
            ]
        }
    **/

    var GridStructure = function() {
        this._pageIndex = 0;
        this.pages = [];
        this.text = [];
    };

    GridStructure.prototype.add = function(character, xy) {
        var pageIdx = this._pageIndex;
        if (this.pages.length < pageIdx + 1) {
            this.pages.push([]);
            this.text.push(['']);
        }

        this.pages[pageIdx].push(
            [character, xy[0], xy[1]]
        );
        this.text[pageIdx] += character;
    };

    return GridStructure;
});