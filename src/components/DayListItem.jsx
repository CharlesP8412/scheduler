import React from "react";
import classnames from "classnames";
import "components/DayListItem.scss"



export default function DayListItem(props) {
   const dayClass = classnames("day-list__item", {
      'day-list__item--selected': props.selected === true,
      'day-list__item--full': props.spots === 0
   });

   const formatSpots = (numSpots) => {
      if (!numSpots) {
         return 'no spots remaining'
      }
      if (numSpots === 1) {
         return `${numSpots} spot remaining`
      }
      return `${numSpots} spots remaining`
   }

   return (
      <li className={dayClass} onClick={props.setDay}  data-testid="day">
         <h2 >{props.name}</h2>
         <h3 >{formatSpots(props.spots)}</h3>
      </li>
   );
}
