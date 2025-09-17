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
