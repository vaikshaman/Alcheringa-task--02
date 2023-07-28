const api_key = "&appid=2e1c8094edceb4c0845161199bdc2073";
const url = "https://api.openweathermap.org/data/2.5/weather?";
const icon = "http://openweathermap.org/img/wn/";

start = () => {
  alert("Allow location to display weather in your area");
  getLocationPermission()
    .then((position) => {
     
      const { latitude, longitude } = position.coords;
      fetchWeatherDataByCoordinates(latitude, longitude);
    })
    .catch(() => {
     
      alert("Location permission is required to display weather in your area.");
    });
};


getLocationPermission = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
     
      navigator.geolocation.getCurrentPosition(resolve, reject);
    } else {
  
      reject();
    }
  });
};



fetchWeatherDataByCoordinates = (latitude, longitude) => {
    const final_url = `${url}lat=${latitude}&lon=${longitude}${api_key}`;
    fetch(final_url)
      .then((response) => response.json())
      .then((result) => {
        if (result.cod === "404") {
          document.getElementById("main-content").style.display = "none";
          document.getElementById("error").style.zIndex = 1;
        } else {
          document.getElementById("error").style.zIndex = -1;
          document.getElementById("main-content").style.display = "block";
          document.querySelector(".details").style.display = "block";
        setCity(result.name);
          setDate();
          setIcon(result.weather[0].icon);
          setTempC(result.main.temp);
          if (result.weather[0].main.toLowerCase() === result.weather[0].description.toLowerCase()) {
            setMain(result.weather[0].main);
            setDesc("");
          } else {
            setMain(result.weather[0].main);
            setDesc(result.weather[0].description);
          }
          
          setHumidity(result.main.humidity);
          setPressure(result.main.pressure);
  
       
          setWindS(result.wind.speed);
          setWindD(result.wind.deg);
          
      
          setVisibility(result.visibility);
          setUVIndex(result.uvi);
          setPrecipitation(result.clouds.all);

        
        }
      });
};



setDate = () => {
    const currentDate = new Date();
    const options = { weekday: 'short', day: 'numeric', month: 'long' };
    const formattedDate = currentDate.toLocaleDateString(undefined, options);
    document.getElementById("date").innerHTML = formattedDate
  };
  




  
  
  setVisibility = (elem) => {
    document.getElementById("visibility").innerHTML = "Visibility: " + elem + " meters";
  }
  
  setUVIndex = (elem) => {
    document.getElementById("uv-index").innerHTML = "UV Index: " + elem;
  }
  
  setPrecipitation = (elem) => {
    document.getElementById("precipitation").innerHTML = "Precipitation: " + elem + "%";
  }
  
  

setCity = (elem) => {
  document.getElementById("city").innerHTML = elem;
}
setIcon  = (elem) => {
  document.getElementById("icon").src = icon + elem + ".png";
}
setTempC = (elem) => {
    let tempc = Math.floor(elem - 273);
    document.getElementById("cel").innerHTML = tempc + "°";
  }
  
setTempF = (elem) => {
  let tempf = Math.floor((elem-273) * 9/5);
  document.getElementById("far").innerHTML = tempf + " F"
}
setMain = (elem) => {
  document.getElementById("main").innerHTML = elem;
}
setDesc = (elem) => {
  document.getElementById("description").innerHTML = elem;
}

setCountry =(elem) => {
  document.getElementById("country").innerHTML = "Country Code: " + elem;
}
setHumidity =(elem) => {
  document.getElementById("humidity").innerHTML = "Humidity: " + elem;
}
setPressure =(elem) => {
  document.getElementById("pressure").innerHTML = "Wind Pressure: " + elem;
}
setWindS =(elem) => {
  document.getElementById("wind-speed").innerHTML = "Wind Speed: " + elem;
}
setWindD = (elem) => {
    const windDirection = getWindDirection(elem);
    document.getElementById("wind-direction").innerHTML = "Wind Direction: " + windDirection;
  }

  getWindDirection = (degree) => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round((degree % 360) / 45);
  return directions[index % 8];
}
setTempMax = (elem) => {
  document.getElementById("temp-max").innerHTML = "Temp. Max: "+ Math.floor((elem-273)) + " C  /  "+ Math.floor((elem-273) * 9/5) + " F";
}
setTempMin = (elem) => {
   
    document.getElementById("temp-min").innerHTML = "Temp. Min: " + Math.floor((elem - 273)) + " C  /  " + Math.floor((elem - 273) * 9/5) + " F";
  }


setWeatherIcons = (weatherParameter, iconPath) => {
    const iconElement = document.createElement("img");
    iconElement.src = iconPath;
    iconElement.alt = weatherParameter + " Icon";
    return iconElement;
  };
  
 
  setHumidity = (elem) => {
    const humidityElement = document.getElementById("humidity");
    humidityElement.innerHTML = "Humidity: " + elem + "%";
    const iconElement = setWeatherIcons("humidity", "humidity.jpg ");
    humidityElement.insertBefore(iconElement, humidityElement.firstChild);
  };
  
  
  setPressure = (elem) => {
    const pressureElement = document.getElementById("pressure");
    pressureElement.innerHTML = "Wind Pressure: " + elem + "mb";
    const iconElement = setWeatherIcons("pressure", "pressure.png");
    pressureElement.insertBefore(iconElement, pressureElement.firstChild);
  };
  
  
  setWindS = (elem) => {
    const windSpeedElement = document.getElementById("wind-speed");
    windSpeedElement.innerHTML = "Wind Speed: " + elem + "kph";
    const iconElement = setWeatherIcons("wind-speed", "ws.png");
    windSpeedElement.insertBefore(iconElement, windSpeedElement.firstChild);
  };

  setWindD = (elem) => {
    const windDirectionElement = document.getElementById("wind-direction");
    const windDirection = getWindDirection(elem);
    windDirectionElement.innerHTML = "Wind Direction: " + windDirection ;
    const iconElement = setWeatherIcons("wind-direction", "wd.png");
    windDirectionElement.insertBefore(iconElement, windDirectionElement.firstChild);
  };
  
 
  setPrecipitation = (elem) => {
    const precipitationElement = document.getElementById("precipitation");
    precipitationElement.innerHTML = "Precipitation: " + elem + "mm";
    const iconElement = setWeatherIcons("precipitation", "p.jpg");
    precipitationElement.insertBefore(iconElement, precipitationElement.firstChild);
  };
  
  
  setVisibility = (elem) => {
    const visibilityElement = document.getElementById("visibility");
    visibilityElement.innerHTML = "Visibility: " + elem + "km";
    const iconElement = setWeatherIcons("visibility", "v.png");
    visibilityElement.insertBefore(iconElement, visibilityElement.firstChild);
  };
  
  
  setUVIndex = (elem) => {
    const uvIndexElement = document.getElementById("uv-index");
    uvIndexElement.innerHTML = "UV Index: " + elem;
    const iconElement = setWeatherIcons("uv-index", "uv.png");
    uvIndexElement.insertBefore(iconElement, uvIndexElement.firstChild);
  };
  
  
  
        
  
  