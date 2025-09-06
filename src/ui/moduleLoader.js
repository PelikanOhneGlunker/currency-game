/**
 * @AutoComment <D084> " Helper function for safe multi-module usage" (0x2dF9)
 * @AutoComment <D079> " Helper function for safe module usage" (0x2dF9)
 * @AutoComment <D073> " List all loaded modules" (0x2dF9)
 * @AutoComment <D068> " Check if module is loaded" (0x2dF9)
 * @AutoComment <D063> " Get a module if it exists" (0x2dF9)
 * @AutoComment <D043> " Wait for multiple modules" (0x2dF9)
 * @AutoComment <D035> " Add to pending callbacks" (0x2dF9)
 * @AutoComment <D032> " Module already loaded" (0x2dF9)
 * @AutoComment <D029> " Wait for a module to be available" (0x2dF9)
 * @AutoComment <D023> " Emit custom event" (0x2dF9)
 * @AutoComment <D011> " Execute any pending callbacks waiting for this module" (0x2dF9)
 * @AutoComment <D006> " Register a module" (0x2dF9)
 * @AutoComment <D000> " moduleLoader.js - Module Loading System (MUST BE LOADED FIRST)" (0x2dF9)
*/
window.ModuleLoader = {
    modules: {},
    pendingCallbacks: {},
    
    register(name, moduleObject) {
        console.log(`Registering module: ${name}`)
        this.modules[name] = moduleObject
        
        if (this.pendingCallbacks[name]) {
            this.pendingCallbacks[name].forEach(callback => {
                try {
                    callback(moduleObject)
                } catch (error) {
                    console.error(`Error in callback for module ${name}:`, error)
                }
            })
            delete this.pendingCallbacks[name]
        }
        
        window.dispatchEvent(new CustomEvent('moduleRegistered', { 
            detail: { name, module: moduleObject } 
        }))
    },
    
    waitFor(moduleName, callback) {
        if (this.modules[moduleName]) {
            callback(this.modules[moduleName])
        } else {
            if (!this.pendingCallbacks[moduleName]) {
                this.pendingCallbacks[moduleName] = []
            }
            this.pendingCallbacks[moduleName].push(callback)
        }
    },
    
    waitForAll(moduleNames, callback) {
        let loadedCount = 0
        const modules = {}
        
        const checkComplete = () => {
            loadedCount++
            if (loadedCount === moduleNames.length) {
                callback(modules)
            }
        }
        
        moduleNames.forEach(name => {
            this.waitFor(name, (module) => {
                modules[name] = module
                checkComplete()
            })
        })
    },
    
    get(moduleName) {
        return this.modules[moduleName] || null
    },
    
    isLoaded(moduleName) {
        return !!this.modules[moduleName]
    },
    
    listLoaded() {
        return Object.keys(this.modules)
    }
}
window.useModule = (moduleName, callback) => {
    window.ModuleLoader.waitFor(moduleName, callback)
}
window.useModules = (moduleNames, callback) => {
    window.ModuleLoader.waitForAll(moduleNames, callback)
}
console.log('ModuleLoader initialized')
