document.addEventListener('DOMContentLoaded', () => {
    fetch('https://api.carbonintensity.org.uk/intensity')
    .then(response => response.json())
    .then(data => {
        if(data && data.data instanceof Array && data.data.length > 0 && data.data[0].intensity){
            if(data.data[0].intensity.actual === null) data.data[0].intensity.actual = data.data[0].intensity.forecast 
            document.querySelector('.carbon-intensity-value').innerHTML = data.data[0].intensity.actual;

            let max = 400;
            let intensity = data.data[0].intensity.actual;
            let percentage = Math.min(intensity / max, 1);

            let red = Math.round(percentage * 255 * 2);
            let green = Math.round((1 - percentage * 2) * 255);
            let color = `rgb(${red}, ${green}, 0)`;
            document.querySelector('.carbon-intensity-value').style.color = color;
        }
    })
});