document.onkeydown = registerKey;
document.onkeydown = function() {
                var letter = String.fromCharCode(window.event.which);
                var text = draw.text(letter).x(x);
                x += 12;
            };