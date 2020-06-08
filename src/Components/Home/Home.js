import React, { useState, useEffect } from "react";
import * as queryString from "query-string";

export function Home() {
  const [code, setCode] = useState("");

  useEffect(() => {
    const urlParams = queryString.parse(window.location.search);

    if (urlParams.code) {
      setCode(urlParams.code);
      if (code !== "") {
        fetch("http://localhost:8080/google", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ code: code }),
        });
      }
    } else {
      console.log("No code received from Google !");
    }
  }, [code]);

  return (
    <div className="container">
      <h1>Home</h1>
    </div>
  );
}
