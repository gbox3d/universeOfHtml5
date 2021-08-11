// import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';

function App() {

  let msg = 'hello react'
  let [counter,setCounter] = useState(0)
  let [text,setText] = useState(''); //input 태그용

  function resetCount() {
    setCounter(0)
  }

  //input 값이 변할때 이밴트 처리 
  function onChangeText(e) {
    console.log(e.target.value);
    setText(e.target.value);
  }

  return (
    <div className="App">
      <h1>{msg}</h1>
      <h3>{text}</h3>
      <button onClick={ ()=> {setCounter( counter+1 )} } > inc </button>
      <button onClick={resetCount} > reset </button>
      <p>{counter}</p>
      <div>
        <input value={text} onChange={onChangeText} />
      </div>
    </div>
  );
}

export default App;
