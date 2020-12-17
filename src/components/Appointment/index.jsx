import React from "react";
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form"
import Status from "./Status"
import Confirm from "./Confirm"
import Error from "./Error"
import useVisualMode from "../../hooks/useVisualMode"
import "components/Appointment/styles.scss"

export default function Appointment(props) {
   const { interview } = props
   const EMPTY = "EMPTY";
   const SHOW = "SHOW";
   const CREATE = "CREATE";
   const SAVING = "SAVING";
   const DELETE = "DELETE";
   const CONFIRM = "CONFIRM";
   const EDIT = "EDIT";
   const ERROR_SAVE = "ERROR_SAVE";
   const ERROR_DELETE = "ERROR_DELETE";


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
         .catch((e) => {
            transition(ERROR_SAVE, true)
         })
   }

   function confirm() {
      transition(CONFIRM)
   }

   function cancel(apptId) {
      //Delete from DB Update State
      transition(DELETE, true)
      props.cancelInterview(apptId)
         .then(() => {
            transition(EMPTY);
         })
         .catch((e) => {
            transition(ERROR_DELETE, true)
         })

   }

   const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);
   return (
      <article className="appointment" data-testid="appointment">

         <Header time={props.time} />

         {mode === EMPTY && <Empty onAdd={() => { transition(CREATE) }} />}
         {mode === SHOW && <Show student={interview.student} interviewer={interview.interviewer} onDelete={confirm} onEdit={() => transition(EDIT)} />}
         {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => { back() }} onSave={save} />}
         {mode === SAVING && <Status message='Saving...' />}
         {mode === DELETE && <Status message='Deleting...' />}
         {mode === CONFIRM && <Confirm message='Are you sure you want to Delete?' onCancel={() => { back() }} onConfirm={() => { cancel(props.id) }} />}
         {mode === EDIT && <Form interviewers={props.interviewers} student={interview.student} interviewer={interview.interviewer} onCancel={() => { back() }} onSave={save} />}
         {mode === ERROR_SAVE && <Error message='Could not save' onClose={() => { back() }} />}
         {mode === ERROR_DELETE && <Error message='Could not delete' onClose={() => { back() }} />}

      </article>
   );
}
