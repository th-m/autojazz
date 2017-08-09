const express = require('express');
const fs = require('fs');
const router = express.Router();
const MidiWriter = require('midi-writer-js');
const Midg = require('jsmidgen');
const scribble = require('scribbletune');

let songGen = require('../scripts/songGenerator.js')

router.get('/make/:note', function(req, res, next) {
  if(req.params.note){
    let key = req.params.note;
    let instruments = ['kick','hi-hat','snare','trumpet','piano','bass'];
    songGen.data.generate(key, instruments).then(function(songData){
      res.render('mc/index', { title: 'MC', songData: songData, action: key, instruments: instruments});
    });
  }
});
router.get('/read/:file', function(req, res, next) {
  if(req.params.file){
    songGen.data.readFile('public/midi/'+req.params.file).then(function(data){
      res.render('mc/index', { title: 'Reading Files', songData: data,  action: req.params.file});
    });
  }
});
router.get('/play/:file', function(req, res, next) {
  if(req.params.file){
    res.render('mc/index', { title: 'Playing Files', songData: 'play',  action: req.params.file});
  }
});
// router.get('/mw', function(req, res, next) {
//   var tracks = [];
// 
//   tracks[0] = new MidiWriter.Track();
//   tracks[0].setTimeSignature(3, 4);
//   tracks[0].setTempo(100);
//   tracks[2] = new MidiWriter.Track();
//   tracks[2].addEvent(new MidiWriter.ProgramChangeEvent({instrument : 2}));
//   var notes;
// 
//   // melody
//   tracks[1] = new MidiWriter.Track();
//   notes = new MidiWriter.NoteEvent({pitch:['C#5', 'E5'], duration: '2'});
//   tracks[1].addEvent(notes);
//   notes = new MidiWriter.NoteEvent({pitch:['C#5', 'E5'], duration: '4'});
//   tracks[1].addEvent(notes);
//   notes = new MidiWriter.NoteEvent({pitch:['C#5', 'E5'], duration: '2'});
//   tracks[1].addEvent(notes);
//   notes = new MidiWriter.NoteEvent({pitch:['A4', 'C#5'], duration: '4'});
//   tracks[1].addEvent(notes);
//   notes = new MidiWriter.NoteEvent({pitch:['B4', 'D5'], duration: '2'});
//   tracks[1].addEvent(notes);
//   notes = new MidiWriter.NoteEvent({pitch:['G#4', 'E5'], duration: '4'});
//   tracks[1].addEvent(notes);
//   notes = new MidiWriter.NoteEvent({pitch:['A4', 'C#5'], duration: '2'});
//   tracks[1].addEvent(notes);
//   notes = new MidiWriter.NoteEvent({pitch:['A4'], duration: '4'});
//   tracks[1].addEvent(notes);
//   notes = new MidiWriter.NoteEvent({pitch:['C#5', 'E5'], duration: '2'});
//   tracks[1].addEvent(notes);
//   notes = new MidiWriter.NoteEvent({pitch:['C#5', 'E5'], duration: '4'});
//   tracks[1].addEvent(notes);
//   notes = new MidiWriter.NoteEvent({pitch:['C#5', 'E5'], duration: '2'});
//   tracks[1].addEvent(notes);
//   notes = new MidiWriter.NoteEvent({pitch:['A4', 'C#5'], duration: '4'});
//   tracks[1].addEvent(notes);
//   notes = new MidiWriter.NoteEvent({pitch:['B4', 'D5'], duration: '2'});
//   tracks[1].addEvent(notes);
//   notes = new MidiWriter.NoteEvent({pitch:['G#4', 'E5'], duration: '4'});
//   tracks[1].addEvent(notes);
//   notes = new MidiWriter.NoteEvent({pitch:['A4', 'C#5'], duration: '2'});
//   tracks[1].addEvent(notes);
//   // note how the previous rest is handled: it became the wait
//   notes = new MidiWriter.NoteEvent({wait: '4', pitch:['E5', 'E5'], duration: '4'});
//   tracks[1].addEvent(notes);
//   notes = new MidiWriter.NoteEvent({pitch:['D#5', 'F#5'], duration: '4'});
//   tracks[1].addEvent(notes);
//   notes = new MidiWriter.NoteEvent({pitch:['D5', 'G#5'], duration: '4'});
//   tracks[1].addEvent(notes);
//   notes = new MidiWriter.NoteEvent({pitch:['C#5', 'A5'], duration: '2'});
//   tracks[1].addEvent(notes);
//   notes = new MidiWriter.NoteEvent({pitch:['E5'], duration: '4'});
//   tracks[1].addEvent(notes);
//   notes = new MidiWriter.NoteEvent({pitch:['E5', 'E5'], duration: '4'});
//   tracks[1].addEvent(notes);
//   notes = new MidiWriter.NoteEvent({pitch:['D#5', 'F#5'], duration: '4'});
//   tracks[1].addEvent(notes);
//   notes = new MidiWriter.NoteEvent({pitch:['D5', 'G#5'], duration: '4'});
//   tracks[1].addEvent(notes);
//   notes = new MidiWriter.NoteEvent({pitch:['C#5', 'A5'], duration: '2'});
//   tracks[1].addEvent(notes);
//   notes = new MidiWriter.NoteEvent({wait: '4', pitch:['C#5', 'E5'], duration: '2'});
//   tracks[1].addEvent(notes);
//   notes = new MidiWriter.NoteEvent({pitch:['C#5', 'E5'], duration: '4'});
//   tracks[1].addEvent(notes);
//   notes = new MidiWriter.NoteEvent({pitch:['C#5', 'E5'], duration: '4'});
//   tracks[1].addEvent(notes);
//   notes = new MidiWriter.NoteEvent({pitch:['A5'], duration: '4'});
//   tracks[1].addEvent(notes);
//   notes = new MidiWriter.NoteEvent({pitch:['A4', 'C#5'], duration: '4'});
//   tracks[1].addEvent(notes);
//   notes = new MidiWriter.NoteEvent({pitch:['C#5', 'E5'], duration: '4'});
//   tracks[1].addEvent(notes);
//   notes = new MidiWriter.NoteEvent({pitch:['B4', 'D5'], duration: '4'});
//   tracks[1].addEvent(notes);
//   notes = new MidiWriter.NoteEvent({pitch:['G#4', 'B4'], duration: '4'});
//   tracks[1].addEvent(notes);
//   notes = new MidiWriter.NoteEvent({pitch:['A4'], duration: '2'});
//   tracks[1].addEvent(notes);
// 
//   // bass
//   // tracks[2] = new MidiWriter.Track();
//   tracks[2].addInstrumentName("bass");
//   notes = new MidiWriter.NoteEvent({pitch:['A3'], duration: '2'});
//   tracks[2].addEvent(notes);
//   notes = new MidiWriter.NoteEvent({wait: '4', pitch: ['A3'], duration: '2'});
//   tracks[2].addEvent(notes);
//   notes = new MidiWriter.NoteEvent({wait: '4', pitch: ['E3'], duration: '2'});
//   tracks[2].addEvent(notes);
//   notes = new MidiWriter.NoteEvent({wait: '4', pitch: ['A3'], duration: '2'});
//   tracks[2].addEvent(notes);
//   notes = new MidiWriter.NoteEvent({wait: '4', pitch: ['A3'], duration: '2'});
//   tracks[2].addEvent(notes);
//   notes = new MidiWriter.NoteEvent({wait: '4', pitch: ['A3'], duration: '2'});
//   tracks[2].addEvent(notes);
//   notes = new MidiWriter.NoteEvent({wait: '4', pitch: ['E3'], duration: '2'});
//   tracks[2].addEvent(notes);
//   notes = new MidiWriter.NoteEvent({wait: '4', pitch: ['A3'], duration: '2'});
//   tracks[2].addEvent(notes);
//   notes = new MidiWriter.NoteEvent({wait: '4', pitch: ['E3'], duration: '2'});
//   tracks[2].addEvent(notes);
//   notes = new MidiWriter.NoteEvent({wait: '4', pitch: ['A3'], duration: '2'});
//   tracks[2].addEvent(notes);
//   notes = new MidiWriter.NoteEvent({wait: '4', pitch: ['E3'], duration: '2'});
//   tracks[2].addEvent(notes);
//   notes = new MidiWriter.NoteEvent({wait: '4', pitch: ['A3'], duration: '2'});
//   tracks[2].addEvent(notes);
//   notes = new MidiWriter.NoteEvent({wait: '4', pitch: ['A3'], duration: '2'});
//   tracks[2].addEvent(notes);
//   notes = new MidiWriter.NoteEvent({wait: '4', pitch: ['A3'], duration: '2'});
//   tracks[2].addEvent(notes);
//   notes = new MidiWriter.NoteEvent({wait: '4', pitch: ['E3'], duration: '2'});
//   tracks[2].addEvent(notes);
//   notes = new MidiWriter.NoteEvent({wait: '4', pitch: ['A3'], duration: '2'});
//   tracks[2].addEvent(notes);
// 
// 
//   var write = new MidiWriter.Writer(tracks);
//   fs.writeFileSync('public/midi/test.mid', write.buildFile(), 'binary');
// 
//   console.log(write.dataUri());
// });
// router.get('/mww', function(req, res, next) {
//   var tracks = [];
//   var notes;
//   console.log("hello");
//   // Set Up
//   tracks[0] = new MidiWriter.Track();
//   tracks[0].setTimeSignature(4, 4);
//   tracks[0].setTempo(100);
//   // channel
//   tracks[1] = new MidiWriter.Track();
//   tracks[2] = new MidiWriter.Track();
//   tracks[3] = new MidiWriter.Track();
//   tracks[4] = new MidiWriter.Track();
//   tracks[5] = new MidiWriter.Track();
//   tracks[6] = new MidiWriter.Track();
//   tracks[1].addEvent(new MidiWriter.ProgramChangeEvent({instrument : 65}));
//   tracks[2].addEvent(new MidiWriter.ProgramChangeEvent({instrument : 2}));
//   tracks[3].addEvent(new MidiWriter.ProgramChangeEvent({instrument : 5}));
//   // tracks[3].addEvent(new MidiWriter.ProgramChangeEvent({instrument : 5}));
// 
//   // melody
//   notes = new MidiWriter.NoteEvent({pitch:['C#5', 'E5'], duration: '4'});
//   tracks[1].addEvent(notes);
//   notes = new MidiWriter.NoteEvent({pitch:['C#5', 'E5'], duration: '4'});
//   tracks[1].addEvent(notes);
//   notes = new MidiWriter.NoteEvent({pitch:['C#5', 'E5'], duration: '4t'});
//   tracks[1].addEvent(notes);
//   notes = new MidiWriter.NoteEvent({pitch:['A4', 'C#5'], duration: '4t'});
//   tracks[1].addEvent(notes);
//   notes = new MidiWriter.NoteEvent({pitch:['A4', 'C#5'], duration: '4t'});
//   tracks[1].addEvent(notes);
// 
// 
//   // bass
//   // tracks[2] = new MidiWriter.Track();
//   tracks[2].addInstrumentName("bass");
//   notes = new MidiWriter.NoteEvent({pitch:['A6'], duration: '2', wait:'2'});
//   tracks[2].addEvent(notes);
//   // notes = new MidiWriter.NoteEvent({pitch:['A6'], duration: '2', wait:'2'});
//   // tracks[2].addEvent(notes);
//   
//   tracks[3].addInstrumentName("fiddle");
//   notes = new MidiWriter.NoteEvent({pitch:['D2'], duration: '1'});
//   tracks[3].addEvent(notes);
//   
//   tracks[4].addInstrumentName("snare");
//   notes = new MidiWriter.NoteEvent({pitch:['D2'], duration: '4', channel: 10, wait: '4'});
//   tracks[4].addEvent(notes);
//   notes = new MidiWriter.NoteEvent({pitch:['D2'], duration: '4', channel: 10, wait: '4'});
// 
// 
//   
//   tracks[5].addInstrumentName("kick");
//   notes = new MidiWriter.NoteEvent({pitch:null, duration: '4', channel: 10});
//   tracks[5].addEvent(notes);
//   notes = new MidiWriter.NoteEvent({pitch:null, duration: '4', channel: 10});
//   tracks[5].addEvent(notes);
//   notes = new MidiWriter.NoteEvent({pitch:null, duration: '4', channel: 10});
//   tracks[5].addEvent(notes);
//   notes = new MidiWriter.NoteEvent({pitch:null, duration: '4', channel: 10});
//   tracks[5].addEvent(notes);
//   
//   tracks[6].addInstrumentName("hi-hat");
//   notes = new MidiWriter.NoteEvent({pitch:['F#2'], duration: '8t', channel: 10, wait: '4t'});
//   tracks[6].addEvent(notes);
//   notes = new MidiWriter.NoteEvent({pitch:['F#2'], duration: '8t', channel: 10, wait: '8t'});
//   tracks[6].addEvent(notes);
//   notes = new MidiWriter.NoteEvent({pitch:['F#2'], duration: '8t', channel: 10});
//   tracks[6].addEvent(notes);
//   notes = new MidiWriter.NoteEvent({pitch:['F#2'], duration: '8t', channel: 10, wait: '4t'});
//   tracks[6].addEvent(notes);
//   notes = new MidiWriter.NoteEvent({pitch:['F#2'], duration: '8t', channel: 10, wait: '8t'});
//   tracks[6].addEvent(notes);
//   notes = new MidiWriter.NoteEvent({pitch:['F#2'], duration: '8t', channel: 10});
//   tracks[6].addEvent(notes);
// 
// 
// 
// 
// 
//   var write = new MidiWriter.Writer(tracks);
//   fs.writeFileSync('public/midi/mww.mid', write.buildFile(), 'binary');
//     res.render('mc/index', { title: 'Writing MWW File', songData: 'bla',  note: "blas"});
// 
//   console.log(write.dataUri());
// });
// router.get('/mwww', function(req, res, next) {
//   // From browser
//   // var MidiWriter = require('MidiWriter');
// 
// 
//   var tracks = [];
//   tracks[0] = new MidiWriter.Track();
// 
//   // You can chain track methods.
//   tracks[0]
//   	.setTempo(60)
//   	.addEvent([
//   		// addEvent() accepts an array of event objects like this...
//   		new MidiWriter.ProgramChangeEvent({instrument : 1}),
//   		new MidiWriter.NoteEvent({pitch: ['B4'], duration: 'd2'}),
//   		new MidiWriter.NoteEvent({pitch: ['C5'], duration: '4'}),
//   		new MidiWriter.NoteEvent({pitch: ['B4'], duration: 'd2'}),
//   		new MidiWriter.NoteEvent({pitch: ['C5'], duration: '4'}),
//   		new MidiWriter.NoteEvent({pitch: ['B4'], duration: 'd2'}),
//   		new MidiWriter.NoteEvent({pitch: ['C5'], duration: '4'}),
//   		new MidiWriter.NoteEvent({pitch: ['B4'], duration: 'd2'}),
//   		new MidiWriter.NoteEvent({pitch: ['Bb4'], duration: '4'}),
//   		new MidiWriter.NoteEvent({pitch: ['A4'], duration: 'd2'}),
//   		new MidiWriter.NoteEvent({pitch: ['B4'], duration: '4'}),
//   		new MidiWriter.NoteEvent({pitch: ['A4'], duration: 'd2'}),
//   		new MidiWriter.NoteEvent({pitch: ['B4'], duration: '4'}),
//   		new MidiWriter.NoteEvent({pitch: ['A4'], duration: 'd2'}),
//   		new MidiWriter.NoteEvent({pitch: ['B4'], duration: 'd8'}),
//   		new MidiWriter.NoteEvent({pitch: ['A4'], duration: '16'}),
//   		new MidiWriter.NoteEvent({pitch: ['A4'], duration: 'd2'}),
//   		new MidiWriter.NoteEvent({pitch: ['Ab4'], duration: '2'}),
//   		new MidiWriter.NoteEvent({pitch: ['A4', 'B4', 'D5', 'C5', 'E4', 'A4'], duration: '8', sequential:true}),
//   		new MidiWriter.NoteEvent({pitch: ['Gb4'], duration: 'd2'}),
//   		new MidiWriter.NoteEvent({pitch: ['A4'], duration: '4'}),
//   		new MidiWriter.NoteEvent({pitch: ['Gb4'], duration: 'd2'}),
//   		new MidiWriter.NoteEvent({pitch: ['A4'], duration: '4'}),
//   		new MidiWriter.NoteEvent({pitch: ['G4', 'Gb4', 'C4', 'B3', 'Eb4', 'Gb4'], duration: '8', sequential:true}),
//   		new MidiWriter.NoteEvent({pitch: ['D5', 'C5', 'B4'], duration: '8t', sequential:true}),
//   		new MidiWriter.NoteEvent({pitch: ['B4'], duration: 'd2'}),
//   		new MidiWriter.NoteEvent({pitch: ['C5'], duration: '4'}),
//   		new MidiWriter.NoteEvent({pitch: ['B4'], duration: 'd2'}),
//   		new MidiWriter.NoteEvent({pitch: ['C5'], duration: '4'}),
//   		new MidiWriter.NoteEvent({pitch: ['B4'], duration: 'd2'}),
//   		new MidiWriter.NoteEvent({pitch: ['C5'], duration: '4'}),
//   		new MidiWriter.NoteEvent({pitch: ['B4'], duration: 'd8'}),
//   		new MidiWriter.NoteEvent({pitch: ['Bb4'], duration: '16'}),
//   		new MidiWriter.NoteEvent({pitch: ['Bb4'], duration: '4'}),
//   		new MidiWriter.NoteEvent({pitch: ['G5'], duration: '4'}),
//   		new MidiWriter.NoteEvent({pitch: ['Gb5'], duration: 'd8'}),
//   		new MidiWriter.NoteEvent({pitch: ['E5'], duration: '16'}),
//   		new MidiWriter.NoteEvent({pitch: ['E5', 'D#5', 'C6', 'D#5', 'D#5', 'E5', 'G5', 'B4'], duration: '8', sequential:true}),
//   		new MidiWriter.NoteEvent({pitch: ['D5', 'C5'], duration: '8', sequential:true}),
//   		new MidiWriter.NoteEvent({pitch: ['E5', 'E4', 'A4'], duration: '8t', sequential:true}),
//   		new MidiWriter.NoteEvent({pitch: ['Gb4'], duration: 'd4'}),
//   		new MidiWriter.NoteEvent({pitch: ['A4'], duration: '8'}),
//   		new MidiWriter.NoteEvent({pitch: ['Gb4'], duration: 'd2'}),
//   		new MidiWriter.NoteEvent({pitch: ['A4'], duration: '4'}),
//   		new MidiWriter.NoteEvent({pitch: ['Gb4'], duration: 'd2'}),
//   		new MidiWriter.NoteEvent({pitch: ['Gb4'], duration: 'd8'}),
//   		new MidiWriter.NoteEvent({pitch: ['E4'], duration: '16'}),
//   		new MidiWriter.NoteEvent({pitch: ['E4'], duration: 'd2'}),
//   		new MidiWriter.NoteEvent({pitch: ['Gb4'], duration: '4'}),
//   		new MidiWriter.NoteEvent({pitch: ['E4'], duration: 'd2'}),
//   		new MidiWriter.NoteEvent({pitch: ['Gb4'], duration: '4'}),
//   		new MidiWriter.NoteEvent({pitch: ['E4'], duration: '2'}),
//   		new MidiWriter.NoteEvent({pitch: ['C6', 'G5', 'D5', 'C5'], duration: '2', wait: '2'}),
//   		new MidiWriter.NoteEvent({pitch: ['C6', 'G5', 'D5', 'C5'], duration: '2'}),
//   		new MidiWriter.NoteEvent({pitch: ['C6', 'G5', 'E5', 'C5'], duration: '4'})
//   		], function(index, event) {
//   			return {velocity: 100};
//   		}
//   	);
// 
//   // You can optionally pass a single event object to addEvent() if you wish
//   tracks[1] = new MidiWriter.Track();
//   tracks[1].addEvent(new MidiWriter.ProgramChangeEvent({instrument : 1}));
//   tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['E4', 'B3', 'G3'], duration: '8', repeat: 8}));
//   tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['E4', 'A3', 'F#3'], duration: '8', repeat: 4}));
//   tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['D#4', 'A3', 'F#3'], duration: '8', repeat: 4}));
//   tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['D#4', 'A3', 'F3'], duration: '8', repeat: 4}));
//   tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['D4', 'A3', 'F3'], duration: '8', repeat: 2}));
//   tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['D4', 'G#3', 'F3'], duration: '8', repeat: 2}));
//   tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['D4', 'G#3', 'E3'], duration: '8', repeat: 4}));
//   tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['D4', 'G3', 'E3'], duration: '8', repeat: 2}));
//   tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['C#4', 'G3', 'E3'], duration: '8', repeat: 2}));
//   tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['C4', 'G3', 'E3'], duration: '8', repeat: 4}));
//   tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['C4', 'F#3', 'E3'], duration: '8', repeat: 8}));
//   tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['C4', 'F#3', 'D#3'], duration: '8', repeat: 4}));
//   tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['C4', 'F#3', 'D3'], duration: '8', repeat: 8}));
//   tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['C4', 'F3', 'D3'], duration: '8', repeat: 4}));
//   tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['B4', 'F3', 'D3'], duration: '8', repeat: 4}));
//   tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['B4', 'E3', 'C3'], duration: '8', repeat: 2}));
//   tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['A4', 'E3', 'C3'], duration: '8', repeat: 6}));
//   tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['A4', 'E3', 'B3'], duration: '8', repeat: 2}));
//   tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['A4', 'D#3', 'B3'], duration: '8', repeat: 2}));
//   tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['A4', 'E3', 'C3'], duration: '8', repeat: 4}));
//   tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['A4', 'D#3', 'B3'], duration: '8', repeat: 4}));
//   tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['A4', 'E3', 'C3'], duration: '8', repeat: 4}));
//   tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['A4', 'D#3', 'B3'], duration: '4'}));
//   tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['E4', 'B3', 'G3'], duration: '8', wait: 'd2'}));
//   tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['E4', 'B3', 'G3'], duration: '8'}));
//   tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['E4', 'B3', 'G3'], duration: '8'}));
//   tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['E4', 'B3', 'G3'], duration: '8'}));
//   tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['E4', 'B3', 'G3'], duration: '8'}));
//   tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['E4', 'B3', 'G3'], duration: '8'}));
//   tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['E4', 'B3', 'G3'], duration: '8'}));
//   tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['E4', 'B3', 'G3'], duration: '8'}));
//   tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['E4', 'A3', 'F#3'], duration: '8', repeat: 4}));
//   tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['D#4', 'A3', 'F3'], duration: '8', repeat: 4}));
//   tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['D#4', 'G#3', 'F3'], duration: '8', repeat: 2}));
//   tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['D4', 'G#3', 'F3'], duration: '8', repeat: 2}));
//   tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['D4', 'G3', 'E3'], duration: '8', repeat: 4}));
//   tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['D4', 'G3', 'E3'], duration: '8', repeat: 2}));
//   tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['C#4', 'G3', 'E3'], duration: '8', repeat: 2}));
//   tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['A#4', 'E3', 'C#3'], duration: '8', repeat: 2}));
//   tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['A4', 'E3', 'C3'], duration: '8', repeat: 2}));
//   tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['B3', 'B2'], duration: '8'}));
//   tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['A5', 'F#5', 'C4', 'A4'], duration: '8', repeat: 3}));
//   tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['F#5', 'D#5', 'B4', 'G4'], duration: '8'}));
//   tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['E5', 'B4', 'G4'], duration: '8', repeat: 3}));
//   tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['E5', 'C4', 'A4'], duration: '8', repeat: 2}));
//   tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['A3'], duration: '8'}));
//   tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['C4', 'F#3', 'E3'], duration: '8'}));
//   tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['B4', 'E3', 'B3'], duration: '8', repeat: 2}));
//   tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['A4', 'E3', 'C3'], duration: '8', repeat: 2}));
//   tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['B3', 'E3', 'B2'], duration: '8', repeat: 4}));
//   tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['A3', 'E3', 'C3'], duration: '8', repeat: 4}));
//   tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['B3', 'E3', 'B2'], duration: '8', repeat: 4}));
//   tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['B3', 'D#3', 'B3'], duration: '8', repeat: 2}));
//   tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['A3', 'D#3', 'B3'], duration: '8', repeat: 2}));
//   tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['G3', 'E3', 'C3'], duration: '8', repeat: 4}));
//   tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['Bb3', 'E3', 'C3'], duration: '8', repeat: 2}));
//   tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['A3', 'E3', 'C3'], duration: '8', repeat: 2}));
//   tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['A3', 'E3', 'B3'], duration: '8', repeat: 2}));
//   tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['G#3', 'E3', 'B3'], duration: '8', repeat: 2}));
//   tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['G3', 'E3', 'B3'], duration: '8', repeat: 4}));
//   tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['G3', 'C3', 'A#3'], duration: '2'}));
//   tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['B3', 'B2'], duration: '2', wait: '2'}));
//   tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['B3', 'F#3', 'B2'], duration: '2'}));
//   tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['E2', 'E1'], duration: '1'}));
// 
//   var write = new MidiWriter.Writer(tracks);
// 
// 
// 
// 
//   var write = new MidiWriter.Writer(tracks);
//   fs.writeFileSync('public/midi/mwww.mid', write.buildFile(), 'binary');
// 
//   console.log(write.dataUri());
// });
// router.get('/midg', function(req, res, next) {
//   console.log("hello");
//   var file = new Midg.File();
//   // var organ = new Midg.Track();
//   // var piano = new Midg.Track();
//   piano = file.addTrack();
//   organ = file.addTrack();
// 
//   piano.addNote(0, 'c4', 64);
//   piano.addNote(0, 'd4', 64);
//   piano.addNote(0, 'e4', 64);
//   piano.addNote(0, 'f4', 64);
//   piano.addNote(0, 'g4', 64);
//   piano.addNote(0, 'a4', 64);
//   piano.addNote(0, 'b4', 64);
//   piano.addNote(0, 'c5', 64);
//   piano.addNote(0, 'a4', 64);
//   piano.addNote(0, 'b4', 64);
//   piano.addNote(0, 'c5', 64);
//   
//   organ.instrument(0, 0x13) //.instrument(0, 0x13)
//   organ.addNote(0, 'c2', 64);
//   organ.addNote(0, 'd2', 64);
//   organ.addNote(0, 'e2', 64);
//   organ.addNote(0, 'f2', 64);
//   organ.addNote(0, 'g2', 64);
//   organ.addNote(0, 'a2', 64);
//   organ.addNote(0, 'b2', 64);
//   organ.addNote(0, 'c3', 64);
//   
//   
//   // file
//   // .addTrack()
//   // 
//   //   .note(0, 'c4', 12)
//   //   .note(0, 'd4', 24)
//   //   .note(0, 'e4', 64)
//   //   .note(0, 'f4', 32)
//   //   .note(0, 'g4', 32)
//   //   .note(0, 'a4', 32)
//   //   .note(0, 'b4', 32)
//   //   .note(0, 'c5', 32)
//   // 
//   //   // church organ
//   //   .instrument(0, 0x13)
//   // 
//   //   // by skipping the third arguments, we create a chord (C major)
//   //   .noteOn(0, 'c4', 64)
//   //   .noteOn(0, 'e4')
//   //   .noteOn(0, 'g4')
//   // 
//   //   // by skipping the third arguments again, we stop all notes at once
//   //   .noteOff(0, 'c4', 47)
//   //   .noteOff(0, 'e4')
//   //   .noteOff(0, 'g4')
//   // 
//   //   //alternatively, a chord may be created with the addChord function
//   //   .addChord(0, ['c4', 'e4', 'g4'], 64)
//   // 
//   //   .noteOn(0, 'c4', 1)
//   //   .noteOn(0, 'e4')
//   //   .noteOn(0, 'g4')
//   //   .noteOff(0, 'c4', 384)
//   //   .noteOff(0, 'e4')
//   //   .noteOff(0, 'g4')
//   //   ;
//   //   file.addTrack(organ);
//   //   
//   //     .instrument(0, 0x13)
//   //     .note(0, 'c2', 12)
//   //     .note(0, 'd2', 24)
//   //     .note(0, 'e2', 64)
//   //     .note(0, 'f2', 32)
//   //     .note(0, 'g2', 32)
//   //     .note(0, 'a2', 32)
//   //     .note(0, 'b2', 32)
//   //     .note(0, 'c5', 32)
//   // 
//   //     // church organ
//   //     .instrument(0, 0x13)
//   // 
//   //     // by skipping the third arguments, we create a chord (C major)
//   //     .noteOn(0, 'c3', 64)
//   //     .noteOn(0, 'e4')
//   //     .noteOn(0, 'g4')
//   // 
//   //     // by skipping the third arguments again, we stop all notes at once
//   //     .noteOff(0, 'c3', 47)
//   //     .noteOff(0, 'e4')
//   //     .noteOff(0, 'g4')
//   // 
//   //     //alternatively, a chord may be created with the addChord function
//   //     .addChord(0, ['c3', 'e3', 'g4'], 64)
//   // 
//   //     .noteOn(0, 'c3', 1)
//   //     .noteOn(0, 'e4')
//   //     .noteOn(0, 'g4')
//   //     .noteOff(0, 'c3', 384)
//   //     .noteOff(0, 'e4')
//   //     .noteOff(0, 'g4')
//   //     ;
// 
//     fs.writeFileSync('public/midi/midg.mid', file.toBytes(), 'binary');
// });

module.exports = router;
