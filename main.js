
require(['src/Notepad'], function(Notepad) {
    var notepad = new Notepad(document);
    notepad.insert('this is a bunch of awesome text');
});
