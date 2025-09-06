// src/uiController.js
import EventEmitter from './eventEmitter.js';

export class UIController extends EventEmitter {
    constructor() {
        super();
        this.elements = {};
        this.updateQueue = [];
        this.isProcessing = false;
    }

    // Cache DOM elements
    cacheElements() {
        this.elements = {
            coins: document.getElementById('coins-display'),
            level: document.getElementById('level-display'),
            xp: document.getElementById('xp-display'),
            currentLevel: document.getElementById('current-level'),
            nextLevel: document.getElementById('next-level'),
            levelProgress: document.getElementById('level-progress-bar'),
            question: document.getElementById('question-text'),
            timer: document.getElementById('timer-display'),
            answersContainer: document.getElementById('answers-container')
        };
    }

    // Generic setter with event emission
    setValue(elementKey, value) {
        if (this.elements[elementKey]) {
            this.elements[elementKey].innerHTML = value;
            this.emit('update', { type: elementKey, value });
        }
    }

    // Batch update
    setMultiple(updates) {
        Object.entries(updates).forEach(([key, value]) => {
            this.setValue(key, value);
        });
    }

    // Specific setters
    setCoins(value) { this.setValue('coins', value); }
    setLevel(value) { this.setValue('level', value); }
    setXP(value) { this.setValue('xp', value); }
    setQuestion(value) { this.setValue('question', value); }
    setTimer(value) { this.setValue('timer', value); }
    
    setLevelProgress(percentage) {
        if (this.elements.levelProgress) {
            this.elements.levelProgress.style.width = `${percentage}%`;
            this.emit('update', { type: 'levelProgress', value: percentage });
        }
    }

    // Queue-based async updates
    async queueUpdate(fn) {
        this.updateQueue.push(fn);
        if (!this.isProcessing) {
            await this.processQueue();
        }
    }

    async processQueue() {
        this.isProcessing = true;
        
        while (this.updateQueue.length > 0) {
            const fn = this.updateQueue.shift();
            await fn();
            await new Promise(resolve => requestAnimationFrame(resolve));
        }
        
        this.isProcessing = false;
    }
}

// Create singleton instance
export const uiController = new UIController();
