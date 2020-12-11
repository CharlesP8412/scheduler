import React from "react";
import classnames from "classnames";
import "components/InterviewerListItem.scss"


export default function InterviewerListItem(props) {
  const intClass = classnames("interviewers__item", {
    'interviewers__item--selected': props.selected
  });

  const handleClick = () =>{
    props.setInterviewer(props.id)
  }

  return (
    <li className={intClass} onClick={handleClick}>
      {/* <li className={intClass} onClick={props.setInterviewer}></li> */}
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
