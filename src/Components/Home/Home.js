import React, { useState, useEffect } from "react";
import * as queryString from "query-string";

export function Home() {
  const [code, setCode] = useState("");

  useEffect(() => {
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

  return (
    <div className="container">
      <h1>Home</h1>
    </div>
  );
}
