import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { useAuth } from "../../Auth/useAuth";
import sunSkyLogo from "../../Ressources/sunSky.jpg";
import rainSkyLogo from "../../Ressources/rainSky.jpg";
import snowSkyLogo from "../../Ressources/snwoSky.png";

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
          weatherData.description === "ensoleillé"
            ? `url(${sunSkyLogo})`
            : weatherData.description === "pluvieux"
            ? `url(${rainSkyLogo})`
            : weatherData.description === "enneigé"
            ? `url(${snowSkyLogo})`
            : "white",
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
          Nous vous conseillons de prendre {weatherData.outfit}.
        </Typography>
      </div>
    </div>
  );
}
