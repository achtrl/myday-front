import React, { useState, useEffect } from "react";
import "../../App.css";
import * as queryString from "query-string";
import { WeatherWidget } from "../WeatherWidget/WeatherWidget";
import { AirQualityWidget } from "../AirQualityWidget/AirQualityWidget";
import { useAuth } from "../../Auth/useAuth";
import { Loading } from "../Loading";

export function Home() {
  const [code, setCode] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const auth = useAuth();

  useEffect(() => {
    const urlParams = queryString.parse(window.location.search);

    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });

    if (urlParams.code) {
      setCode(urlParams.code);
      if (code !== "" && latitude !== 0 && longitude !== 0) {
        console.log("REQUEST");
        let submitBody = {
          code: code,
          latitude: latitude,
          longitude: longitude,
        };
        auth.signIn(submitBody);
      }
    } else {
      console.log("No code received from Google !");
    }
  }, [code, longitude, latitude]);

  return (
    <div className="container">
      {auth.state.isLoading ? <Loading/> : (
        <>
          <div id="Title">
            <h1>Bonjour</h1>
          </div>

          <div id="airQualityWidget">
            <AirQualityWidget />
          </div>

          <div id="weatherWidget">
            <WeatherWidget />
          </div>
        </>
      )}
    </div>
  );
}
