"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quantizeMidi = exports.configurePreQuantizedMidiData = void 0;
function configurePreQuantizedMidiData(midiData, quantizationInfo, steps, temperature) {
    return {
        quantizationConfig: quantizationInfo,
        midiData: midiData,
        steps: steps,
        temperature: temperature
    };
}
exports.configurePreQuantizedMidiData = configurePreQuantizedMidiData;
function quantizeMidi(midi, quantizationInfo) {
    return {
        pitch: midi.pitch,
        quantizedStartStep: Math.round(midi.startTime * quantizationInfo.stepsPerQuarter),
        quantizedEndStep: Math.round(midi.endTime * quantizationInfo.stepsPerQuarter)
    };
}
exports.quantizeMidi = quantizeMidi;
var NoteSignalHead;
(function (NoteSignalHead) {
    NoteSignalHead["Generate"] = "generate";
    NoteSignalHead["Music_Note"] = "music_note";
})(NoteSignalHead || (NoteSignalHead = {}));
