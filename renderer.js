var audioContext = new AudioContext()

var Member = (function(context) {
    function Member(pitch){
        this.pitch = pitch;
        this.oscillator = context.createOscillator();
    };

    Member.prototype.start = function() {
        //var oscillator = context.createOscillator();
        this.oscillator.type = 'sine';
        this.oscillator.frequency.value = this.pitch;

        this.oscillator.connect(context.destination)
        this.oscillator.start();
        console.log("Start");
    };

    Member.prototype.stop = function () {
        this.oscillator.stop();
        console.log("stop");
    };

    return Member;
}) (audioContext);


for(var i = 0 ; i < 1 ; ++i){
    var phrase = generatePhrase();
    playPhrase(phrase);
}

//TODO
//Takes the JSON phrase and plays each ensemle members part
// @params:
//      phrase: The phrase to be played
function playPhrase(phrase){

    for(var member in phrase){
        // skip loop if the property is from prototype
        if (!phrase.hasOwnProperty(member)) continue;
        var currentNote = phrase[member];
        playMember(currentNote.delays, currentNote.durations, currentNote.notes)
        console.log("Delays: " + currentNote.delays + "\n",
                    "Durations: " + currentNote.durations + "\n",
                    "Notes: " + currentNote.notes + "\n");
        // playNote(currentNote.delays.shift(),
        //          currentNote.durations.shift(),
        //          currentNote.notes.shift());
    }

}

//Play through all notes of a member
function playMember(delays, durations, notes){
    var memberStartTime = audioContext.currentTime

    while(audioContext.currentTime < memberStartTime +
                                     durations.reduce(
                                        (acc, curr) => acc + curr)
    ){
        for(var note = 0; note < durations.length; ++note){
            //Wait until current time is equal to delay
            setTimeout(function() {
                var member = new Member(notes[i]);
                member.start();
                setTimeout(function() {
                    member.stop();
                }, durations[i]);
            }, delays[i]);
        }
    }
}

//Plays a note based on parameters
// @params:
//      delay:The delay from inital time to play note
//      duration: duration for note to be played
//      pitch: frequency of note to be played
function playNote(delay, duration, pitch){
    var startTime = audioContext.currentTime + delay;

    var oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.value = pitch;
    oscillator.connect(audioContext.destination);
    oscillator.start(startTime);
    oscillator.stop(startTime + (duration/1000));
}
