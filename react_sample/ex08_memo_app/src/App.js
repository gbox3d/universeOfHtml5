import React from 'react';
// import { useState } from 'react';
import './App.css';

// import { memoSlice } from './reduex/memoSlice';

// import { useSelector, useDispatch } from 'react-redux';

import MemoInput from './component/memoInput';
import MemoList  from './component/memoList';


function App() {

  // const dispatch = useDispatch()
  // const memo = useSelector(state => state.memo)

  // let [text, setText] = useState('');

  return (
    <div className="App">

      <MemoInput />
      <MemoList />

    </div>
  );
}

export default App;
