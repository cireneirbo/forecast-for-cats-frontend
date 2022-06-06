import { useState, useEffect } from 'react';
import axios from 'axios';

function Weather() {
  
  const [ isProcessed, setIsProcessed ] = useState(false);

  const [ data, setData ] = useState("");

  const backendURL = `https://forecast-for-cats-backend.herokuapp.com/weather`;

  useEffect(() => {
    if(isProcessed == false) {
      axios.get(backendURL)
      .then(res => {
        setData(res.data);
      }).catch(err => {
        console.log(err);
      });
      return setIsProcessed(true);
    }
  }, []);

  function convertKelvinToFahrenheit(kelvin) {
    return Math.round((1.8 * (kelvin - 273.15)) + 32);
  }


  console.log(data);

  if(data == "") {
    return (
      <div className="Weather">
        <p>Awaiting API data...</p>
      </div>
    );
  } else {
    return (
      <div>
        <table className="Weather">
          <thead>
            <h3>{data.title} for {data.weather_data.name}</h3>
          </thead>
          <tbody>
            <tr>
              <th>Current Temperature</th>
              <td>{convertKelvinToFahrenheit(data.weather_data.main.temp)} F</td>
            </tr>
            <tr>
              <th>Feels Like</th>
              <td>{convertKelvinToFahrenheit(data.weather_data.main.feels_like)} F</td>
            </tr>
            <tr>
              <th>Temperature Min-Max</th>
              <td>{convertKelvinToFahrenheit(data.weather_data.main.temp_min)} F - {convertKelvinToFahrenheit(data.weather_data.main.temp_max)} F</td>
            </tr>
            <tr>
              <th>Humidity</th>
              <td>{data.weather_data.main.humidity} %</td>
            </tr>
            <tr>
              <th>Barometric Pressure</th>
              <td>{data.weather_data.main.pressure} mb</td>
            </tr>
          </tbody>
        </table>

        <p className="CatTalk">Today will be {data.weather_data.weather[0].main}, with {data.weather_data.weather[0].description}!</p>

      </div>
    );
  }
}

export default Weather;
