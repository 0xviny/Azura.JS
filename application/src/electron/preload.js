const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  sendPing: () => ipcRenderer.send("pong"),
});
