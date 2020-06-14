import React from 'react';
import './App.css';
import {AirQualityWidget} from './Components/AirQualityWidget/AirQualityWidget';
// import {Title} from './Components/Title/Title';

function App() {
  return (
    <div className="App">

      <div id="Title">
        <h1>Ma page d'accueil</h1>
      </div>
      
      <div id="airQualityWidget">
        <AirQualityWidget/>
      </div>
      
     
    </div>
  );
}

export default App;
