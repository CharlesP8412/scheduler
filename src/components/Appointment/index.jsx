import React from "react";
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form"
import Status from "./Status"
import Confirm from "./Confirm"
import useVisualMode from "../../hooks/useVisualMode"
import "components/Appointment/styles.scss"

export default function Appointment(props) {
   function save(name, interviewer) {
      transition(SAVING)
      const interview = {
         student: name,
         interviewer
      };
      props.bookInterview(props.id, interview)
         .then(() => {
            transition(SHOW);
         })
   }

   function confirm() {
      transition(CONFIRM)
   }

   function cancel(apptId) {
      console.log(apptId)
      //Delete from DB Update State
      transition(DELETE)
      props.cancelInterview(apptId)
         .then(() => {
            transition(EMPTY);
         })

   }

 

   const { interview } = props
   // console.log("index", props)
   const EMPTY = "EMPTY";
   const SHOW = "SHOW";
   const CREATE = "CREATE";
   const SAVING = "SAVING";
   const DELETE = "DELETE";
   const CONFIRM = "CONFIRM";
   const EDIT = "EDIT";

   const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);
   return (
      <article className="appointment">
         <Header time={props.time} />

         {mode === EMPTY && <Empty onAdd={() => { transition(CREATE) }} />}
         {mode === SHOW && <Show student={interview.student} interviewer={interview.interviewer} onDelete={confirm} onEdit={() => transition(EDIT)} />}
         {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => { back() }} onSave={save} />}
         {mode === SAVING && <Status message='Saving...' />}
         {mode === DELETE && <Status message='Deleting...' />}
         {mode === CONFIRM && <Confirm message='Are you sure you want to Delete?' onCancel={() => { back() }} onConfirm={() => { cancel(props.id) }} />}
         {mode === EDIT && <Form interviewers={props.interviewers} student={interview.student} interviewer={interview.interviewer} onCancel={() => { back() }} onSave={save} />}
      </article>
   );
}
