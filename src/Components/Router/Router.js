import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { GoogleSignin } from "../GoogleSignin";
import { Home } from "../Home";

export function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <GoogleSignin />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
