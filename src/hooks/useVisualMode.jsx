import { useState } from "react";

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial])


  function transition(newMode, replaceLast = false) {
    setMode(newMode)

    if (replaceLast) {
      setHistory(prev => {
        prev.pop();
        return [...prev, newMode]
      })
    } else {
      setHistory(prev => {
        return [...prev, newMode]
      })
    };
  };

  function back() {
    //Pop off latest in history[] (but not directly and not if only one)
    setHistory(prev => {
      if (prev.length > 1) {
        prev.pop()
        //  prev = [...prev, prev.slice(0, prev.length-1)]
        setHistory(prev)
      }
      //Set Mode to the new last entry in array
      setMode(history[history.length - 1])
    })

  };
  return { mode, transition, back };
};



