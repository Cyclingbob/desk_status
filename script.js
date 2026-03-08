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

let weather_api_key = "f94b3d3a2560409cbb7192215213007";
let weather_api_location = "Wickford"

function updateWeather(){
    fetch("http://api.weatherapi.com/v1/current.json?key=" + weather_api_key + "&q=" + weather_api_location)
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })
}

// document.addEventListener('DOMContentLoaded', updateWeather);