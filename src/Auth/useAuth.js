import React, { useReducer, useContext, createContext } from "react";
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
        const d = new Date();
        d.setTime(d.getTime() + 7*60*60*1000);
        document.cookie = "googleId=" + body.googleId + ";expires=" + d.toUTCString();
        document.cookie = "name=" + body.first_name + ";expires=" + d.toUTCString();
        apiRequests({googleId: body.googleId});
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
        dispatch({
          type: "API_REQUEST"
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const refreshPage = (googleId, first_name) => {
    dispatch({
      type: "REFRESH",
      payload: {
        googleId: googleId,
        first_name: first_name
      },
    })
  }

  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  return {
    state,
    signIn,
    apiRequests,
    refreshPage,
    getCookie,
  };
}
