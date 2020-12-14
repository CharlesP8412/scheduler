import React, { useState } from "react";
import InterviewerList from "../InterviewerList"
import Button from "../Button"

export default function Form(props) {
  const { interviewer } = props
  //Interviewer ID
  const [currInterviewer, setInterviewer] = useState(interviewer ? interviewer.id : null);
  //Input Text
  const [currName, setName] = useState(props.student || "");
  const [error, setError] = useState("");




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

  const validate = () => {
    if (currName === "") {
      setError("Student name cannot be blank");
      return;
    }

    props.onSave(currName, currInterviewer);
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
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          value={currInterviewer}
          setInterviewer={handleInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => validate()}>Save</Button>
        </section>
      </section>
    </main>

  );
}
