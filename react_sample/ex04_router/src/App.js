// import logo from './logo.svg';
import './App.css';
import './rogan/core.css';
// eslint-disable-next-line
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom'

import Home from './views/Home';
import About from './views/About';
import Contact from './views/Contact';
import Detail from './views/Detail';

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
      
      <Switch> {/* 중복되지않도록 */}
        <Route path="/contact" component={Contact} />
        <Route path="/about" component={About} />
        <Route path="/:id" component={Detail} /> {/*순서주의 /로 시작하는 모든 기타 경로 처리 */}
        <Route path="/" component={Home} />
      </Switch>




    </div>
  );
}

export default App;
