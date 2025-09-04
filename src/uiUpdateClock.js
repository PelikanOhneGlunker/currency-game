// uiUpdateClock.js - UI Update Clock for Async Operations

window.UIUpdateClock = class UIUpdateClock {
    constructor(tickInterval = 16) { // ~60 FPS by default
        this.tickInterval = tickInterval;
        this.isRunning = false;
        this.updateQueue = [];
        this.subscribers = new Set();
        this.lastTick = 0;
        this.animationFrameId = null;
        this.stats = {
            totalUpdates: 0,
            droppedFrames: 0,
            averageUpdateTime: 0
        };
    }

    // Start the clock
    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.lastTick = performance.now();
        this.tick();
        
        console.log('UI Update Clock started');
    }

    // Stop the clock
    stop() {
        if (!this.isRunning) return;
        
        this.isRunning = false;
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
        
        console.log('UI Update Clock stopped');
    }

    // Main tick function
    tick() {
        if (!this.isRunning) return;
        
        const now = performance.now();
        const deltaTime = now - this.lastTick;
        
        // Check if we should process updates
        if (deltaTime >= this.tickInterval) {
            const startProcessing = performance.now();
            
            // Process update queue
            this.processQueue();
            
            // Notify subscribers
            this.notifySubscribers(deltaTime);
            
            // Update stats
            const processingTime = performance.now() - startProcessing;
            this.updateStats(processingTime, deltaTime);
            
            this.lastTick = now;
        }
        
        // Schedule next tick
        this.animationFrameId = requestAnimationFrame(() => this.tick());

        var deleteDoubleMainFrame = () => {
            var mfs = document.getElementsByClassName("game-container").length
            if (mfs > 1) {
                try {
                    document.getElementsByClassName("game-container")[1].innerHTML = ""
                } catch {
                    document.getElementsByClassName("game-container")[1] = {}
                }
            }
        }

        deleteDoubleMainFrame();
    }

    // Process queued updates
    processQueue() {
        const batchSize = Math.min(this.updateQueue.length, 10); // Process max 10 updates per tick
        
        for (let i = 0; i < batchSize; i++) {
            const update = this.updateQueue.shift();
            if (update) {
                try {
                    update.execute();
                    this.stats.totalUpdates++;
                } catch (error) {
                    console.error('Error executing update:', error);
                    if (update.onError) {
                        update.onError(error);
                    }
                }
            }
        }
    }

    // Queue an update
    queueUpdate(updateFn, priority = 0, onError = null) {
        const update = {
            execute: updateFn,
            priority,
            onError,
            timestamp: performance.now()
        };
        
        // Insert based on priority (higher priority first)
        let insertIndex = this.updateQueue.findIndex(u => u.priority < priority);
        if (insertIndex === -1) {
            this.updateQueue.push(update);
        } else {
            this.updateQueue.splice(insertIndex, 0, update);
        }
        
        return update;
    }

    // Subscribe to clock ticks
    subscribe(callback) {
        this.subscribers.add(callback);
        return () => this.subscribers.delete(callback);
    }

    // Notify all subscribers
    notifySubscribers(deltaTime) {
        this.subscribers.forEach(callback => {
            try {
                callback(deltaTime, this.stats);
            } catch (error) {
                console.error('Error in subscriber callback:', error);
            }
        });
    }

    // Update statistics
    updateStats(processingTime, deltaTime) {
        if (deltaTime > this.tickInterval * 2) {
            this.stats.droppedFrames++;
        }
        
        // Calculate rolling average
        this.stats.averageUpdateTime = 
            (this.stats.averageUpdateTime * 0.95) + (processingTime * 0.05);
    }

    // Get current stats
    getStats() {
        return { ...this.stats };
    }

    // Clear the update queue
    clearQueue() {
        this.updateQueue = [];
    }

    // Set tick interval (in milliseconds)
    setTickInterval(interval) {
        this.tickInterval = Math.max(8, interval); // Minimum 8ms (~120 FPS max)
    }
};

// Create global clock instance
window.uiClock = new UIUpdateClock();

// Integration with UIController
const setupUIControllerIntegration = () => {
    if (window.uiController) {
        // Override queueUpdate to use the clock
        const originalQueueUpdate = window.uiController.queueUpdate;
        window.uiController.queueUpdate = function(fn) {
            window.uiClock.queueUpdate(fn, 1);
        };
        
        // Subscribe to clock for debugging
        window.uiClock.subscribe((deltaTime, stats) => {
            if (stats.totalUpdates % 100 === 0) { // Log every 100 updates
                console.log('UI Clock Stats:', stats);
            }
        });
        
        console.log('UIUpdateClock integrated with UIController');
    } else {
        // Try again later if uiController doesn't exist yet
        setTimeout(setupUIControllerIntegration, 100);
    }
};

// Setup integration
setupUIControllerIntegration();

// Auto-start clock when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.uiClock.start();
    });
} else {
    window.uiClock.start();
}

// Stop clock on page unload
window.addEventListener('beforeunload', () => {
    window.uiClock.stop();
});

// Self-register module (optional, not required for initialization)
if (window.appInitializer) {
    window.appInitializer.moduleLoaded('uiClock');
}
