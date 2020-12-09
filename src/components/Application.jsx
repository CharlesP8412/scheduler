import React, { useState, useEffect } from "react";

import axios from 'axios';
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import {getAppointmentsForDay} from "helpers/selectors"
import "components/Application.scss";


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  })
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const parsedAppts = dailyAppointments.map(appt => <Appointment key={appt.id} {...appt} />)
  // const parsedAppts = appointments.map(appt => <Appointment key={appt.id} {...appt} />)

  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));
  //Fetch and Set Days
  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:8001/api/days`),
      axios.get(`http://localhost:8001/api/appointments`),
      axios.get(`http://localhost:8001/api/interviewers`)
    ])
      .then((all) => {
        console.log(all[1].data)
        setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
      });
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
