import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import { useAuth } from "../../Auth/useAuth";
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyAlxisiJ5GgjtoqabOef6WSuTUOl2d4vDk");
Geocode.setLanguage("fr");

const mapStyles = {
  height: "100%",
  width: "100%",
  borderRadius: "1em",
};

const defaultCenter = {
  lat: 48.8534,
  lng: 2.3488,
};

export function TransportWidget() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [eventLatitude, setEventLatitude] = useState(0);
  const [eventLongitude, setEventLongitude] = useState(0);
  const [events, setEvents] = useState([]);
  const [directions, setDirections] = useState("");

  const auth = useAuth();

  async function getEvents() {
    return await fetch(
      process.env.REACT_APP_API_URL +
        "/api/events?googleId=" +
        auth.state.googleId,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((body) => {
        return body;
      })
      .catch((er) => {
        console.log(er);
      });
  }

  async function getDirections() {
    return await fetch(
      process.env.REACT_APP_API_URL +
        "/api/directions?googleId=" +
        auth.state.googleId,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((body) => {
        return body;
      })
      .catch((er) => {
        console.log(er);
      });
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });

    events.length > 0 &&
      Geocode.fromAddress(events[0].location).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          setEventLatitude(lat);
          setEventLongitude(lng);
        },
        (error) => {
          console.error(error);
        }
      );

    getEvents().then((data) => {
      const currentTime = new Date();
      const eventsData = [];
      for (const value of data) {
        const timeData = value.start.split(":");
        const time = new Date(
          currentTime.getFullYear(),
          currentTime.getMonth(),
          currentTime.getDate(),
          parseInt(timeData[0]),
          parseInt(timeData[1])
        );
        if (time > currentTime) {
          eventsData.push(value);
        }
      }
      setEvents(eventsData);
    });

    getDirections().then(setDirections);
  }, [latitude, longitude]);

  return (
    <div className="transportWidgetContainer">
      <div className="transportTitle">
        <h1
          style={{
            fontFamily: "Roboto",
            fontSize: "1.5em",
            fontWeight: "bold",
          }}
        >
          Trajet vers prochain événement
        </h1>
      </div>
      <div className="map">
        <LoadScript googleMapsApiKey="AIzaSyAlxisiJ5GgjtoqabOef6WSuTUOl2d4vDk">
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={longitude === 0 && latitude === 0 ? 1 : 14}
            center={
              eventLatitude !== 0 && eventLongitude !== 0
                ? {
                    lat: eventLatitude,
                    lng: eventLongitude,
                  }
                : longitude === 0 && latitude === 0
                ? defaultCenter
                : {
                    lat: latitude,
                    lng: longitude,
                  }
            }
          >
            {eventLatitude !== 0 && eventLongitude !== 0 ? (
              <Marker
                key={0}
                position={{
                  lat: eventLatitude,
                  lng: eventLongitude,
                }}
              />
            ) : latitude !== 0 && longitude !== 0 ? (
              <Marker
                key={0}
                position={{
                  lat: latitude,
                  lng: longitude,
                }}
              />
            ) : null}
          </GoogleMap>
        </LoadScript>
      </div>
      <div className="advices">{directions}.</div>
    </div>
  );
}
