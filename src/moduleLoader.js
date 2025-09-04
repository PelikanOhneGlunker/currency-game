// moduleLoader.js - Module Loading System (MUST BE LOADED FIRST)

window.ModuleLoader = {
    modules: {},
    pendingCallbacks: {},
    
    // Register a module
    register(name, moduleObject) {
        console.log(`Registering module: ${name}`);
        this.modules[name] = moduleObject;
        
        // Execute any pending callbacks waiting for this module
        if (this.pendingCallbacks[name]) {
            this.pendingCallbacks[name].forEach(callback => {
                try {
                    callback(moduleObject);
                } catch (error) {
                    console.error(`Error in callback for module ${name}:`, error);
                }
            });
            delete this.pendingCallbacks[name];
        }
        
        // Emit custom event
        window.dispatchEvent(new CustomEvent('moduleRegistered', { 
            detail: { name, module: moduleObject } 
        }));
    },
    
    // Wait for a module to be available
    waitFor(moduleName, callback) {
        if (this.modules[moduleName]) {
            // Module already loaded
            callback(this.modules[moduleName]);
        } else {
            // Add to pending callbacks
            if (!this.pendingCallbacks[moduleName]) {
                this.pendingCallbacks[moduleName] = [];
            }
            this.pendingCallbacks[moduleName].push(callback);
        }
    },
    
    // Wait for multiple modules
    waitForAll(moduleNames, callback) {
        let loadedCount = 0;
        const modules = {};
        
        const checkComplete = () => {
            loadedCount++;
            if (loadedCount === moduleNames.length) {
                callback(modules);
            }
        };
        
        moduleNames.forEach(name => {
            this.waitFor(name, (module) => {
                modules[name] = module;
                checkComplete();
            });
        });
    },
    
    // Get a module if it exists
    get(moduleName) {
        return this.modules[moduleName] || null;
    },
    
    // Check if module is loaded
    isLoaded(moduleName) {
        return !!this.modules[moduleName];
    },
    
    // List all loaded modules
    listLoaded() {
        return Object.keys(this.modules);
    }
};

// Helper function for safe module usage
window.useModule = (moduleName, callback) => {
    window.ModuleLoader.waitFor(moduleName, callback);
};

// Helper function for safe multi-module usage
window.useModules = (moduleNames, callback) => {
    window.ModuleLoader.waitForAll(moduleNames, callback);
};

console.log('ModuleLoader initialized');

