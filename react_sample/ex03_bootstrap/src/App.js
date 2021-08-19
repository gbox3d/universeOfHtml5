// eslint-disable-next-line 
import logo from './logo.svg';

import './App.css';
// or less ideally
import { Button } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <h1>hello world</h1>
      <>
  <Button variant="primary">Primary</Button>{' '}
  <Button variant="secondary">Secondary</Button>{' '}
  <Button variant="success">Success</Button>{' '}
  <Button variant="warning">Warning</Button>{' '}
  <Button variant="danger">Danger</Button> <Button variant="info">Info</Button>{' '}
  <Button variant="light">Light</Button> <Button variant="dark">Dark</Button>{' '}
  <Button variant="link">Link</Button>
</>
    </div>
    
  );
}

export default App;
