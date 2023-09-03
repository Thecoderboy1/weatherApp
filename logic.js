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
    // function checkWeather() {
    //     // https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

    //     let city_name = document.getElementById("city-name");
    //     // now get the button 
    //     const getWeather = document.getElementById("getWeather")



    //     const API_Key = `579573d7907df7dfcba3ae7e84f66a8d`;
    //     const API_Url = `https://api.openweathermap.org/data/2.5/weather?&units=metric&q=`;

    //     async function fetchWeather(city) {

    //         let promise = new Promise((resolve,reject)=>{
    //             const response = await fetch(API_Url + city + `&appid=${API_Key}`);
    //             response.Onload = ()=>{
    //                 resolve(1)
    //             }
    //             response.onerror = ()=>{
    //                 reject(0)

    //             }
    //         });
    //         promise.then((value)=>{
    //             var data = await response.json();

    //         })
    //         promise.catch((error)=>{
    //             console.log("get some error")
    //         })
    //         // getting the country namee
    //         document.getElementById("location").innerHTML = data.name + `,${data.sys.country}`
    //             ;

    //         // getting the wind speed
    //         document.getElementById("wind-speed").innerHTML = data.wind.speed + ` km/h`;

    //         // now get the temp 
    //         document.getElementById("temprature").innerHTML = Math.round(data.main.temp) + `&deg;C`;

    //         //now get the humidity
    //         document.getElementById("humidity-text").innerHTML = data.main.humidity + `%`;

    //         // now get the cloud info 
    //         document.getElementById("cloud-info").innerHTML = data.weather[0].main;

    //         if (data.weather[0].main == "Clouds") {

    //             const weather_icon = document.getElementById("weather-pic");
    //             weather_icon.src = "images/clouds.png";
    //         }
    //         else if (data.weather[0].main == "Clear") {
    //             const weather_icon = document.getElementById("weather-pic");
    //             weather_icon.src = "images/clear.png";
    //         }
    //         else if (data.weather[0].main == "Rain") {
    //             const weather_icon = document.getElementById("weather-pic");
    //             weather_icon.src = "images/rain.png";
    //         }
    //         else if (data.weather[0].main == "Drizzle") {
    //             const weather_icon = document.getElementById("weather-pic");
    //             weather_icon.src = "images/drizzle.png";
    //         }
    //         else if (data.weather[0].main == "Mist") {
    //             const weather_icon = document.getElementById("weather-pic");
    //             weather_icon.src = "images/mist.png";
    //         }
    //     }
    //     getWeather.addEventListener("click", (event) => {
    //         fetchWeather(city_name.value);
    //         // showOutput();
    //     });
    // }
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
                        weatherIcon.src = "images/clouds.png";
                        break;
                    case "Clear":
                        weatherIcon.src = "images/clear.png";
                        break;
                    case "Rain":
                        weatherIcon.src = "images/rain.png";
                        break;
                    case "Drizzle":
                        weatherIcon.src = "images/drizzle.png";
                        break;
                    case "Mist":
                        weatherIcon.src = "images/mist.png";
                        break;
                    case "Haze":
                        weatherIcon.src = "images/haze.png";
                        break;
                    default:
                        weatherIcon.src = "images/clear.png";
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