const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  // Config functions
  readConfig: (defaultConfig) => ipcRenderer.invoke('readConfig', defaultConfig),
  saveConfig: (configJson) => ipcRenderer.invoke('saveConfig', configJson),
  // Version string
  getVersion: (version) => ipcRenderer.on('appVersion', version),
  // Peripheral window
  showPeriphConfig: (periphConfig) => ipcRenderer.invoke('showPeriphConfig', periphConfig),
  savePeriphConfig: (periphConfig) => ipcRenderer.on('savePeriphConfig', periphConfig),
  // Serial port open/close
  openSerialPort: (path) => ipcRenderer.invoke('openSerialPort', path),
  closeSerialPort: () => ipcRenderer.invoke('closeSerialPort'),
  // Serial port status
  serialPortStatus: (status) => ipcRenderer.on('serialPortStatus', status),
  // Midi Window
  showMidiConfig: (midiConfig) => ipcRenderer.invoke('showMidiConfig', midiConfig),
  saveMidiConfig: (midiConfig) => ipcRenderer.on('saveMidiConfig', midiConfig),
  // Midi Port
  openMidiPort: (port) => ipcRenderer.invoke('openMidiPort', port),
  // Midi Message
  gotMidiMessage: (message) => ipcRenderer.on('gotMidiMessage', message),
});
contextBridge.exposeInMainWorld('bcfyAPI', {
  login     : (u,p)      => ipcRenderer.invoke('bcfy-login',     u, p),
  liveCalls : paramsObj  => ipcRenderer.invoke('bcfy-liveCalls', paramsObj)
});
contextBridge.exposeInMainWorld('helpersAPI', {
  loadCSV: (filePath) => ipcRenderer.invoke('load-csv', filePath),
});
