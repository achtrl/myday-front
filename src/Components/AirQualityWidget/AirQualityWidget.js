import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { useAuth } from "../../Auth/useAuth";
import airQualityLogo from "../../Ressources/airQualityLogo.png";

export function AirQualityWidget() {
  const [airQualityData, setAirQualityData] = useState({});

  const auth = useAuth();

  async function getAirQuality() {
    return await fetch(
      process.env.REACT_APP_API_URL +
        "/api/airQuality?googleId=" +
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
    getAirQuality().then((data) => {
      setAirQualityData(data);
      // setAirQualityData({
      //   value: 120,
      //   description: "mauvaise",
      // })
      // setAirQualityData({
      //   value: 77,
      //   description: "moyenne",
      // })
    });
  }, []);

  return (
    <div className="airQualityWidgetContainer" style={{
      backgroundColor: airQualityData.description === 'bonne' ? "#50C878" : airQualityData.description === 'moyenne' ? "#FADA5E" : airQualityData.description === 'mauvaise' ? "#FF033E" : 'white',
    }}>
      <div className="airQualityLogo">
        <img alt="logo" src={airQualityLogo}/>
      </div>
      <div className="airQualityContent">
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h6">
              Indice de qualité de l'air
            </Typography>
          </Grid>
          <Grid item>
            <Typography gutterBottom variant="h4" className="value">
              {airQualityData.value}
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="body1">
          Actuellement, la qualité de l'air est{" "}
          <b>{airQualityData.description}</b>.
        </Typography>
      </div>
    </div>
  );
}
