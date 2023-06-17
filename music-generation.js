const { MusicRNN } = require('@magenta/music/node/music_rnn');
const { Player } = require('node-wav-player');

const melodyrnn = new MusicRNN('https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/melody_rnn');

const noteSeq = [
    { pitch: 72, quantizedStartStep: 0, quantizedEndStep: 2 },
    { pitch: 76, quantizedStartStep: 2, quantizedEndStep: 3 },
    { pitch: 79, quantizedStartStep: 3, quantizedEndStep: 4 }
  ];
  
  const seedSeq = {
    totalQuantizedSteps: 4,
    quantizationInfo: { stepsPerQuarter: 1 },
    notes: noteSeq
  }
  
  async function newSeq(){
    try{
      let resultSeq = await melodyrnn.continueSequence(
        seedSeq,
        8,
        1.1
      )
      console.log('the result sequence is: ', resultSeq)
    } catch (error){
      console.log(error)
    }
  }

  newSeq();

// const player = new Player();
// model
//   .initialize()
//   .then(() => model.sample(1))
//   .then(samples => {
//     player.resumeContext();
//     player.start(samples[0])
//   });