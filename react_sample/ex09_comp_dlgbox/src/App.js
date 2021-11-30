// import logo from './logo.svg';
import './App.css';

import React, { useState } from 'react';
import MsgBox from './components/MsgBox';

function App() {

  // const [msgBox, setMsgBox] = React.useState({})
  const [msgBoxInterface, setMsgBoxInterface] = useState({ state: 'setup' });

  const [text, setText] = useState('Hello, World!');

  return (
    <div className="App">

      <div>
        <input onChange={(evt) => {
          setText(evt.target.value);
        }}
          value={text} />
        <button onClick={() => {
          msgBoxInterface.setText(text);
        }}>
          setText
        </button>
      </div>

      <button onClick={() => {
        msgBoxInterface.setText(text);
        msgBoxInterface.setCallBack(
          {
            onClose: (evt) => {
              console.log(evt);
              setText(evt);
            }
          });
        msgBoxInterface.open()
      }

      }> Show
      </button>


      <MsgBox
        setInterface={setMsgBoxInterface}
      />
    </div>
  );
}

export default App;
