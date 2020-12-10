import React from "react";
import InterviewerListItem from "./InterviewerListItem"
import "components/InterviewerList.scss"

export default function InterviewerList(props) {
  const { interviewers } = props
  console.log("PROPS LIST",props)
  const parsedInt = interviewers && interviewers.map(int => (
    <InterviewerListItem
      key={int.id}
      id = {int.id}
      name={int.name}
      avatar={int.avatar}
      selected={int.id === props.value}
      setInterviewer={() => {props.setInterviewer(int.id)}}
     /*  setInterviewer={() => {props.onChange(int.id)}} */
    /* setInterviewer={() =>{props.setInterviewer(int.id)}}  */
    />));

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{parsedInt}</ul>
    </section>

  );
}