import React, { useState, useEffect } from "react";

import axios from 'axios';
import DayList from "components/DayList";
import Appointment from "components/Appointment";

import "components/Application.scss";


const appointmentsData = [
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
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  })

const dailyAppointments = [];
const parsedAppts = dailyAppointments.map(appt => <Appointment key={appt.id} {...appt} />)
// const parsedAppts = appointments.map(appt => <Appointment key={appt.id} {...appt} />)
  
  const setDay = day => setState({ ...state, day });
  
  //Prev mess gets rid of linting warning of using setState in useEffects... somehow...
  // Previous items in object day and appts held in place w. prev?
  const setDays = days => setState(prev => ({ ...prev, days }));
  // const setDays = days => setState({ ...state, days });

  //Fetch and Set Days
  useEffect(() => {
    axios.get(`http://localhost:8001/api/days`)
      .then(response => { 
        setDays(response.data)
      })
      .catch(error => console.log(error))
  }, []);

  


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
          <DayList days={state.days} day={state.day} setDay={setDay} />
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
