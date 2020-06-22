import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { useAuth } from "../../Auth/useAuth";
import sunSkyLogo from "../../Ressources/sunSky.jpg";
import rainSkyLogo from "../../Ressources/rainSky.png";
import snowSkyLogo from "../../Ressources/snowSky.png";
import thunderSkyLogo from "../../Ressources/thunderSky.jpg";
import cloudSkyLogo from "../../Ressources/cloudSky.jpg";

export function WeatherWidget() {
  const [weatherData, setweatherData] = useState({});

  const auth = useAuth();

  async function getWeather() {
    return await fetch(
      process.env.REACT_APP_API_URL +
        "/api/weather?googleId=" +
        auth.state.googleId,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((body) => {
        return body;
      })
      .catch((er) => {
        console.log(er);
      });
  }

  useEffect(() => {
    getWeather().then((data) => {
      setweatherData(data);
    });
  }, []);

  return (
    <div
      className="weatherWidgetContainer"
      style={{
        backgroundImage:
          weatherData.description === "dégagé"
            ? `url(${sunSkyLogo})`
            : (weatherData.description === "pluvieux" || weatherData.description === "bruineux") 
            ? `url(${rainSkyLogo})`
            : weatherData.description === "enneigé"
            ? `url(${snowSkyLogo})`
            : weatherData.description === "orageux"
            ? `url(${thunderSkyLogo})`
            : weatherData.description === "nuageux"
            ? `url(${cloudSkyLogo})`
            : "white"
      }}
    >
      <div className="weatherContent">
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h4">
              Température
            </Typography>
          </Grid>
          <Grid item>
            <Typography gutterBottom variant="h4">
              {weatherData.temperature}°C
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="body1">
          Actuellement, le temps est <b>{weatherData.description}</b>.
        </Typography>
        <Typography variant="body1">
          {weatherData.prediction}
        </Typography>
        <Typography variant="body1">
           {weatherData.outfit}
        </Typography>
      </div>
    </div>
  );
}
