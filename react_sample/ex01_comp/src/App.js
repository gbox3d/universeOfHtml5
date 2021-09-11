// import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

import YourModal from './YourModal';

function App() {

  let [showModal, setShowModal] = useState(true)
  let [msg,setMsg] = useState('미원') //하위 컴포넌트에 전달할 값 

  return (
    <div className="App">
      <div>
        <button onClick={() => { setMsg('감치미') }} > send msg </button>
      </div>
      <div>
        <button onClick={() => { setShowModal(!showModal) }} > ok </button>
      </div>

      <hr />
      {
        showModal ?
          <MyModal msg={msg} callBack={()=>{console.log('click')}} />
          : null
      }
      <hr/>
      <YourModal msg={msg} setMsg={setMsg} />

    </div>
  );
}

function MyModal(props) {
  return (
    <div className="MyModal" >
      <h2>Modal box</h2>
      <p> {props.msg} </p>
      <button onClick={props.callBack} > call back test </button>
    </div>
  )
}

export default App;
