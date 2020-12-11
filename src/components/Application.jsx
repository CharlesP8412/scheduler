import React, { useState, useEffect } from "react";
import axios from 'axios';

import DayList from "components/DayList";
import Appointment from "components/Appointment";


import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors"

import "components/Application.scss";

export default function Application(props) {

  //================================ STATE ================================================
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  })

  //====================================Func===============================================
  function bookInterview(id, interview) {

    //New Appointment
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    //NEW STATE Appts: Add New Appt to copy of State
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    setState({ ...state, appointments });
    console.log(state)
  }


  const interviewersOfDay = getInterviewersForDay(state, state.day)
  const daysAppts = getAppointmentsForDay(state, state.day);

  const schedule = daysAppts.map((appt) => {

    const interview = getInterview(state, appt.interview)

    return (<Appointment
      key={appt.id}
      id={appt.id}
      time={appt.time}
      interview={interview}
      interviewers={interviewersOfDay}
      bookInterview={bookInterview}
    />);

  })

  const setDay = day => setState({ ...state, day });
  // useEffect(()=>{axios.get(`http://localhost:8001/api/appointments`)}).then((res)=>console.log("ISOLATED",res))},[]);
  //Fetch and Set State
  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:8001/api/days`),
      axios.get(`http://localhost:8001/api/appointments`),
      axios.get(`http://localhost:8001/api/interviewers`)
    ])
      .then((all) => {
        setState(prev => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        }))
      });
  }, []);


  //====================================Rendering===============================================
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
