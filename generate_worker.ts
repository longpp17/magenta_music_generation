
const { parentPort } = require("node:worker_threads");
console.log('current directory: ', process.cwd())
const preQuantizedMidiData  = require("./NoteSignals.js") ;
// remember to generate new NoteSignals
// const { INoteSequence }  = require( "@magenta/");
const { MusicRNN } = require('@magenta/music/node/music_rnn');

// type INoteSequence = typeof INoteSequence;

parentPort.on("message", async msg  => {
    
        const melodyrnn = new MusicRNN('https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/melody_rnn');
        const seedSeq = {
                totalQuantizedSteps: msg.quantizationConfig.totalQuantizedSteps,
                quantizationInfo: {stepsPerQuarter: msg.quantizationConfig.stepsPerQuarter},
                notes: msg.midiData
        }

        async function newSeq(msg){
                try{
                        let resultSeq = await melodyrnn.continueSequence(
                            seedSeq,
                            msg.steps,
                            msg.temperature
                        )
                        parentPort.postMessage(resultSeq);
                    } catch (error){
                        console.log(error)
                        console.log(msg)
                    }
        }

        await newSeq(msg);
});