
import React from 'react';

function YourModal(props) {
    return (
      <div className="MyModal">
        <h2>Your Modal box</h2>
        <input onChange={(e)=>{props.setMsg(e.target.value)}} /> 
        <p> {props.msg} </p>
      </div>
    )
  }

  export default YourModal;

  