// import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { fabric } from 'fabric';

function App() {

  const [canvas, setCanvas] = useState('');
  const [curObject,setCurObject] = useState();

  const initCanvas = () => {


    console.log('initCanvas');
    const width = window.innerWidth;
    const height = window.innerHeight;

    console.log(width, height);

    return new fabric.Canvas('canvas', {
      height: 800,
      width: width,
      backgroundColor: 'black'
    })
  }
    

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
          setCurObject(evt.target)
        })
        canvas.add(rect);
        canvas.renderAll();

      }} > Rect</button>
      <button onClick={()=> {
         const circle = new fabric.Circle({
          radius: 20, fill: 'green', left: 100, top: 100
        });
        circle.on('mousedown',(evt)=> {
          setCurObject(evt.target)
        });
        canvas.add(circle)
        canvas.renderAll();
      }} >circle</button>


      <button onClick={()=> {
        if(curObject){
          curObject.set('fill','red');
          canvas.renderAll();
        }
      }} > test </button>

      <canvas id="canvas" />
    </div>
  );
}

export default App;
