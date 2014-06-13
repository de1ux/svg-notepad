define(function(require) {

    // Wow I hate requirejs
    require('../bower_components/underscore/underscore');

    var SearchUtils = {

        getPositionsByKeyword: function(structure, keyword) {
            var positions = [];
            for (var i = 0, len = structure.pages.length; i < len; i++) {
                positions = _.union(
                    positions,
                    this.getPostionsFromText(structure.text[i], keyword)
                );
            }
            return positions;
        },

        // prolly should be decoupled from searchutils at some point
        getElementByPostion: function(canvas, postion) {
            var element;
            return element;
        },

        getPostionsFromText: function(text, keyword) {
            var positions = [];
            positions = getPostionMatches(keyword, text);
            return positions;
        }
    };

    function canApply(needle, haystack, index) {
        var remainingLen = haystack.length - index;
        if (needle.length > remainingLen) {
            return false;
        }
        for (var i = 0, len = needle.length; i < len; i++) {
            if (needle[i] !== haystack[index + i]) {
                return false;
            }
        }
        return true;
    }

    function getPostionMatches(needle, haystack) {
        var positions = [];
        for (var i = 0, len = haystack.length; i < len; i++) {
            if (haystack[i] == needle[0] && canApply(needle, haystack, i)) {
                // push all indexes of the applied needle to positions
                for (var s = i, slen = i + needle.length; s < slen; s++) {
                    positions.push(s);
                }
            }
        }
        return positions;
    }

    return SearchUtils;
});