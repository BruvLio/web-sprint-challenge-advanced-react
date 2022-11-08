import React, { useState, useEffect } from 'react'


// Suggested initial states
const initialMessage = '';
const initialEmail = '';
const initialSteps  = 0;
const initialIndex = 4; // the index the "B" is at

const cord = [[1, 1], [1, 2], [1, 3], [2, 1], [2, 2], [2, 3], [3, 1], [3, 2], [3, 3]];

export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  const [message, setMessage] = useState(initialMessage);
  const [email, setEmail] = useState(initialEmail);
  let [steps, setSteps] = useState(initialSteps);
  const [initialPosition, setInitialPosition] = useState(initialIndex);
  let [currentPosition, setCurrentPosition] = useState(2);

  function getXY() {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
   return cord[currentPosition] || false
  //  return `(${currentCord[0]}, ${currentCord[1]})`

  }

  function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
  }

  function reset() {
    setCurrentPosition(initialIndex);
    setSteps(initialSteps)
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
  }

  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
      if(getXY()!== false) {
        const moveDirection = evt.target.id 
        setSteps(steps++)
        if(moveDirection === "right"){
          setCurrentPosition(currentPosition++)
        }
        if(moveDirection === "left"){
          setCurrentPosition(currentPosition--)
        }
        if(moveDirection === "up"){
          setCurrentPosition(currentPosition-3)
        }
        if(moveDirection === "down"){
          setCurrentPosition(currentPosition+3)
        }
        console.log(getXY())
      }
  }

  function onChange(evt) {
    // You will need this to update the value of the input.
    setEmail(evt.target.value)
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
      <h3 id="coordinates">Coordinates ({getXY()[0]}, {getXY()[1]})</h3>
        <h3 id="steps">You moved {steps} times</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === currentPosition ? ' active' : ''}`}>
              {idx === currentPosition ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message"></h3>
      </div>
      <div id="keypad">
        <button onClick={(evt)=> move(evt)} id="left">LEFT</button>
        <button onClick={(evt)=> move(evt)} id="up">UP</button>
        <button onClick={(evt)=> move(evt)} id="right">RIGHT</button>
        <button onClick={(evt)=> move(evt)} id="down">DOWN</button>
        <button onClick={reset} id="reset">reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input onChange={(evt)=> onChange(evt)} id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
