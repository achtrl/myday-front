import React, { useState, useEffect } from "react";
import { useAuth } from "../../Auth/useAuth";
import { Event } from "./events";

export function EventsWidget() {
  const [events, setEvents] = useState([{}]);

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

  useEffect(() => {
    getEvents().then((data) => {
      const currentTime = new Date();
      const eventsData = [];
      for (const value of data) {
        const timeData = value.start.split(':');
        const time = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), parseInt(timeData[0]), parseInt(timeData[1]));
        if (time > currentTime) {
          eventsData.push(value);
        }
      }
      setEvents(eventsData);
    });
  }, []);

  return (
    <div className="eventsWidgetContainer">
      <div className="eventsTitle">
        <h1 style={{
            fontFamily: 'Roboto',
        }}>Événements à venir</h1>
      </div>
      <div className="eventsList">
        {events.length > 0 ? events.map((event, index) => <Event key={index.toString()} event={event} />) : <Event event={{
            summary: " ",
            start: "",
            location: "Pas d'événement à venir"
        }} />}
      </div>
    </div>
  );
}

