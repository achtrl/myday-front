import React, { useState, useEffect } from "react";
import button from "../../Ressources/btn_google_signin_light_normal.png";

export function GoogleSignin() {
  const [url, setUrl] = useState("");

  async function getGoogleSigninUrl() {
    return await fetch(process.env.REACT_APP_API_URL + "/api/login", {
      method: "GET",
    })
      .then((response) => {
        return response.text();
      })
      .then((body) => {
        return body;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getGoogleSigninUrl().then(setUrl);
  }, []);

  return (
    <div className="signin">
      <h1
        style={{
          fontFamily: "Pacifico, cursive",
          fontWeight: "normal",
          fontSize: "5em",
          margin: "0.25em",
        }}
      >
        MyDay
      </h1>
      <a href={url}>
        <img src={button} alt="Google Signin" />
      </a>
    </div>
  );
}
