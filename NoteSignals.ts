
export interface NoteSignals {
    head: NoteSignalHead;
    content : NoteSignalContent;
}

interface NoteSignalContent{

}

export interface GenerateSignal extends NoteSignalContent{
    quantizationInfo: QuantizationConfig;
}

export interface MidiData extends NoteSignalContent{
    pitch: number;
    velocity: number;
    startTime: number;
    endTime: number;
}

export interface quantizedMidiData{
    pitch: number;
    quantizedStartStep: number;
    quantizedEndStep: number;
}   

export interface preQuantizedMidiData{
    quantizationConfig: QuantizationConfig;
    midiData: quantizedMidiData[];
    steps: number;
    temperature: number;
}

export function configurePreQuantizedMidiData(midiData: quantizedMidiData[], quantizationInfo: QuantizationConfig, steps: number, temperature: number): preQuantizedMidiData{
    return {
        quantizationConfig: quantizationInfo,
        midiData: midiData,
        steps: steps,
        temperature: temperature
    }
}


export interface QuantizationConfig{
    stepsPerQuarter: number;
    totalQuantizedSteps: number;
}


export function quantizeMidi(midi: MidiData, quantizationInfo: QuantizationConfig): quantizedMidiData{
    return {
        pitch: midi.pitch,
        quantizedStartStep: Math.round(midi.startTime * quantizationInfo.stepsPerQuarter),
        quantizedEndStep: Math.round(midi.endTime * quantizationInfo.stepsPerQuarter)
    }
}


enum NoteSignalHead{
    Generate = "generate",
    Music_Note = "music_note"
}