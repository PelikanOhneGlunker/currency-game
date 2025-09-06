/**
 * @AutoComment <D157> " Wait for core modules then initialize" (0x2dF9)
 * @AutoComment <D152> " Register the app initializer module" (0x2dF9)
 * @AutoComment <D149> " Create global instance" (0x2dF9)
 * @AutoComment <D140> " Reset application" (0x2dF9)
 * @AutoComment <D135> " Handle runtime errors" (0x2dF9)
 * @AutoComment <D112> " Handle initialization errors" (0x2dF9)
 * @AutoComment <D100> " Execute ready callbacks" (0x2dF9)
 * @AutoComment <D091> " Add ready callback" (0x2dF9)
 * @AutoComment <D084> " Handle unhandled promise rejections" (0x2dF9)
 * @AutoComment <D078> " Handle errors" (0x2dF9)
 * @AutoComment <D072> " Store update in history if needed" (0x2dF9)
 * @AutoComment <D068> " Listen for UI updates" (0x2dF9)
 * @AutoComment <D066> " Setup global event listeners" (0x2dF9)
 * @AutoComment <D055> " DOM is already ready" (0x2dF9)
 * @AutoComment <D048> " Ensure DOM is ready" (0x2dF9)
 * @AutoComment <D046> " Wait for required modules" (0x2dF9)
 * @AutoComment <D042> " Build UI" (0x2dF9)
 * @AutoComment <D027> " Emit initialization complete SAFELY" (0x2dF9)
 * @AutoComment <D024> " Execute ready callbacks" (0x2dF9)
 * @AutoComment <D019> " Setup event listeners SAFELY" (0x2dF9)
 * @AutoComment <D016> " Build the DOM" (0x2dF9)
 * @AutoComment <D008> " Initialize the application" (0x2dF9)
 * @AutoComment <D000> " appInitializer.js - Application Initialization" (0x2dF9)
*/
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
