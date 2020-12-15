import { useState, useEffect } from "react";
import axios from 'axios';

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  })

  // //Fetch and Set State
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


  //Functions to be passed down as Props;
  const setDay = day => setState({ ...state, day });

  const fetchUpdateSpots = () => {
    //Pulls new Spots # from DB and updates State
    axios.get(`http://localhost:8001/api/days`)
      .then((res) => {
        //Update Days with new Data
        setState((prev) => ({
          ...prev,
          days: res.data
        }))
      })
  }


  const bookInterview = function (id, interview) {
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
    return axios.put(`http://localhost:8000/api/appointments/${id}`, appointment)
      .then((res) => {
        // console.log("RES", res)
        setState({ ...state, appointments });
      }).then(() => fetchUpdateSpots());
      //Then carried on in index.js (Appointment Component) 

    //Mock Doesn't like axios broken down this way... Use above
    // const promise = axios({
    //   method: 'PUT',
    //   url: `http://localhost:8000/api/appointments/${id}`,
    //   data: appointment
    // })
    //   .then((res) => {
    //     setState({ ...state, appointments });
    //   })
    //   .then(() => fetchUpdateSpots());
    // //Retrun the above axios promies (built into Axios), within index, can add more .thens and catch
    // return promise
  }


  function cancelInterview(id) {
    // Change Appt to null
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    //Make new copy of State Appts w. cnx appt
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };



    return axios.delete(`http://localhost:8000/api/appointments/${id}`)
        .then((res) => {
          setState({ ...state, appointments })
        })
        .then(() => fetchUpdateSpots());



    // return axios({
    //   method: 'DELETE',
    //   url: `http://localhost:8000/api/appointments/${id}`,
    // })
    //   .then((res) => {
    //     setState({ ...state, appointments })
    //   })
    //   .then(() => fetchUpdateSpots());

    //Update DB then State
    // const promise = axios({
    //   method: 'DELETE',
    //   url: `http://localhost:8000/api/appointments/${id}`,
    // })
    //   .then((res) => {
    //     setState({ ...state, appointments })
    //   })
    //   .then(() => fetchUpdateSpots());
    // return promise
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}


//Set to DB - ReCalcs

// Fetch New Spots? Is it it Res? 