$( document ).ready(() => {
    console.log( "ready!" );

    const apiKey = "41605154c5306ad7e05764ebb986f240";

    $("#submit").on("click", (e) => {
        //prevent default
        e.preventDefault();
        //get the user input
        const cityName = $("#input-city").val();
        //load current weather
        currentWeather(cityName);
        //load forecast
        forecast(cityName);
        //create city button
        createCityBtn(cityName);
        //store in local storage

    });

    const currentWeather = (cityName) => {
        const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`;
        $.get(queryURL, (data) => {
            console.log("current weather: ",data);
            const template = `
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                <h5 class="card-title">
                    ${data.name} (${new Date().toLocaleDateString()})
                    <img src="http://openweathermap.org/img/${data.weather[0].icon}/10d@2x.png"/>
                </h5>
                <p class="card-text">Temp: ${data.main.temp}</p>
                <p class="card-text">Humidity: ${data.main.humidity}</p>
                <p class="card-text">Wind Speed: ${data.wind.speed}</p>
                </div>
            </div>
            `;

            $("#current").html(template);
        });
    };

    const forecast = (cityName) => {
        const queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${apiKey}`;
        $.get(queryURL, (data) => {
            console.log("forecast: ",data);
            
            let template = "";

            const filteredData = data.list.filter((datum) => datum.dt_txt.includes("12:00:00"));
            
            filteredData.forEach((datum) => {
                template += `
                    <div class="card" style="width: 18rem;">
                        <div class="card-body">
                        <h5 class="card-title">
                            ${datum.dt_txt}
                            <img src="http://openweathermap.org/img/${datum.weather[0].icon}/10d@2x.png"/>
                        </h5>
                        <p class="card-text">Temp: ${datum.main.temp}</p>
                        <p class="card-text">Humidity: ${datum.main.humidity}</p>
                        <p class="card-text">Wind Speed: ${datum.wind.speed}</p>
                        </div>
                    </div>
                `;
            });

            $("#forecast").html(template);
        });
    }

    const createCityBtn = (citName) => {
        const button = $('<button class="city-btn"></button>');
        button.text(citName)
        $("#btn-container").append(button);
    }

    $("#btn-container").on("click",".city-btn", (e) => {
        //get the text
        const cityName = $(e.target).val();
        currentWeather(cityName);
        forecast(cityName);
    });
});