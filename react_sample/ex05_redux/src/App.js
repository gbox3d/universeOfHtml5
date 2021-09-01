// import logo from './logo.svg';
import './App.css';
import Counter from './component/Counter'
import Todos from './component/Todos';
// import HelloThunk from './component/HelloThunk'

function App() {
  return (
    <div className="App">
      <Counter />
      <Todos />
      {/* <HelloThunk/> */}
    </div>
  );
}

export default App;
