import React from "react";
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form"
import useVisualMode from "../../hooks/useVisualMode"
import "components/Appointment/styles.scss"

export default function Appointment(props) {
   const { interview } = props
   const EMPTY = "EMPTY";
   const SHOW = "SHOW";
   const CREATE = "CREATE";

   const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

   return (
      <article className="appointment">
         <Header time={props.time} />

         {mode === EMPTY && <Empty onAdd={() => { transition(CREATE) }} />}
         {mode === SHOW && <Show student={interview.student} interviewer={interview.interviewer} />}
         {mode === CREATE && <Form onCancel={() =>{back()}}/>}

      </article>
   );
}

/* 
.add("Form - Edit", () => (
   <Form
     name="Joan A Person"
     interviewers={interviewers}
     interviewer={4}
     onSave={action("onSave")}
     onCancel={action("onCancel")}
   />
 )) */