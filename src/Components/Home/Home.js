import React, { useState, useEffect } from "react";
import * as queryString from "query-string";

export function Home() {
  const [code, setCode] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  useEffect(() => {
    const urlParams = queryString.parse(window.location.search);

    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });

    if (urlParams.code) {
      setCode(urlParams.code);
      if (code !== "" && longitude !== 0 && latitude !== 0) {
        console.log("REQUEST");
        fetch(process.env.REACT_APP_API_URL + "/api/login", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ 
            code: code,
            latitude: latitude,
            longitude: longitude 
          }),
        });
      }
    } else {
      console.log("No code received from Google !");
    }
  }, [code, latitude, longitude]);

  return (
    <div className="container">
      <h1>Home</h1>
    </div>
  );
}
