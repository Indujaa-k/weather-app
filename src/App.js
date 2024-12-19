import { FcSearch } from "react-icons/fc";

import clearIcon from "./images/clear.png";
import ntClearIcon from "./images/nt_clear.png";
import fewCloudsIcon from "./images/fewclouds.png";
import scatteredCloudIcon from "./images/scatteredcloud.png";
import brokenCloudIcon from "./images/brokencloud.png";
import rainIcon from "./images/rain.png";
import thunderStormIcon from "./images/thunderstorm.png";
import snowIcon from "./images/snow.png";
import fogIcon from "./images/fog.png";
import windIcon from "./images/wind.png"
import humidityIcon from "./images/humidity.png"
import tempIcon from "./images/temp.png";
import WeatherProperty from "./WeatherProperty";
import { useEffect, useState } from "react";

function App() {
  let apiKey="8ee95aa04b876917c736efec5aeefc55";
  const[icon,setIcon]=useState(clearIcon)
  const[iconDescription,setIconDescription]=useState("rainy")
  const [text,setText]=useState("Coimbatore")
  const[cityNotFound,setCityNotFound]=useState(false)
  const[loading,setLoading]=useState(false)
  const[temperature,setTemperature]=useState(0)
  const[city,setCity]=useState("")
  const [country,setCountry]=useState("")
  const [log,setLog]=useState(0);
  const [lat,setLat]=useState(0);
  const [humidity,setHumidity]=useState(0);
  const [wind,setWind]=useState(0);
  const[error,setError]=useState(null);

  const weatherIconMap = {
    "01d": clearIcon,
    "01n": ntClearIcon,
    "02d": fewCloudsIcon,
    "02n": fewCloudsIcon,
    "03d": scatteredCloudIcon,
    "03n": scatteredCloudIcon,
    "04d": brokenCloudIcon,
    "04n": brokenCloudIcon,
    "09d": rainIcon,
    "09n": rainIcon,
    "10d": rainIcon,
    "10n": rainIcon,
    "11d": thunderStormIcon,
    "11n": thunderStormIcon,
    "13d": snowIcon,
    "13n": snowIcon,
    "50d": fogIcon,
    "50n": fogIcon
  };
  

  const search=async()=>{
    
    setLoading(true);
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apiKey}&units=metric`;
  
  
  try{
    let res = await fetch(url);
    let data = await res.json();
    //console.log(data);
    if(data.cod==="404"){
      console.log("City not found")
      setCityNotFound(true)
      setLoading(false)
      return;
    }
    setHumidity(data.main.humidity)
    setWind(data.wind.speed)
    setTemperature(Math.floor(data.main.temp))
    setCity(data.name)
    setCountry(data.sys.country)
    setLog(data.coord.lon)
    setLat(data.coord.lat)
    const weatherIconCode=data.weather[0].icon;
    setIconDescription(data.weather[0].description)
    setIcon(weatherIconMap[weatherIconCode]|| clearIcon)
    setCityNotFound(false)
    
  }catch(error){
    console.error("An error occured:",error.message);
    setError("An error occur while fetching data...")
    
  }finally{
     setLoading(false);
  }}

  const onKeyEnter=(e)=>{
    if(e.key==="Enter"){
      search();
    }
    }
useEffect(function(){
  search();
},[])
  return ( 
    <div className="container">
       <div className="search_container">
       <div className="search_box">
          <input
            className="search_input"
            placeholder="Enter the city name"
            autoFocus
            required
            value={text}
            onChange={(e)=>setText(e.target.value)}
            onKeyDown={onKeyEnter}
          />
          <FcSearch
          className="search_icon"
          onClick={()=>search()}
          />
        </div>
       <WeatherProperty
        icon={icon}
        iconDescription={iconDescription}
        temperature={temperature}
        city={city}
        country={country}
        log={log}
        lat={lat}
        windIcon={windIcon}
        humidityIcon={humidityIcon}
        wind={wind}
        humidity={humidity}
        loading={loading}
        cityNotFound={cityNotFound}
        error={error}
        tempIcon={tempIcon}
        />
      </div>
        
    </div>
  );
}

export default App;
