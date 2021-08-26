# Redux  


## 노트

redux/store.js 만들고 state를 다음과 같은식으로 코딩한다.   
```js
import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './counterSlice'

export default configureStore({
	reducer: {
		리듀서이름 : 슬라이서.리듀서객체,
        counter : counterSlice.reducer

	},
});
```

앱을 프로바이더로 감싼다.  
프로바이더에 state를 넘겨준다.  

```jsx
import {Provider} from 'react-redux'  
import store from './redux/store'

<Provider store={store}>
<App/>
</Provider>

```

@reduxjs/toolkit 으로 slicer를 만든다.   
이것은 리듀서를 한번 감싸주어 쓰기 편하게 만들어 준다.  

```js
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: 'counter',
    initialState: {count:0},
    reducers: {
        inc: (state, action) => {
            console.log('action inc')
            state.count++;
        },
        set : (state,action) => {
            state.count = action.payload.value
        }
    }
})

export default counterSlice
```


먼저 스토어에 등록은 다음과 같이한다. 
```js
import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './counterSlice'

export default configureStore({
	reducer: {
		counter: counterSlice.reducer //읽기용으로 사용하기 위하여
	},
});
```
configureStore 로 리듀서들을 등록한다. 읽기용으로 사용하는 useSelector 위한 과정이다.

리듀서값을 리액트하게 읽고 싶은 컴포넌트에서 useSelector로 값읽는다.
```js
import { useSelector, useDispatch } from 'react-redux';
const counter = useSelector((state) => state.counter);
```
configStore에 넘겨준 counter 값이 state.counter이다.   
즉 state 인자로 넘겨준 reducer 이다.  

값을 쓸때는 스토어를 거치지않고 바로 슬라이서를 디스패치에서 호출한다.
```js
import counterSlice from '../redux/counterSlice'
import { useSelector, useDispatch } from 'react-redux';

...

const dispatch = useDispatch();

...

dispatch(counterSlice.actions.inc()) //슬라이서 호출

dispatch(counterSlice.actions.set({value:1000})) //인자 전달예
```

비동기 처리를 위한 createAsyncThunk 이 있다.  
export 시켜서 외부에서 사용하게한다.  
그리고 슬라이서의 '외부 리듀서'에 등록시켜 데이터를 동기화 시킨다.  

```js

export const getTodosAsync = createAsyncThunk(
  'todos/getTodosAsync', //type
  async () => {
    const resp = await fetch('https://jsonplaceholder.typicode.com/todos');
    console.log(resp)
    if (resp.ok) {
      const todos = await resp.json();
      return { todos }; //playload
    }
  }
);

...

  extraReducers: {
    [getTodosAsync.fulfilled]: (state, action) => {
      console.log(action)
      return action.payload.todos;
    },
  }
  
```


## 참고자료

https://github.com/chrisblakely01/react-redux-todo-app  


