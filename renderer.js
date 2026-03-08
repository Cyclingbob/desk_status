function updateCI(){
fetch('https://api.carbonintensity.org.uk/intensity')
    .then(response => response.json())
    .then(data => {
        if(data && data.data instanceof Array && data.data.length > 0 && data.data[0].intensity){
            if(data.data[0].intensity.actual === null)
                data.data[0].intensity.actual = data.data[0].intensity.forecast;

            let intensity = data.data[0].intensity.actual;
            document.querySelector('.carbon-intensity-value').innerHTML = intensity;

            let max = 400;
            let percentage = Math.min(intensity / max, 1);

            // Hue from green (120) → red (0)
            let hue = 120 - (percentage * 120);
            let lightness = 45 + (1 - Math.abs(percentage - 0.5) * 2) * 15;


            let color = `hsl(${hue}, 100%, ${lightness}%)`;
            document.querySelector('.carbon-intensity-value').style.color = color;
        }
    })
}

document.addEventListener('DOMContentLoaded', updateCI);
setInterval(updateCI, 1 * 60 * 1000); // Update every 1 minute

document.getElementById('open-dev-tools').addEventListener('click', () => {
    tools.openDevTools();
})

document.getElementById('fullscreen').addEventListener('click', () => {
    tools.escapeFS();
})

document.getElementById('quit-app').addEventListener('click', () => {
    tools.quitApp();
})

async function updateWeather(){
    let current = await weather.getCurrent();
    if(current.temperature) document.querySelector('.temperature-container').innerHTML = current.temperature + '°C';
    if(current.condition) document.querySelector('.weather-condition').innerHTML = current.condition;
    if(current.image) document.querySelector('.icon-container img').src = current.image;
    if(current.location) document.querySelector('.weather-location').innerHTML = current.location;
    if(current.wind) document.getElementById('wind-condition').innerHTML = 'Wind: ' + current.wind + ' mph';
    if(current.humidity) document.getElementById('humidity-condition').innerHTML = 'Humidity: ' + current.humidity + '%';
    if(current.cloud) document.getElementById('cloud-condition').innerHTML = 'Cloud: ' + current.cloud + '%';

}

document.addEventListener('DOMContentLoaded', updateWeather)

// document.addEventListener('DOMContentLoaded', updateWeather);