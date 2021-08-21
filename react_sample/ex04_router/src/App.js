// import logo from './logo.svg';
import './App.css';
import './rogan/core.css';
// eslint-disable-next-line
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'

import Home from './views/Home';
import About from './views/About';
import Contact from './views/Contact';

function App() {
  return (
    <div className="App">

      <div className="header rogan nav" >
        <ul>
          <li><NavLink exact to="/">Home</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
        </ul>
      </div>

      <div className='Router-root'>
        <Route exact path="/" component={Home} />
        <Route path="/contact" component={Contact} />
        <Route path="/about" component={About} />
      </div>

    </div>
  );
}

export default App;
