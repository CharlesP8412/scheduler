import React, { useState, useEffect } from "react";

import axios from 'axios';
import DayList from "components/DayList";
import Appointment from "components/Appointment";

import "components/Application.scss";


const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
  },
  {
    id: 4,
    time: "3pm",
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Fred Mack",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
];


export default function Application(props) {
  const [day, setDay] = useState("Monday")
  const [days, setDays] = useState([]);

  //Fetch and Set Days
  useEffect(() => {
    axios.get(`http://localhost:8001/api/days`)
    .then(response => {
      setDays(response.data)
    })
    .catch(error => console.log(error))
  }, [])
  



  const parsedAppts = appointments.map(appt => <Appointment key={appt.id} {...appt} />)
  
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={days} day={day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />

      </section>
      <section className="schedule">

        {parsedAppts}
        <Appointment key="last" time="5pm" />

      </section>
    </main>
  );
}
