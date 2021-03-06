const fs = require('fs');
const MidiWriter = require('midi-writer-js');
const scribble = require('scribbletune');
const MIDI = require('midijs');
const Tonal = require('tonal');
const Scale = require('tonal-scale')
const Chord = require('tonal-chord')
const File = new MIDI.File;

const theory = {
  'notes' : ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B','C','C#','D','D#','E','F','F#','G','G#','A','A#','B'],
  'majScale' : ['0','2','4','5','7','9','11'],
  'modes' : {
    '0': "Ionian",
    '2': "Dorian",
    '4': "Phrygian",
    '5': "Lydian",
    '7': "Mixolydian",
    '9': "Aeolian",
    '11': "Locrian"
  },
  'chords' : {
      '0': "Maj",
      '2': "Min",
      '4': "Min",
      '5': "Maj",
      '7': "Maj",
      '9': "Min",
      '11': "Dim"
  }
}
const song = {};

song.getIntDegree = (key,deg) => {
    let i = theory.notes.indexOf(key.toUpperCase());
    let j = theory.majScale.indexOf(deg.toString());
    return theory.notes[i+j];
}

song.readFile = (filePath) => {
  return new Promise((resolve, reject) =>{
    fs.readFile(filePath, function (err, data) {
      if (err) {
          reject(err);
      }
      var file = new MIDI.File(data, function (err) {
          if (err) {
              reject(err);
          }
      });
      console.log(File.ChannelEvent);
    
      file.getHeader().setTicksPerBeat(80);
      file.getData(function (err, data) {
          if (err) {
              throw err;
          }
          
          fs.writeFile(filePath, data, function (err) {
              if (err) {
                  throw err;
              }
              
            
          });
      });
      resolve(file);
    });
    
  });
}

song.scribbleInstrument = (key,instrument) => {
  // return new Promise((resolve, reject) => {
    let scribNotes = [];
    let scribPattern = '';
    switch (instrument) {
      case 'kick':
        scribPattern = Math.random() > '.5'? 'x-x-x-x-'.repeat(8) : 'x---x---'.repeat(8);
        scribNotes = ['c2'];
        break;
      case 'snare':
        let r = Math.random();
        // console.log(r);
        if (r <= .25) {
            scribPattern = '--x---x-'.repeat(8);
        }else if (r <= .5) {
          scribPattern = '--xx--xx'.repeat(8);
        }else if (r <= .75) {
          scribPattern = 'x--x--xx'.repeat(8);
        }else{
          scribPattern = 'x--x---x'.repeat(8);
        }
        // console.log(scribPattern);
        scribNotes = ['d2'];
        break;
      case 'hi-hat':
        scribPattern = 'x--x---x'.repeat(8);
        scribNotes = ['f#2'];
      
        //Special Case Handled in Midi Gen
        break;
      case 'trumpet':
        scribNotes = Scale.notes(key + ' major');
        scribNotes = scribNotes.concat(Chord.notes(key + ' maj7'));
        scribNotes = scribNotes.concat(Chord.notes(song.getIntDegree(key, 5) + ' maj7'));
        scribNotes = scribNotes.concat(Chord.notes(song.getIntDegree(key, 3) + ' min7'));
        tempScrips = scribNotes.map(function(x) {
          return x.toLowerCase();
        });
        
        var ji = 0;
        // console.log(tempScrips);
        for (var j = 3; j < 6; j++) {
            for (var i = 0; i < tempScrips.length; i++) {
                scribNotes[ji] = tempScrips[i]+j;
                ji++;
            }
          }
        for (var i = 0; i < 64; i++) {
          scribPattern +=  Math.random() > '.5'? 'x' : '-';
        }
        break;
      case 'bass':
        scribNotes = Scale.notes(key + 'major');
        scribNotes = scribNotes.concat(Chord.notes(key + ' maj7'));
        tempScrips = scribNotes.map(function(x) {
          return x.toLowerCase();
        });
        var ji = 0;
        // console.log(tempScrips);
        for (var j = 1; j < 3; j++) {
            for (var i = 0; i < tempScrips.length; i++) {
                scribNotes[ji] = tempScrips[i]+j;
                ji++;
            }
          }
        for (var i = 0; i < 32; i++) {
          let r = Math.random();
          if (r <= .25) {
            scribPattern += '--';
          }else if (r <= .5) {
            scribPattern += 'xx';
          }else if (r <= .75) {
              scribPattern += 'x-';
          }else{
            scribPattern += '-x';
          }
        }
        break;
      case 'piano':
        theory.majScale.forEach(deg =>{
          let chord = theory.chords[deg];
          let keyIndex = theory.notes.indexOf(key.toUpperCase());
          let toneIndex = theory.majScale.indexOf(deg.toString());
          // console.log(i);
          // let keyIndex = 
          let tone = theory.notes[(keyIndex+toneIndex)];
          scribNotes.push(tone+chord);
        });
        for (var i = 0; i < 32; i++) {
          let r = Math.random();
          if (r <= .25) {
            scribPattern += '--';
          }else if (r <= .5) {
            scribPattern += 'xx';
          }else if (r <= .75) {
              scribPattern += 'x-';
          }else{
            scribPattern += '-x';
          }
        }
        break;
      default:
        
    }
    let clip = scribble.clip({
        notes: scribNotes, 
        pattern: scribPattern,
        shuffle: true
    });
      return clip;
  // });
}
song.generate = (key, instruments, modifer=null) => {
  
  return new Promise((resolve, reject) => {
      let clips = {};
      instruments.forEach(inst =>{
        // console.log(inst + "instrument loop running");
        clip = song.scribbleInstrument(key, inst);
        // console.log(clip);
        clips[inst]= clip;
      });
      let iteration = 1;
      // console.log(clips);
      var tracks = [];
      tracks[0] = new MidiWriter.Track();
      tracks[0].setTimeSignature(4, 4);
      tracks[0].setTempo(100);
      for (var instrument in clips) {
          // skip loop if the property is from prototype
        if (!clips.hasOwnProperty(instrument)) continue;
        tracks[iteration] = new MidiWriter.Track();
        tracks[iteration].addInstrumentName(instrument);
        switch (instrument) {
          case 'hi-hat':
              for (var i = 0; i <32; i++) {
                notes = new MidiWriter.NoteEvent({pitch:['F#2'], duration: '8t', channel: 10, wait: '4t'});
                tracks[iteration].addEvent(notes);
                notes = new MidiWriter.NoteEvent({pitch:['F#2'], duration: '8t', channel: 10, wait: '8t'});
                tracks[iteration].addEvent(notes);
                notes = new MidiWriter.NoteEvent({pitch:['F#2'], duration: '8t', channel: 10});
                tracks[iteration].addEvent(notes);  
              } 
            break;
          case 'kick':
          case 'snare':
            console.log("nothing to do");
            break;
          case 'bass':
            tracks[iteration].addEvent(new MidiWriter.ProgramChangeEvent({instrument : 33}));
            break;
          case 'piano':
            tracks[iteration].addEvent(new MidiWriter.ProgramChangeEvent({instrument : 4}));
            break;
          case 'trumpet':
            tracks[iteration].addEvent(new MidiWriter.ProgramChangeEvent({instrument : 57}));
            break;
          default:
        }
        console.log(iteration);
        console.log(instrument);
        let instrumentClip = clips[instrument];
        // console.log(instrumentClip);
        instrumentClip.forEach(soundEvent => {
          if(soundEvent.note){
            // console.log(soundEvent.note);
            switch (instrument) {
              case 'hi-hat':
                  console.log('hi-hat has been taken care of');
                break;
              case 'kick':
                  notes = new MidiWriter.NoteEvent({pitch:['C2'], duration: '4', channel: 10});
                break;
              case 'snare':
                  notes = new MidiWriter.NoteEvent({pitch:['D2'], duration: '4', channel: 10});
                break;
              case 'bass':
              case 'piano':
              case 'trumpet':
                  let pitches = soundEvent.note.map(function(x) {
                    return x.toUpperCase();
                  });
                  notes = new MidiWriter.NoteEvent({pitch:pitches, duration: '4'});
                break;
              default:
            
            }
          }else{
              notes = new MidiWriter.NoteEvent({pitch:null, duration: '4'});
          }
          tracks[iteration].addEvent(notes);
          console.log(soundEvent);
        });
        iteration++;
      }
      var write = new MidiWriter.Writer(tracks);
      fs.writeFileSync('public/midi/jazz.mid', write.buildFile(), 'binary');
      resolve(clips);
  });
}

exports.data = song;