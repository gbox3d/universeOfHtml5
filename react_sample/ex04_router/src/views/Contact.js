import React from 'react'
import { useHistory } from 'react-router-dom'

let Contact =  () => {
    let history = useHistory();
    return (
        <div>
            <h1>Contact</h1>
            <h2>kakao ID : gbox2</h2>
            <button onClick={()=>{history.goBack()} }>뒤로하기</button>
            <button onClick={()=>{history.push('/')} }>홈으로</button>
            <button onClick={()=>{history.push('/biolet')} }>자세희</button>

        </div>
    )
}

export default Contact

