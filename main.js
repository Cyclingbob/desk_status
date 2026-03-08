const { app, BrowserWindow } = require('electron')
const config = require("./config.json")

app.disableHardwareAcceleration();
app.commandLine.appendSwitch('disable-gpu');
app.commandLine.appendSwitch('disable-software-rasterizer');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1280,
        height: 720,
        // titleBarStyle: 'hidden',
        autoHideMenuBar: true,
        // transparent: true,
        frame: config.frame,
        fullscreen: config.fullscreen
    })

    win.loadFile('index.html')
    // win.setMenuBarVisibility(false)
    if(config.open_dev_tools) win.webContents.openDevTools()
}

app.whenReady().then(() => {
    createWindow()
    
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})