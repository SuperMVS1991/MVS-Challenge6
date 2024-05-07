// global variables 
var searchButton = document.querySelector("#searchbutton");
var cities = [];
var card = document.querySelector("#forecast");

function load() {
    
    var city = JSON.parse(localStorage.getItem("city"));

   
    if (city) { 

        var line1 = document.querySelector("#line") ;
  line1.classList.remove("hide");  
  
  for (var i = 0; i < city.length; i++) {
    cities.push(city[i]);
}
console.log(cities);

        
        for (var i = 0; i < city.length; i++) {
            var button = document.createElement("button");
            button.textContent = city[i]; 
            button.classList.add("UI");
            button.addEventListener("click", function () {
                
                card.textContent = "";
                dataOne(this.textContent);
            });
            document.querySelector("#container").appendChild(button);
        }
    }
}

function search() {
    
    var city = document.querySelector("#searchoutput").value; 
    

    if (!cities.includes(city)) {
        console.log(cities)
    cities.push(city); 
      console.log(cities)
    }
    save(); 
    
    card.textContent = "";
    card.replaceChildren(); 
    dataOne(city);
}

function dataOne(city) { 

    

    
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + ",USA&APPID=cfe0b2658aec5af16bf8115cfd986eca";
    
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
        
            var lat = data.coord.lat;
            var lon = data.coord.lon; 

            dataTwo(lat, lon);
        });
}

function dataTwo(lat, lon) {
    var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,minutely&appid=cfe0b2658aec5af16bf8115cfd986eca";
    
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            
            mainWeather(data);
            fiveCards(data);
        });
} 


function mainWeather(data) {
    
    var icon = document.querySelector("#mainIcon");
    var temp = document.querySelector("#mainTemp"); 
    var wind = document.querySelector("#mainWind"); 
    var humidity = document.querySelector("#mainHumidity"); 
    var uv = document.querySelector("#mainUV");
    var url = data.current.weather[0].icon; 
    
    icon.src = "http://openweathermap.org/img/w/" + url + ".png";
    temp.textContent = data.daily[0].temp.day
    wind.textContent = data.current.wind_speed;
    humidity.textContent = data.current.humidity;
    uv.textContent = data.current.uvi;
}

function fiveCards(data) {
    
   
    
    for (var i = 1; i < 6; i++) {
        var div = document.createElement("div");
        div.setAttribute("class", "height2");

        var date = document.createElement("h5");
        date.textContent = new Date(data.daily[i].dt * 1000).toLocaleDateString();
        var icon = document.createElement("img");
        var temp = document.createElement("p");
        temp.textContent = "Temp: " + data.daily[i].temp.day;
        var wind = document.createElement("p");
        wind.textContent = "Wind: " + data.daily[i].wind_speed;
        var humidity = document.createElement("p");
        humidity.textContent = "Humidity: " + data.daily[i].humidity;
        var uv = document.createElement("p");
        uv.textContent = "UV: " + data.daily[i].uvi;
        var url = data.daily[i].weather[0].icon;
        icon.src = "http://openweathermap.org/img/w/" + url + ".png";

        div.appendChild(date);
        div.appendChild(icon);
        div.appendChild(temp);
        div.appendChild(wind);
        div.appendChild(humidity);
        div.appendChild(uv);
        card.appendChild(div);
    }
}
function save() {
    console.log("save"); 
    console.log(cities); 
    var jsonCities = JSON.stringify(cities);
    localStorage.setItem("city", jsonCities); 
    
}

load();
searchButton.addEventListener("click", search);
