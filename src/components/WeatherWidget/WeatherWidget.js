import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';

const weatherStyle = makeStyles((theme) => ({
}));

export function WeatherWidget() {
  const classes = weatherStyle();
  const [weatherData, setweatherData] = useState({});

  async function getWeather(){
    return await fetch(process.env.REACT_APP_API_URL + "/api/weather", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((body) => {
        return body
      })
      .catch((er) => {
        console.log(er);
      });
  }

  useEffect(() => {
    getWeather().then((data) => {
      console.log(data)
      setweatherData(data)
    })
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.section1}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h6">
              Température extérieur 
            </Typography>
          </Grid>
          <Grid item>
            <Typography gutterBottom variant="h4">
               {weatherData.temperature}°C
            </Typography>
          </Grid>
        </Grid>
        <Typography color="textSecondary" variant="body1">
          Aujourd'hui, le temps est <b>{weatherData.description}</b>.
        </Typography>
        <Typography color="textSecondary" variant="body1">
          Nous vous conseillons de prendre {weatherData.outfit}.
        </Typography>
      </div>
    </div>

    
  );
}


