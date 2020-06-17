import React, { useReducer, useEffect, useContext, createContext } from "react";
import { reducer } from "./reducer";

const AuthContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

function useProvideAuth() {
  const [state, dispatch] = useReducer(reducer, {
    googleId: "",
    first_name: "",
    isLoading: true
  });

  const signIn = (submitBody) => {
    fetch(process.env.REACT_APP_API_URL + "/api/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(submitBody),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then((body) => {
        dispatch({
          type: "LOGIN",
          payload: body,
        });
        apiRequests({googleId: body.googleId});
        dispatch({
          type: "API_REQUEST"
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const apiRequests = (submitBody) => {
    fetch(process.env.REACT_APP_API_URL + "/api/apiRequests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submitBody),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then((body) => {
        console.log(body);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    state,
    signIn,
    apiRequests,
  };
}
