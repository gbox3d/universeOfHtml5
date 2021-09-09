// import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { fabric } from 'fabric';

function App() {

  const [canvas, setCanvas] = useState('');
  const [curObject,setCurObject] = useState();

  const initCanvas = () => (
    new fabric.Canvas('canvas', {
      height: 800,
      width: 800,
      backgroundColor: 'pink'
    })


  )


  useEffect(() => {
    setCanvas(initCanvas());
  }, []);


  return (
    <div className="App">
      <button onClick={() => {
        const rect = new fabric.Rect({
          height: 280,
          width: 200,
          fill: 'yellow'
        });

        rect.on('mousedown',(evt)=> {

          // console.log(this);
          setCurObject(evt.target)

        })


        canvas.add(rect);
        canvas.renderAll();

      }} > Rect</button>
      <button onClick={()=> {
         var circle = new fabric.Circle({
          radius: 20, fill: 'green', left: 100, top: 100
        });
        canvas.add(circle)
        canvas.renderAll();
      }} >circle</button>


      <button onClick={()=> {
        curObject.set('fill','#0000ff')
        canvas.renderAll()
      }} > test </button>



      <canvas id="canvas" />
    </div>
  );
}

export default App;
