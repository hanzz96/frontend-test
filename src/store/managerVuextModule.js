export const manageVuexModule = (store, registeredModules, moduleName, load = true) => {
    console.log(registeredModules, moduleName, 'registeredModules')
    if (load) {
        if (!registeredModules[moduleName]) {
            store.registerModule(moduleName, registeredModules[moduleName]);
        }
    } else {
        if (registeredModules[moduleName]) {
            store.unregisterModule(moduleName);
            registeredModules[moduleName] = false;
        }
    }
}