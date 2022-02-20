// import logo from './logo.svg';
import './App.css';
// eslint-disable-next-line 
import React, { useState } from 'react';
import { useRef } from 'react';


const listData = []
for (let i = 0; i < 1000; i++) {
  listData.push(i)
}


function App() {

  const listref = useRef(null)
  const [scrollTop, setScrollTop] = useState(0)

  return (
    <div >

      <ul
        ref={listref}
        style={
          {
            listStyle: 'none',
            padding: 0,
            border: '1px solid black',
            height: '100px',
            overflow: 'scroll'


          }
        } >
        {
          listData.map((_data) => {
            // console.log(_data)
            return (
              <li key={_data}>
                {_data}
              </li>
            )
          })
        }

      </ul>

      <button onClick={
        () => {
          console.log('click')
          console.log(listref.current.scrollTop)
          setScrollTop(listref.current.scrollTop)
        }
      } >get current scrollTop </button>

      <hr />

      <input
        value={scrollTop}
        onChange={
          (e) => {
            setScrollTop(e.target.value)
          }
        }
      />

      <button onClick={
        () => {
          listref.current.scrollTop = scrollTop

        }
      } > goto </button>

    </div>
  );
}

export default App;
