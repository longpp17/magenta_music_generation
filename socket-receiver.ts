import { Observable, of, Subject, BehaviorSubject, combineLatest } from 'rxjs';
import { observeOn, map, bufferCount, filter, catchError } from 'rxjs/operators';
import { asyncScheduler } from 'rxjs';
import { NoteSignals, MidiData, quantizedMidiData, QuantizationConfig, 
    preQuantizedMidiData, quantizeMidi, configurePreQuantizedMidiData} from "./NoteSignals.js"
import { WorkerSubject } from 'rxjs-worker-subject';
import { INoteSequence } from '@magenta/music';
import { Worker } from 'worker_threads';

import { createServer, Socket } from 'net';
const noteSignals = new Subject<NoteSignals>();
var latestMusicNote : Array<MidiData> = []; // TODO: type this
noteSignals.pipe(
    filter((noteSignal: NoteSignals) => noteSignal.head === "music_note"),
    map((noteSignal: NoteSignals) => noteSignal.content as MidiData),
    bufferCount(8)    
).subscribe((data: Array<MidiData>) => {
    latestMusicNote = data;
});



function createWorkerObservable(workerPath : string, inputObservable: Observable<preQuantizedMidiData>) {
    return new Observable<INoteSequence>((subscriber) => {
      const worker = new Worker(workerPath);
  
      worker.on('message', (message) => {
        subscriber.next(message);
      });
  
      worker.on('error', (error) => {
        subscriber.error(error);
      });
  
      worker.on('exit', (code) => {
        if (code !== 0) {
          subscriber.error(new Error("Worker stopped with exit code ${code})"));
        } else {
          subscriber.complete();
        }
      });
  
      inputObservable.subscribe((data) => {
        worker.postMessage(data);
      });
  
      return () => {
        worker.terminate();
      };
    });
  }

const generateNewSequence = noteSignals.pipe(
    filter((noteSignal: NoteSignals) => noteSignal.head === "generate"),
    map((noteSignal: NoteSignals) => {
        const midiData : quantizedMidiData[] = latestMusicNote.map((midi: MidiData) => quantizeMidi(midi, noteSignal.content as QuantizationConfig))
        return configurePreQuantizedMidiData(midiData, noteSignal.content as QuantizationConfig, 32, 1.1)}));

const result = createWorkerObservable('./generate_worker.ts', generateNewSequence);


const server = createServer((socket: Socket) => {

    // observe and process input
    const observable = new Observable<string>(observer => {
        socket.on('data', (data: Buffer) => {
            observer.next(data.toString());
        });

        socket.on('close', () => {
            observer.complete();
        });

        socket.on('error', (err: Error) => {
            observer.error(err);
        });

    });

    observable.pipe( 
        map((data: string) => data.replace(/[\u0000-\u0019\u007F-\u009F]/g, '')),
        map((data: string) => JSON.parse(data)),
        catchError((err: Error) => {console.log(err); return of({})}),)
    .subscribe(noteSignals);   

    // write result back
    result
    .pipe(
        map((data: INoteSequence) => JSON.stringify(data)),
        catchError((err: Error) => {console.log(err); return ""}),)
    .subscribe((data: string) => {
        socket.write(data);
        console.log("sent:" + data);
    })
});

server.listen(8080, () => {
    console.log('Server started.');
});

     