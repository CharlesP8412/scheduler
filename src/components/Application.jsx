import React from "react";

import useApplicationData from "hooks/useApplicationData"

import DayList from "components/DayList";
import Appointment from "components/Appointment";
import "components/Application.scss";

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors"


export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

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
      cancelInterview={cancelInterview}
    />);
  })



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
