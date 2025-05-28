const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  exitApp: () => ipcRenderer.send('exit-app'),
  printReceipt: () => ipcRenderer.send('print-receipt')
});
