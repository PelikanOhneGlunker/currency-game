window.AppInitializer = class AppInitializer {
    constructor() {
        this.initialized = false
        this.readyCallbacks = []
    }
    async initialize() {
        if (this.initialized) return
        
        console.log('Initializing application...')
        this.initialized = true
        try {
            await this.buildUI()
            
            window.useModule('uiController', (uiController) => {
                this.setupEventListeners(uiController)
            })
            
            this.executeReadyCallbacks()
            
            window.useModule('uiController', (uiController) => {
                uiController.emitUpdate('appInitialized', {
                    timestamp: Date.now(),
                    modules: window.ModuleLoader.listLoaded()
                })
            })
            
            console.log('Application initialized successfully')
        } catch (error) {
            console.error('Error initializing application:', error)
            this.handleInitializationError(error)
        }
    }
    async buildUI() {
        return new Promise((resolve, reject) => {
            try {
                window.useModules(['styles', 'createUI', 'answerManager'], (modules) => {
                    if (document.readyState === 'loading') {
                        document.addEventListener('DOMContentLoaded', () => {
                            window.buildDom()
                            resolve()
                        })
                    } else {
                        window.buildDom()
                        resolve()
                    }
                })
            } catch (error) {
                reject(error)
            }
        })
    }
    setupEventListeners(uiController) {
        uiController.addEventListener('ui-update', (event) => {
            console.log('UI Update:', event.detail)
            global_refresh_page()

            if (window.updateHistory) {
                window.updateHistory.push(event.detail)
            }
        })
        window.addEventListener('error', (event) => {
            console.error('Global error:', event.error)
            this.handleRuntimeError(event.error)
        })
        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled promise rejection:', event.reason)
            this.handleRuntimeError(event.reason)
        })
    }
    ready(callback) {
        if (this.initialized) {
            callback()
        } else {
            this.readyCallbacks.push(callback)
        }
    }
    executeReadyCallbacks() {
        while (this.readyCallbacks.length > 0) {
            const callback = this.readyCallbacks.shift()
            try {
                callback()
            } catch (error) {
                console.error('Error in ready callback:', error)
            }
        }
    }
    handleInitializationError(error) {
        const errorContainer = document.createElement('div')
        errorContainer.style.cssText = `
            position: fixed
            top: 20px
            right: 20px
            background: #ff4757
            color: white
            padding: 15px 20px
            border-radius: 8px
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3)
            z-index: 10000
            max-width: 300px
        `
        errorContainer.textContent = `Initialization Error: ${error.message}`
        document.body.appendChild(errorContainer)
        
        setTimeout(() => {
            errorContainer.remove()
        }, 5000)
    }
    handleRuntimeError(error) {
        console.error('Runtime error handled:', error)
    }
    reset() {
        this.initialized = false
        this.readyCallbacks = []
        document.body.innerHTML = ''
        console.log('Application reset')
    }
}
window.appInitializer = new AppInitializer()
if (window.ModuleLoader) {
    window.ModuleLoader.register('appInitializer', window.appInitializer)
}
window.useModules(['styles', 'uiController', 'createUI'], () => {
    console.log('Core modules loaded, starting initialization...')
    window.appInitializer.initialize()
})
