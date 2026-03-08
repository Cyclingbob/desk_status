const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron
})

contextBridge.exposeInMainWorld('tools', {
    openDevTools: () => ipcRenderer.invoke('open-dev-tools'),
    quitApp: () => ipcRenderer.invoke('quit-app'),
    escapeFS: () => ipcRenderer.invoke('escape-fs')
})

contextBridge.exposeInMainWorld('weather', {
    getCurrent: () => ipcRenderer.invoke('get-weather-current')
})