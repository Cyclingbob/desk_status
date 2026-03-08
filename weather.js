const fetch = require("node-fetch")

const weather_codes = require("./weather_codes.json")

function getWeatherCurrent(location, key){
    return new Promise((resolve, reject) => {
        fetch("http://api.weatherapi.com/v1/current.json?key=" + key + "&q=" + location)
        .then(response => response.json())
        .then(data => {
            return {
                temperature: data.current.temp_c,
                condition: data.current.condition.text,
                image: data.current.is_day === 0 ? weather_codes[data.current.condition.code].image_night : weather_codes[data.current.condition.code].image_day,
                wind: data.current.wind_mph,
                humidity: data.current.humidity,
                cloud: data.current.cloud,
                location: data.location.name + ", " + data.location.region
            }
        }).catch(reject)
        .then(resolve);
    })
}

module.exports = { getWeatherCurrent }