import React, { useState, useEffect } from "react";
import * as queryString from "query-string";
import { WeatherWidget } from "../WeatherWidget";
import { AirQualityWidget } from "../AirQualityWidget";
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

    const googleCookie = auth.getCookie("googleId");
    const nameCookie = auth.getCookie("name");
    console.log(nameCookie);
    if (googleCookie === "") {
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
    } else {
      auth.refreshPage(googleCookie, nameCookie);
    }
  }, [code, longitude, latitude]);

  return auth.state.isLoading ? (
    <Loading />
  ) : (
    <>
      <div className="container">
        <h1
          style={{
            fontFamily: "Pacifico, cursive",
            fontWeight: "normal",
            fontSize: "5em",
            margin: "0.25em",
          }}
        >
          {getWelcomeMessage() + auth.state.first_name + " !"}
        </h1>

        <div className="content">
          <div className="leftColumn">
            <AirQualityWidget />
            <WeatherWidget />
          </div>

          <div className="rightColumn"></div>
        </div>
      </div>
    </>
  );
}

const getWelcomeMessage = () => {
  let message = "";
  const hour = new Date().getHours();
  hour < 19 ? (message = "Bonjour ") : (message = "Bonsoir ");
  return message;
};
