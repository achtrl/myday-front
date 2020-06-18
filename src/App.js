import React from "react";
import "./App.css";
import { Router } from "./Components/Router";
import { ProvideAuth } from "./Auth/useAuth";

function App() {
  return (
    <ProvideAuth>
      <div className="App">
        <Router />
      </div>
    </ProvideAuth>
  );
}

export default App;
