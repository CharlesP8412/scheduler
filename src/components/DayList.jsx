import React from "react";
import DayListItem from "./DayListItem"

export default function DayList(props) {
  const { days } = props

/* Below cannot be wrapped in {} it causes 'no-unused-expressions lint error */
const parsedDays = days && days.map(day => (
<DayListItem key={day.id} 
name={day.name} 
spots={day.spots} 
selected={day.name === props.day} 
setDay={()=>{props.setDay(day.name)}} />));

  return (
    <ul>
      {parsedDays && parsedDays.length ? parsedDays : "Days List is empty"}
    </ul>
  );
}
