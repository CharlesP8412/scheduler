import React, { useState } from "react";
import InterviewerList from "../InterviewerList"
import Button from "../Button"

export default function Form(props) {
  const { interviewer } = props
  //Interviewer ID
  const [currInterviewer, setInterviewer] = useState(interviewer? interviewer.id: null);
  //Input Text
  const [currName, setName] = useState(props.student || "");




  const handleInterviewer = (intId) => {
    // console.log("@HANDLER ID", intId)
    setInterviewer(intId)
  }

  //Updates currText for useState
  const handleInput = (event) => {
    setName(event.target.value)
  }

  const reset = () => {
    setName("");
    setInterviewer(null);
  }

  const cancel = () => {
    reset();
    props.onCancel();
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={currName}
            onChange={handleInput}
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={currInterviewer}
          setInterviewer={handleInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => props.onSave(currName, currInterviewer)}>Save</Button>
        </section>
      </section>
    </main>

  );
}
