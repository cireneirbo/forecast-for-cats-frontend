import { useState, useEffect } from 'react';
import axios from 'axios';

function SunriseSunset() {
  
  const [ isProcessed, setIsProcessed ] = useState(false);

  const [ data, setData ] = useState("");

  const url = `https://api.sunrise-sunset.org/json?lat=27.498928&lng=-82.574821`;

  useEffect(() => {
    if(isProcessed == false) {
      axios.get(url)
      .then(res => {
        setData(res.data.results);
      }).catch(err => {
        console.log(err);
      });
      return setIsProcessed(true);
    }
  }, []);

  function convertToEasternStandardTime(gmtTime) {
    let gmtArr = gmtTime.split(":");
    gmtArr[0] -= 5; //subtract 5 hour difference GMT to EST

    if(gmtArr[0] > 0) {
      return gmtArr.join(":");
    } else {
      gmtArr[0] = 12 + gmtArr[0]; //if number goes under 1, subtract remainder from 12
      return gmtArr.join(":");
    }
  }

  if(data == "") {
    return (
      <div className="box-shadow">
        <p>Awaiting Sunrise and Sunset API data...</p>
      </div>
    );
  } else {
    return (
      <div>
      <table className="SunriseSunset1">
        <thead>
          <tr>
            <h3>Sunrise and Sunset</h3>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Sunrise</th>
            <td>{convertToEasternStandardTime(data.sunrise)} EST</td>
          </tr>
          <tr>
            <th>Sunset</th>
            <td>{convertToEasternStandardTime(data.sunset)} EST</td>
          </tr>
          <tr>
            <th>Day Length</th>
            <td>{data.day_length}</td>
          </tr>
          <tr>
            <th>Solar Noon</th>
            <td>{convertToEasternStandardTime(data.solar_noon)} EST</td>
          </tr>
        </tbody>
      </table>
      <table className="SunriseSunset2">
        <tbody>
          <tr>
            <th>Astronomical Twilight Begin</th>
            <td>{convertToEasternStandardTime(data.astronomical_twilight_begin)} EST</td>
          </tr>
          <tr>
            <th>Astronomical Twilight End</th>
            <td>{convertToEasternStandardTime(data.astronomical_twilight_end)} EST</td>
          </tr>
          <tr>
            <th>Civil Twilight Begin</th>
            <td>{convertToEasternStandardTime(data.civil_twilight_begin)} EST</td>
          </tr>
          <tr>
            <th>Civil Twilight End</th>
            <td>{convertToEasternStandardTime(data.civil_twilight_end)} EST</td>
          </tr>
          <tr>
            <th>Nautical Twilight Begin</th>
            <td>{convertToEasternStandardTime(data.nautical_twilight_begin)} EST</td>
          </tr>
          <tr>
            <th>Nautical Twilight End</th>
            <td>{convertToEasternStandardTime(data.nautical_twilight_end)} EST</td>
          </tr>
        </tbody>
      </table>
      </div>
    );
  }
}

export default SunriseSunset;
