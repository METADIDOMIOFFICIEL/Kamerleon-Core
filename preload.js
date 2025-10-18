const {
    contextBridge,
    ipcRenderer
} = require('electron');

// Expose les actions de la barre personnalisée
contextBridge.exposeInMainWorld('electronAPI', {
    minimize: () => ipcRenderer.send('window-minimize'),
    maximize: () => ipcRenderer.send('window-maximize'),
    close: () => ipcRenderer.send('window-close'),
});
