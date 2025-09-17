window.UIUpdateClock = class UIUpdateClock {
    constructor(tickInterval = 16) { // ~60 FPS by default
        this.tickInterval = tickInterval
        this.isRunning = false
        this.updateQueue = []
        this.subscribers = new Set()
        this.lastTick = 0
        this.animationFrameId = null
        this.stats = {
            totalUpdates: 0,
            droppedFrames: 0,
            averageUpdateTime: 0
        }
    }
    start() {
        if (this.isRunning) return
        this.isRunning = true
        this.lastTick = performance.now()
                if (!(isLoadingScreen === true)) {
                const { applyStyles, getResponsiveStyles, isTablet } = window.StyleUtils
                document.getElementById('answers-container').innerHTML = isLoadingScreen
                var styles = {
                        color: 'white',
                        border: 'none',
                        ...baseStyles.borderRadius('15px'),
                        padding: getResponsiveStyles('1rem 1.5rem', '1rem 1.5rem', '1.25rem 2rem'),
                        fontSize: getResponsiveStyles('1rem', '1.1rem', '1.15rem'),
                        fontWeight: '600',
                        cursor: 'pointer',
                        ...baseStyles.transition(),
                        textAlign: 'center',
                        minHeight: getResponsiveStyles('60px', '80px', '90px'),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: isTablet() ? '1' : 'auto',
                        outline: 'none',
                        position: 'relative',
                        overflow: 'hidden'
                }
                Object.assign(document.getElementById('answers-anz1'), styles)
                Object.assign(document.getElementById('answers-anz2'), styles)
            }
        this.tick()
        console.log('UI Update Clock started')
    }
    stop() {
        if (!this.isRunning) return
        this.isRunning = false
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId)
            this.animationFrameId = null
        }
        console.log('UI Update Clock stopped')
    }
    tick() {
        if (!this.isRunning) return
        const now = performance.now()
        const deltaTime = now - this.lastTick
        if (deltaTime >= this.tickInterval) {
            const startProcessing = performance.now()
            this.processQueue()
            this.notifySubscribers(deltaTime)
            const processingTime = performance.now() - startProcessing
            this.updateStats(processingTime, deltaTime)
            this.lastTick = now
        }
        this.animationFrameId = requestAnimationFrame(() => this.tick())
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
        deleteDoubleMainFrame()
    }
    processQueue() {

        /**
         * @param Math.min <T> (INT): 10 - Process max 10 updates per tick
         */
        const batchSize = Math.min(this.updateQueue.length, 10)
        for (let i = 0; i < batchSize; i++) {
            const update = this.updateQueue.shift()
            if (update) {
                try {
                    update.execute()
                    this.stats.totalUpdates++
                } catch (error) {
                    console.error('Error executing update:', error)
                    if (update.onError) {
                        update.onError(error)
                    }
                }
            }
        }
    }
    queueUpdate(updateFn, priority = 0, onError = null) {
        const update = {
            execute: updateFn,
            priority,
            onError,
            timestamp: performance.now()
        }
        let insertIndex = this.updateQueue.findIndex(u => u.priority < priority)
        if (insertIndex === -1) {
            this.updateQueue.push(update)
        } else {
            this.updateQueue.splice(insertIndex, 0, update)
        }
        return update
    }
    subscribe(callback) {
        this.subscribers.add(callback)
        return () => this.subscribers.delete(callback)
    }
    notifySubscribers(deltaTime) {
        this.subscribers.forEach(callback => {
            try {
                callback(deltaTime, this.stats)
            } catch (error) {
                console.error('Error in subscriber callback:', error)
            }
        })
    }
    updateStats(processingTime, deltaTime) {
        if (deltaTime > this.tickInterval * 2) {
            this.stats.droppedFrames++
        }
        this.stats.averageUpdateTime = 
            (this.stats.averageUpdateTime * 0.95) + (processingTime * 0.05)
    }
    getStats() {
        return { ...this.stats }
    }
    clearQueue() {
        this.updateQueue = []
    }
    setTickInterval(interval) {
        this.tickInterval = Math.max(8, interval); // Minimum 8ms (~120 FPS max)
    }
}
window.uiClock = new UIUpdateClock()
window.timerHexValue = [new HexNumber(0x0)]
const setupUIControllerIntegration = () => {
    if (window.uiController) {
        window.uiController.queueUpdate = function(fn) {
            window.uiClock.queueUpdate(fn, 1)
        }
        window.uiClock.subscribe((deltaTime, stats) => {
            window.timerHexValue[0] = window.timerHexValue[0].add(new HexNumber(0x64))
            document.getElementById("timer-display").innerText = window.timerHexValue[0].toString()
            if (stats.totalUpdates % 100 === 0) {
                if (SHOW_CLOCK_TICKS) {
                    console.log('UI Clock Stats:', stats)
                }
            }
        })
        console.log('UIUpdateClock integrated with UIController')
    } else {
        setTimeout(setupUIControllerIntegration, 100)
    }
}
setupUIControllerIntegration()
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.uiClock.start()
    })
} else {
    window.uiClock.start()
}
window.addEventListener('beforeunload', () => {
    window.uiClock.stop()
})
if (window.appInitializer) {
    window.appInitializer.moduleLoaded('uiClock')
}

