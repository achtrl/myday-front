import React from "react";

export const Event = ({ event }) => {
  return (
    <div className="event">
      <div className="title" style={{
          fontFamily: 'Balsamiq Sans, cursive'
      }}>{event.summary}</div>
      <div className="infos">
        <span style={{
            fontSize: "2.5em",
            fontFamily: 'Roboto',
        }}>{event.start}</span>
        <span style={{
            fontFamily: 'Balsamiq Sans, cursive',
            fontSize: "1em",
            textAlign: "center"
        }}>{event.location}</span>
      </div>
    </div>
  );
};
