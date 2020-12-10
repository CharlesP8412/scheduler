export function getAppointmentsForDay(state, day) {

  //Match input day to state dayInfo
  const filteredDay = state.days.filter(xDay => xDay.name === day);
  if (filteredDay.length === 0) {
    return [];
  }
  const allAppts = filteredDay[0].appointments

  // Filter day by Day to results
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
  interview.interviewer = allStaff[interview.interviewer];
  return interview

}