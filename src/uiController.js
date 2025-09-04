// uiController.js - UI Controller with Event System

window.UIController = class UIController extends EventTarget {
    constructor() {
        super();
        this.updateQueue = [];
        this.isProcessing = false;
    }

    // Emit update event for async processing
    emitUpdate(type, value) {
        this.dispatchEvent(new CustomEvent('ui-update', { 
            detail: { type, value, timestamp: Date.now() }
        }));
    }

    // Queue-based update system for async operations
    queueUpdate(fn) {
        this.updateQueue.push(fn);
        this.processQueue();
    }

    async processQueue() {
        if (this.isProcessing) return;
        this.isProcessing = true;

        while (this.updateQueue.length > 0) {
            const fn = this.updateQueue.shift();
            await fn();
            await new Promise(resolve => requestAnimationFrame(resolve));
        }

        this.isProcessing = false;
    }

    // Coins functions
    setCoins(value) {
        this.queueUpdate(() => {
            const element = document.getElementById('coins-display');
            if (element) element.innerHTML = value;
            this.emitUpdate('coins', value);
        });
    }

    getCoins() {
        const element = document.getElementById('coins-display');
        return element ? element.innerHTML : null;
    }

    // Level functions
    setLevel(value) {
        this.queueUpdate(() => {
            const element = document.getElementById('level-display');
            if (element) element.innerHTML = value;
            this.emitUpdate('level', value);
        });
    }

    getLevel() {
        const element = document.getElementById('level-display');
        return element ? element.innerHTML : null;
    }

    // XP functions
    setXP(value) {
        this.queueUpdate(() => {
            const element = document.getElementById('xp-display');
            if (element) element.innerHTML = value;
            this.emitUpdate('xp', value);
        });
    }

    getXP() {
        const element = document.getElementById('xp-display');
        return element ? element.innerHTML : null;
    }

    // Level Progress Bar functions
    setLevelProgress(percentage) {
        this.queueUpdate(() => {
            const element = document.getElementById('level-progress-bar');
            if (element) {
                element.style.width = percentage + '%';
                this.emitUpdate('levelProgress', percentage);
            }
        });
    }

    getLevelProgress() {
        const element = document.getElementById('level-progress-bar');
        return element ? parseFloat(element.style.width) : null;
    }

    // Question Text functions
    setQuestion(text) {
        this.queueUpdate(() => {
            const element = document.getElementById('question-text');
            if (element) element.innerHTML = text;
            this.emitUpdate('question', text);
        });
    }

    getQuestion() {
        const element = document.getElementById('question-text');
        return element ? element.innerHTML : null;
    }

    // Timer functions
    setTimer(value) {
        this.queueUpdate(() => {
            const element = document.getElementById('timer-display');
            if (element) element.innerHTML = value;
            this.emitUpdate('timer', value);
        });
    }

    getTimer() {
        const element = document.getElementById('timer-display');
        return element ? element.innerHTML : null;
    }

    // Current/Next Level functions
    setCurrentLevel(value) {
        this.queueUpdate(() => {
            const element = document.getElementById('current-level');
            if (element) element.innerHTML = value;
            this.emitUpdate('currentLevel', value);
        });
    }

    setNextLevel(value) {
        this.queueUpdate(() => {
            const element = document.getElementById('next-level');
            if (element) element.innerHTML = value;
            this.emitUpdate('nextLevel', value);
        });
    }

    // Batch update multiple values
    setMultiple(values) {
        Object.entries(values).forEach(([key, value]) => {
            const methodName = 'set' + key.charAt(0).toUpperCase() + key.slice(1);
            if (typeof this[methodName] === 'function') {
                this[methodName](value);
            }
        });
    }

    // Get all values at once
    getAllValues() {
        return {
            coins: this.getCoins(),
            level: this.getLevel(),
            xp: this.getXP(),
            currentLevel: document.getElementById('current-level')?.innerHTML,
            nextLevel: document.getElementById('next-level')?.innerHTML,
            levelProgress: this.getLevelProgress(),
            question: this.getQuestion(),
            timer: this.getTimer()
        };
    }
};

// Create global instance
window.uiController = new UIController();

// Register module
if (window.ModuleLoader) {
    window.ModuleLoader.register('uiController', window.uiController);
}