# 라우터 

## 패키지 추가

```sh
yarn add react-router-dom #라우터

```

반드시 BrowserRouter로 라우터를 묶어야한다.  
index.js 파일을 다음과 같이 수정한다.
```jsx
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

```


```jsx

```
### 문법
* 태그  
Route : 라우터 개체 지정 
Switch : 중복을 피하기 위해서 사용하는 콤포넌트. 맨상단을 감싼다.


excat : 완전히 일치하는 패스만 표시한다. route 와 
path :  경로지정


