define(function(require) {

    var SearchUtils = require('src/SearchUtils');
    // Takes a grid and performs lookups based on its structure
    var SearchManager = function(grid, onUpdateSearchMatches, reset) {
        this.queryString = '';
        this._structure = grid.getStructure();
        this._onUpdateSearchMatches = onUpdateSearchMatches;
        this._reset = reset;
        this.searching = false;

        this.createSearchbox();
    };

    SearchManager.prototype.add = function(key) {
        this.queryString += key;
        this._searchport.innerHTML = this.queryString;
        this._updateSearch();
    };

    SearchManager.prototype._updateSearch = function() {
        var locations = SearchUtils.getPositionsByKeyword(this._structure, this.queryString);
        this._onUpdateSearchMatches(locations);
    };

    SearchManager.prototype.reset = function() {
        this._searchport.innerHTML = 'Search for what?';
        this.queryString = '';
        this._reset();
    };

    SearchManager.prototype.createSearchbox = function() {
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
        searchToggleButton.onclick = function() {
            if (self.searching) {
                self.searching = false;
                this.style.backgroundColor = '';
                self.reset();
            } else {
                self.searching = true;
                this.style.backgroundColor = 'yellow';
            }
        };
    };

    return SearchManager;
});