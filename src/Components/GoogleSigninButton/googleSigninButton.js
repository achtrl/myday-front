import React, { useState, useEffect } from "react";

import * as queryString from "query-string";

export function GoogleSigninButton() {
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");

  async function getGoogleSigninUrl() {
    return await fetch("http://localhost:8080/google", {
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

    const urlParams = queryString.parse(window.location.search);

    if (urlParams.error) {
      console.log(`An error occurred: ${urlParams.error}`);
    } else {
      setCode(urlParams.code);
      fetch("http://localhost:8080/google", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ code: code }),
      });
    }
  }, [code]);

  return <a href={url}>Sign in with Google</a>;
}
