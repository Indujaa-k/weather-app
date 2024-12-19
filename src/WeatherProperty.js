import React from 'react'
const WeatherProperty = ({icon,iconDescription,temperature,city,country,log,lat,windIcon,humidity,wind,humidityIcon,tempIcon,loading,cityNotFound,error}) => {

  return (
    <>
    <div className="image_display">
      <img src={icon} alt="weather icon" ></img>
      <div className="image_description">
        {iconDescription}
      </div>
    </div>
    <div className='display_container'>
      <div className='temp_display'>
      <img src={tempIcon} alt="thermometer icon"  className='tempicon'/>

      <div className="temp">{temperature}°C</div>
      </div>
      <div className="city">{city}</div>
      <div className="country">{country}</div>
    </div> 
    <div className="cord">
      <div>
      <span className='lat'>latitude</span>
      <span>{lat}</span>
      </div>
      <div>
      <span className='log'>longitude</span>
      <span>{log}</span>
      </div>  
    </div>
    <div className="data-container">
        <div className="element">
            <img src={humidityIcon} alt="humidity" className='icon'/>
            <div className="data">
            <div className="humidity-percentage">{humidity}%</div>
            <div className="text">humidity</div>
        </div>
        </div>
      <div className="element">
            <img src={windIcon} alt="humidity" className='icon'/>
            <div className="data">
            <div className="wind-percentage">{wind}km/hr</div>
            <div className="text">wind
            </div>
            </div>
      </div>
    </div>
    {loading && <div className="loading-message">Loading...</div>}
   {error &&<div className="error-message">{error}</div>   }
   {cityNotFound && <div className="city-not-found">City not found</div> } 
    </>
  )
}

export default WeatherProperty