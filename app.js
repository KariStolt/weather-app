window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.darksky.net/forecast/b5767f4afa5dd3b6e839f47e314842a3/${lat},${long}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    const { temperature, summary, icon } = data.currently;
                    //Formula for celsius
                    let celsius = (temperature - 32) * (5/9);

                    //Set DOM Elements from the API
                    temperatureDegree.textContent = Math.floor(celsius);
                    temperatureSpan.textContent = "C";
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    console.log(data);

                    //Set icon
                    setIcons(icon, document.querySelector(".icon"));

                    //change temperature c -> f
                    temperatureSection.addEventListener("click", () => {
                        if (temperatureSpan.textContent === "C"){
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;
                        } else {
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = Math.floor(celsius);                          
                        }
                    });
                });
        });
    }
    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});