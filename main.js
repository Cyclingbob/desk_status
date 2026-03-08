const { app, BrowserWindow, ipcMain } = require('electron')
const config = require("./config.json")
const path = require("path")
const weather = require("./weather")

app.disableHardwareAcceleration();
app.commandLine.appendSwitch('disable-gpu');
app.commandLine.appendSwitch('disable-software-rasterizer');

var weather_cache = {
    temperature: -1,
    conditon: "",
    image: "",
    wind: -1,
    humidity: -1,
    cloud: -1,
    location: ""
}

function updateWeather(){
    weather.getWeatherCurrent(config.weather_api_location, config.weather_api_key).then(res => {
        if(res.temperature) weather_cache.temperature = res.temperature;
        if(res.condition) weather_cache.condition = res.condition;
        if(res.image) weather_cache.image = res.image;
        if(res.wind) weather_cache.wind = res.wind;
        if(res.humidity) weather_cache.humidity = res.humidity;
        if(res.cloud) weather_cache.cloud = res.cloud;
        if(res.location) weather_cache.location = res.location;
    }).catch(console.error)
}

setInterval(updateWeather, 30 * 60 * 1000);
updateWeather();

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1280,
        height: 720,
        // titleBarStyle: 'hidden',
        autoHideMenuBar: true,
        // transparent: true,
        frame: config.frame,
        fullscreen: config.fullscreen,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('index.html')
    // win.setMenuBarVisibility(false)
    if(config.open_dev_tools) win.webContents.openDevTools();
    return win;
}

app.whenReady().then(() => {
    let win = createWindow()
    
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

    ipcMain.handle('open-dev-tools', () => {
        if(win.webContents.isDevToolsOpened()) win.webContents.closeDevTools();
        else win.webContents.openDevTools();
        return;
    })

    ipcMain.handle('quit-app', () => {
        app.quit();
    })

    ipcMain.handle('escape-fs', () => {
        if(win.isFullScreen()) win.setFullScreen(false);
        else win.setFullScreen(true);
    })

    ipcMain.handle('get-weather-current', () => {
        return weather_cache;
    })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})