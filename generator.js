//Algorithm for musical generation

var members = ["percussion"] //, "rhythms", "melodies"];

var chromatic = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

var noteFrequencies = {
    'C': 261.63,
    'C#': 277.18,
    'D': 293.66,
    'D#': 311.13,
    'E': 329.63,
    'F': 349.23,
    'F#': 349.23,
    'G': 392.00,
    'G#': 415.30,
    'A': 440.00,
    'A#': 466.16,
    'B': 493.88
};


var modes = {
    ionian: ['w', 'w', 'h', 'w', 'w', 'w', 'h'],
    dorian: ['w', 'h', 'w', 'w', 'w', 'h', 'w'],
    phrygian: ['h', 'w', 'w', 'w', 'h', 'w', 'w'],
    lydian: ['w', 'w', 'w', 'h', 'w', 'w', 'h'],
    mixolydian: ['w', 'w', 'h', 'w', 'w', 'h', 'h'],
    aeolian: ['w', 'h', 'w', 'w', 'h', 'w', 'w'],
    locrian: ['h', 'w', 'w', 'h', 'w', 'w', 'w']
};


function generatePhrase(){
    var phrase = {}
    for(member in members){
        //Is active?
        var timings = generateTimings(members[member], 10000);
        var delays = timings.delays;
        var durations = timings.durations;

        var notes = generateNotes(members[member], 'C', 'phrygian', durations.length);
        notes = notesToFrequencies(notes);

        phrase[member] = {active: 1,
                          notes: notes,
                          delays: delays,
                          durations: durations};

    }
    return phrase
}

//Generates the scale/span of notes that are available for choosing for the note
// generation algorithm
// @params:
//      key: root key of scale
//      mode: mode to be played in
// @returns: an array of notes in specified mode & key to generate phrase out of
function generateScale(key, mode) {
    var scale = [];
    scale.push(key);
    var modeArray = modes[mode];
    var scaleIndex = chromatic.indexOf(key);
    for(var note = 0; note < 6; ++note){
        if(modeArray[note] == 'w'){
            scaleIndex += 2;
        }
        if(modeArray[note] == 'h') {
            scaleIndex += 1;
        }
        scaleIndex = scaleIndex % 12;
        scale[note + 1] = chromatic[scaleIndex];
    }
    return scale
}

//Generates the notes for a given member based on scale
// @params:
//      member: ensemble member
//      key: root key of phrase
//      mode: mode to be played
//      count: number of notes to be generated
// @returns: an array of notes (as frequencies) for the given member
function generateNotes (member, key, mode, count)
{
    var scale = generateScale(key, mode);
    var notes = [];
    for(var i = 0; i < count; ++i){
        notes[i] = scale[Math.floor((Math.random() * scale.length))];
    }
    return notes;
}

//Generates the delay and duration times for each note in a member's phrase
// @params:
//      member: ensemble member
//      phraseLength: length of phrase (in ms) to subdivide
// @returns: 2 arrays, one for delays and one for durations
function generateTimings(member, phraseLength) {
    var delays = [];
    var durations = [];
    var index = 0;

    //Used to keep track of how much space is remaining in a phrase
    var spaceRemaining = phraseLength;
    //First note always starts on 0
    delays.push(0);
    while(spaceRemaining > 0 ){
        var interval = Math.floor((Math.random() * (phraseLength / 4)));
        //If the generated interval is greater than space left, just use amount
        // of space left
        if(interval > spaceRemaining){
            durations[index] = spaceRemaining;
            break;
        }
        durations.push(interval);
        //Note starts immediately after previous, don't add delay if this is last
        // duration to add
        (interval == spaceRemaining || delays.push(interval));
        index++;
        spaceRemaining -= (interval);// + delays[index-1]);
    }
    return {delays: delays, durations: durations};
}

//Converts note values to their corresponding frequency values
// @params:
//      notes: array of string note values
// @returns: an array of frequencies corresponding to notes
function notesToFrequencies(notes){
    var frequencyValues = [];
    var i = 0;
    for(note in notes){
        frequencyValues[i] = noteFrequencies[notes[note]];
        ++i;
    }
    return frequencyValues;
}

// Packages data for a single ensemble member tp be added into object
// @params:
//      active: active status
//      notes: array of notes to played by member
//      delays: array of delays for each not to be played
//      durations: array of durations for each note to be played
// @return: An object containing individual package data
function packMemberData(active, notes, delays, durations) {
    var out = {};

    out.active = active;
    out.notes = notes;
    out.delays = delays;
    out.durations = duration;

    return out;
}
