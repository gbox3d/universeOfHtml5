// import logo from './logo.svg';
// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, NavLink, Switch } from 'react-router-dom'
import Home from './views/Home'
import About from './views/About'

function App() {
  return (
    <div className="App">

      <nav className="navbar navbar-dark bg-dark">
        <ul className="nav nav-pills ">
          <li className="nav-item" ><NavLink className="nav-link" exact to="/">Home</NavLink></li>
          <li className="nav-item" ><NavLink className="nav-link" to="/about">About</NavLink></li>
        </ul>
      </nav>


      <Switch> {/* 중복되지않도록 */}
        <Route path="/about" component={About} />
        <Route path="/" component={Home} />
      </Switch>

    </div>
  );
}

export default App;
