import { EventEmitter } from 'events';

// This is a global event emitter that can be used to propagate errors
// from the data layer to the UI layer.
export const errorEmitter = new EventEmitter();
