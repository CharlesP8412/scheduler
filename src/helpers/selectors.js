export function getAppointmentsForDay(state, day) {

  //Match input day to state dayInfo
  const filteredDay = state.days.filter(xDay => xDay.name === day);
  if (filteredDay.length === 0) {
    return [];
  }
  //Can also use .find (for first match not in array)
  const allAppts = filteredDay[0].appointments

  // Days Appts to results
  const results = allAppts.map((apptId) => {
    return state.appointments[apptId]
  })

  return results;
}



export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  //Get Interviewer ID interview.interviewer //2 (Interviewer ID)  >> Match to state.interviewers...
  const allStaff = state.interviewers
  const staffId = interview.interviewer
  const staffDetails = allStaff[staffId];
  const fullInterview = {...interview, interviewer: staffDetails}
  return fullInterview

}

export function getInterviewersForDay(state, day) {

  //Match input day to state dayInfo
  const filteredDay = state.days.find(xDay => xDay.name === day);
  if (!filteredDay || state.days.length === 0) {
    return [];
  }
  const allInts = filteredDay.interviewers
  const results = allInts.map((intId) => {
    return state.interviewers[intId]
  })
  return results;
}