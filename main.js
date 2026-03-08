const { app, BrowserWindow } = require('electron')

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
        // frame: false,
    })

    win.loadFile('index.html')
    // win.setMenuBarVisibility(false)
    win.webContents.openDevTools()
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