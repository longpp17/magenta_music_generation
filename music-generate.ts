// //seems to be working

// const { MusicRNN } = require('@magenta/music/node/music_rnn');
// const { Player } = require('node-wav-player');

// const melodyrnn = new _MusicRNN('https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/melody_rnn');

// const noteSeq = [
//     { pitch: 72, quantizedStartStep: 0, quantizedEndStep: 2 },
//     { pitch: 60, quantizedStartStep: 2, quantizedEndStep: 3 },
//     { pitch: 79, quantizedStartStep: 3, quantizedEndStep: 4 },
//   ];
  
//   const seedSeq = {
//     totalQuantizedSteps: 10,
//     quantizationInfo: { stepsPerQuarter: 1 },
//     notes: noteSeq
//   }
  
//   async function newSeq(){
//     try{
//       let resultSeq = await melodyrnn.continueSequence(
//         seedSeq,
//         8,
//         1.1
//       )
//       console.log('the result sequence is: ', resultSeq)
//     } catch (error){
//       console.log(error)
//     }
//   }

//   newSeq();
