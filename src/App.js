import React from 'react';
import './App.css';
import {AirQualityWidget} from './Components/AirQualityWidget/AirQualityWidget';
import {WeatherWidget} from './Components/WeatherWidget/WeatherWidget';


function App() {
  return (
    <div className="App">

      <div id="Title">
        <h1>Ma page d'accueil</h1>
      </div>
      
      <div id="airQualityWidget">
        <AirQualityWidget/>
      </div>

      <div id="weatherWidget">
        <WeatherWidget/>
      </div>
     
    </div>
  );
}

export default App;
