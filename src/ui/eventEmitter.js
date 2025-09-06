// src/eventEmitter.js
export default class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
        return () => this.off(event, listener);
    }

    off(event, listener) {
        if (!this.events[event]) return;
        this.events[event] = this.events[event].filter(l => l !== listener);
    }

    emit(event, data) {
        if (!this.events[event]) return;
        this.events[event].forEach(listener => {
            try {
                listener(data);
            } catch (error) {
                console.error(`Error in event listener for ${event}:`, error);
            }
        });
    }

    once(event, listener) {
        const unsubscribe = this.on(event, (data) => {
            unsubscribe();
            listener(data);
        });
        return unsubscribe;
    }
}
