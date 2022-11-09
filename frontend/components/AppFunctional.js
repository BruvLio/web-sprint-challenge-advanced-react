import React, { useState } from 'react'
import axios from 'axios'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

const coordinatesArr = [[1, 1], [1, 2], [1, 3], [2, 1], [2, 2], [2, 3], [3, 1], [3, 2], [3, 3]];

export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  const [message, setMessage] = useState(initialMessage);
  const [email, setEmail] = useState(initialEmail);
  const [steps, setSteps] = useState(initialSteps);
  const [index, setIndex] = useState(initialIndex);

  function getXY(idx) {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    return coordinatesArr[idx];
  }

  function getXYMessage(idx) {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    const message = `Coordinates (${getXY(idx)[1]}, ${getXY(idx)[0]})`
    return message;
  }

  function reset() {
    // Use this helper to reset all states to their initial values.
    setMessage(initialMessage);
    setEmail(initialEmail);
    setSteps(initialSteps);
    setIndex(initialIndex);
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    if(direction === 'left' && coordinatesArr[index][1] > 1) return [(index - 1), true];
    if(direction === 'up' && coordinatesArr[index][0] > 1) return [(index - 3), true];
    if(direction === 'down' && coordinatesArr[index][0] < 3) return [(index + 3), true];
    if(direction === 'right' && coordinatesArr[index][1] < 3) return [(index + 1), true];
    return [index, false];
  }

  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    const [indexPosition, bool] = getNextIndex(evt.target.id);
    const error = `You can't go ${evt.target.id}`;
    if(bool){
      setIndex(indexPosition);
      setMessage(initialMessage);
      setSteps(steps + 1);
    } 
    
    else if(!bool){
      setMessage(error);
    }
  }

  function onChange(evt) {
    // You will need this to update the value of the input.
    setEmail(evt.target.value);

  }

  function onSubmit(evt) {
    evt.preventDefault();
    // Use a POST request to send a payload to the server.
    const payLoad = {
      x: coordinatesArr[index][1],
      y: coordinatesArr[index][0],
      steps: steps,
      email: email
    }
    axios.post('http://localhost:9000/api/result', payLoad)
      .then(res => setMessage(res.data.message))
      .catch(err => setMessage(err.response.data.message))
    setEmail(initialEmail);
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{ getXYMessage(index) }</h3>
        <h3 id="steps">You moved { steps } time{steps === 1 ? '' : 's'}</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
              {idx === index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{ message }</h3>
      </div>
      <div id="keypad">
        <button onClick= { move }id="left">LEFT</button>
        <button onClick= { move } id="up">UP</button>
        <button onClick= { move } id="right">RIGHT</button>
        <button onClick= { move } id="down">DOWN</button>
        <button onClick= { reset } id="reset">reset</button>
      </div>
      <form onSubmit= { onSubmit }>
        <input onChange= { onChange } value= { email } id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}