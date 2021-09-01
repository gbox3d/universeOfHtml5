import React from 'react'

import { useHistory,useParams } from 'react-router-dom'

const Detail = () => {
    let {id} = useParams() // :id 로 정의된 url 파라메터 받아오기 
    let history = useHistory()
    return (
        <div>
            <h1>Detail</h1>
            <h3>{id}</h3>
            <button onClick={()=>history.goBack()}>뒤로가기</button>
        </div>
    )
}

export default Detail;