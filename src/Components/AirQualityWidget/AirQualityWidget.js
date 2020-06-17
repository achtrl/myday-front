import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { useAuth } from '../../Auth/useAuth';

const weatherStyle = makeStyles((theme) => ({
}));

export function AirQualityWidget() {
  const classes = weatherStyle();
  const [airQualityData, setAirQualityData] = useState({});

  const auth = useAuth();

  async function getAirQuality() {
    return await fetch(process.env.REACT_APP_API_URL + "/api/airQuality", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json",
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
    getAirQuality().then((data) => {
      setAirQualityData(data)
    })
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.section1}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h6">
              Indice de qualité de l'air
            </Typography>
          </Grid>
          <Grid item>
            <Typography gutterBottom variant="h4">
              {airQualityData.value}
            </Typography>
          </Grid>
        </Grid>
        <Typography color="textSecondary" variant="body1">
          Aujourd'hui, la qualité de l'air est <b>{airQualityData.description}</b>.
        </Typography>
      </div>
    </div>


  );
}
