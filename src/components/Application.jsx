import React, { useState, useEffect } from "react";

import axios from 'axios';
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview } from "helpers/selectors"
import "components/Application.scss";


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  })

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const schedule = dailyAppointments.map((appt) => {
    const interview = getInterview(state, appt.interview)
    return (<Appointment
      key={appt.id}
      id={appt.id}
      time={appt.time}
      interview={interview}
    />);
  })

  const setDay = day => setState({ ...state, day });

  //Fetch and Set State
  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:8001/api/days`),
      axios.get(`http://localhost:8001/api/appointments`),
      axios.get(`http://localhost:8001/api/interviewers`)
    ])
      .then((all) => {

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

        {schedule}
        <Appointment key="last" time="5pm" />

      </section>
    </main>
  );
}