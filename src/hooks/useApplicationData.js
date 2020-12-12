// import React, { useState, useEffect } from "react";
// import axios from 'axios';

// export const [state, setState] = useState({
//   day: "Monday",
//   days: [],
//   appointments: {}
// })


// export const setDay = day => setState({ ...state, day });
// //Fetch and Set State
// useEffect(() => {
//   Promise.all([
//     axios.get(`http://localhost:8001/api/days`),
//     axios.get(`http://localhost:8001/api/appointments`),
//     axios.get(`http://localhost:8001/api/interviewers`)
//   ])
//     .then((all) => {
//       setState(prev => ({
//         ...prev,
//         days: all[0].data,
//         appointments: all[1].data,
//         interviewers: all[2].data
//       }))
//     });
// }, []);


// export default function bookInterview(id, interview) {
//   //New Appointment
//   const appointment = {
//     ...state.appointments[id],
//     interview: { ...interview }
//   };
//   //NEW STATE Appts: Add New Appt to copy of State
//   const appointments = {
//     ...state.appointments,
//     [id]: appointment
//   };

//   const promise = axios({
//     method: 'PUT',
//     url: `http://localhost:8000/api/appointments/${id}`,
//     data: appointment
//   })
//     .then((res) => {
//       console.log(res)
//       setState({ ...state, appointments });
//     })
//   //Retrun the above axios promies (built into Axios), within index, can add more .thens and catch
//   return promise
// }

// export function cancelInterview(id) {
//   // Change Appt to null
//   const appointment = {
//     ...state.appointments[id],
//     interview: null
//   };
//   //Make new copy of State w. cnx appt
//   const appointments = {
//     ...state.appointments,
//     [id]: appointment
//   };
//   //Update DB then State
//   const promise = axios({
//     method: 'DELETE',
//     url: `http://localhost:8000/api/appointments/${id}`,
//   })
//     .then((res) => {
//       console.log("RES", res)
//       setState({ ...state, appointments });
//     })
//   return promise
// }