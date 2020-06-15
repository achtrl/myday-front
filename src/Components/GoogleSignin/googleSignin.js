import React, { useState, useEffect } from "react";

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

  return <a href={url}>Sign in with Google</a>;
}
