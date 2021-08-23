import './App.css';
import './rogan/core.scss'
// eslint-disable-next-line 
import React from 'react'

import { Route, NavLink } from 'react-router-dom'

import Exam01 from './component/Exam01';
import Exam02 from './component/Exam02ConditionRender';
import Exam03Axios from './component/Exam03Axios';
import Exam04InlineStyle from './component/Exam04InlineStyle'
import Exam05UseEffect from './component/Exam05UseEffect';


function App() {
  return (
    <div className="App">
      
        <div className="header rogan nav" >
          <ul>
            <li><NavLink exact to="/">Home</NavLink></li>
            <li><NavLink to="/exam01">exam 1</NavLink></li>
            <li><NavLink to="/exam02">exam 2</NavLink></li>
            <li><NavLink to="/exam03">exam 3 axios</NavLink></li>
            <li><NavLink to="/exam04">exam 4</NavLink></li>
            <li><NavLink to="/exam05">exam 5</NavLink></li>
          </ul>
        </div>

        <Route path="/exam01" component={Exam01} />
        <Route path="/exam02" component={Exam02} />
        <Route path="/exam03" component={Exam03Axios} />
        <Route path="/exam04" component={Exam04InlineStyle} />
        <Route path="/exam05" component={Exam05UseEffect} />

        <div className="rogan footer">
          React Version : {React.version}
        </div>
      

    </div>
  );
}

export default App;
