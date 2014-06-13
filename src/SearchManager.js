define(function(require) {

    var SearchUtils = require('src/SearchUtils');
    // Takes a grid and performs lookups based on its structure
    var SearchManager = function(grid, onUpdateSearchMatches) {
        this.queryString = '';
        this._structure = grid.getStructure();
        this._onUpdateSearchMatches = onUpdateSearchMatches;
    };

    SearchManager.prototype.add = function(key) {
        this.queryString += key;
        this._updateSearch();
    };

    SearchManager.prototype._updateSearch = function() {
        var locations = SearchUtils.getPositionsByKeyword(this._structure, this.queryString);
        this._onUpdateSearchMatches(locations);
    };

    SearchManager.prototype.reset = function() {
        this.queryString = '';
    };

    return SearchManager;
});