// appInitializer.js - Application Initialization

window.AppInitializer = class AppInitializer {
    constructor() {
        this.initialized = false;
        this.readyCallbacks = [];
    }

    // Initialize the application
    async initialize() {
        if (this.initialized) return;
        
        console.log('Initializing application...');
        this.initialized = true;

        try {
            // Build the DOM
            await this.buildUI();
            
            // Setup event listeners SAFELY
            window.useModule('uiController', (uiController) => {
                this.setupEventListeners(uiController);
            });
            
            // Execute ready callbacks
            this.executeReadyCallbacks();
            
            // Emit initialization complete SAFELY
            window.useModule('uiController', (uiController) => {
                uiController.emitUpdate('appInitialized', {
                    timestamp: Date.now(),
                    modules: window.ModuleLoader.listLoaded()
                });
            });
            
            console.log('Application initialized successfully');
        } catch (error) {
            console.error('Error initializing application:', error);
            this.handleInitializationError(error);
        }
    }

    // Build UI
    async buildUI() {
        return new Promise((resolve, reject) => {
            try {
                // Wait for required modules
                window.useModules(['styles', 'createUI', 'answerManager'], (modules) => {
                    // Ensure DOM is ready
                    if (document.readyState === 'loading') {
                        document.addEventListener('DOMContentLoaded', () => {
                            window.buildDom();
                            resolve();
                        });
                    } else {
                        // DOM is already ready
                        window.buildDom();
                        resolve();
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    // Setup global event listeners
    setupEventListeners(uiController) {
        // Listen for UI updates
        uiController.addEventListener('ui-update', (event) => {
            console.log('UI Update:', event.detail);
            
            // Store update in history if needed
            if (window.updateHistory) {
                window.updateHistory.push(event.detail);
            }
        });

        // Handle errors
        window.addEventListener('error', (event) => {
            console.error('Global error:', event.error);
            this.handleRuntimeError(event.error);
        });

        // Handle unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled promise rejection:', event.reason);
            this.handleRuntimeError(event.reason);
        });
    }

    // Add ready callback
    ready(callback) {
        if (this.initialized) {
            callback();
        } else {
            this.readyCallbacks.push(callback);
        }
    }

    // Execute ready callbacks
    executeReadyCallbacks() {
        while (this.readyCallbacks.length > 0) {
            const callback = this.readyCallbacks.shift();
            try {
                callback();
            } catch (error) {
                console.error('Error in ready callback:', error);
            }
        }
    }

    // Handle initialization errors
    handleInitializationError(error) {
        const errorContainer = document.createElement('div');
        errorContainer.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ff4757;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            max-width: 300px;
        `;
        errorContainer.textContent = `Initialization Error: ${error.message}`;
        document.body.appendChild(errorContainer);
        
        setTimeout(() => {
            errorContainer.remove();
        }, 5000);
    }

    // Handle runtime errors
    handleRuntimeError(error) {
        console.error('Runtime error handled:', error);
    }

    // Reset application
    reset() {
        this.initialized = false;
        this.readyCallbacks = [];
        document.body.innerHTML = '';
        console.log('Application reset');
    }
};

// Create global instance
window.appInitializer = new AppInitializer();

// Register the app initializer module
if (window.ModuleLoader) {
    window.ModuleLoader.register('appInitializer', window.appInitializer);
}

// Wait for core modules then initialize
window.useModules(['styles', 'uiController', 'createUI'], () => {
    console.log('Core modules loaded, starting initialization...');
    window.appInitializer.initialize();
});