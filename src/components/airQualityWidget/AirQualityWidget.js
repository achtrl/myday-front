import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const weatherStyle = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "#FBFBFB",
    padding: 20,
    borderRadius: 15,
    margin: 40,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  section1: {
    margin: theme.spacing(3, 2),
  },
  section2: {
    margin: theme.spacing(2),
  },
  section3: {
    margin: theme.spacing(3, 1, 1),
  },
}));

export function AirQualityWidget() {
  const classes = weatherStyle();
  const [airQuality, setAirQuality] = useState(null);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/api/airQuality", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
      },
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((er) => {
        console.log(er);
      });
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.section1}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h5">
              Qualité de l'air
            </Typography>
          </Grid>
          <Grid item>
            <Typography gutterBottom variant="h4">
              --
            </Typography>
          </Grid>
        </Grid>
        <Typography color="textSecondary" variant="body2">
          Aujourd'hui, la qualité de l'air est
        </Typography>
      </div>
    </div>
  );
}
