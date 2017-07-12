
var name = "whistl";
document.write("Hello, and welcome to " + name);

var context;
window.addEventListener('load', init, false);
function init() {
    try{
        window.AudioContext =
        window.AudioContext || window.webkitAudioContext;

    } catch (e) {
        alert('Web Audio API no supported.')
    }
}
