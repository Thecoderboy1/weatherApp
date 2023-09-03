document.addEventListener("DOMContentLoaded", function () {
    function showOutput() {
        let city_name = document.getElementById("city-name");
        let outputOverlay = document.getElementById("outputOverlay");
        let backButton = document.getElementById("back-btn");

        outputOverlay.style.display = "flex";
        outputOverlay.classList.add("slide-right");

        backButton.addEventListener("click", (event) => {
            outputOverlay.classList.remove("slide-right")
            outputOverlay.classList.add("slide-left")
            setTimeout(() => {
                outputOverlay.classList.remove("slide-left")
                outputOverlay.style.display = "none"
            }, 500);
            city_name.value = "";
        })
    }
    function showError(msg) {
        let city_name = document.getElementById("city-name");
        let errorOverlay = document.getElementById("error-box");
        let errorMsg = document.getElementById("err-txt");
        let closeBtn = document.getElementById("close-btn");

        errorMsg.innerText = msg;
        errorOverlay.style.display = "flex";
        errorOverlay.classList.add("slide-right");


        // now set the event listner
        closeBtn.addEventListener("click", (event) => {
            errorOverlay.classList.remove("slide-right")
            errorOverlay.classList.add("slide-left")
            setTimeout(() => {
                errorOverlay.classList.remove("slide-left")
                errorOverlay.style.display = "none"
            }, 500);
            city_name.value = "";
        })
    }
    function checkWeather() {
        const cityInput = document.getElementById("city-name");
        const getWeatherButton = document.getElementById("getWeather");

        const API_Key = "579573d7907df7dfcba3ae7e84f66a8d";
        const API_Url = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

        async function fetchWeather(city) {
            try {
                const response = await fetch(API_Url + city + `&appid=${API_Key}`);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();

                // Update the DOM with weather data
                document.getElementById("location").innerHTML = data.name + `,${data.sys.country}`;

                // getting the wind speed
                document.getElementById("wind-speed").innerHTML = data.wind.speed + ` km/h`;

                // now get the temp 
                document.getElementById("temprature").innerHTML = Math.round(data.main.temp) + `&deg;C`;

                //now get the humidity
                document.getElementById("humidity-text").innerHTML = data.main.humidity + `%`;

                // now get the cloud info 
                document.getElementById("cloud-info").innerHTML = data.weather[0].main;

                // Set the weather icon based on the weather description
                const weatherIcon = document.getElementById("weather-pic");
                switch (data.weather[0].main) {
                    case "Clouds":
                        weatherIcon.src = "clouds.png";
                        break;
                    case "Clear":
                        weatherIcon.src = "clear.png";
                        break;
                    case "Rain":
                        weatherIcon.src = "rain.png";
                        break;
                    case "Drizzle":
                        weatherIcon.src = "drizzle.png";
                        break;
                    case "Mist":
                        weatherIcon.src = "mist.png";
                        break;
                    case "Haze":
                        weatherIcon.src = "haze.png";
                        break;
                    default:
                        weatherIcon.src = "clear.png";
                }
                // if users input the right info its show the output
                setTimeout(() => {
                    showOutput();
                }, 500)

            } catch (error) {
                console.error("Error fetching weather data:", error);
                showError("invalid city name")

                // Display an error message to the user or handle it as needed
            }
        }

        getWeatherButton.addEventListener("click", (event) => {
            const cityName = cityInput.value.trim(); // Remove leading/trailing spaces
            if (cityName.length > 0) {
                fetchWeather(cityName);
            } else {
                // console.error("Please enter a valid city name.");
                showError("invalid city name")
            }
        });
    }

    checkWeather();
});
