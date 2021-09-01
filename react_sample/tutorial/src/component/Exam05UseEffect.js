import React, { useState, useEffect } from 'react'


const Exam05 = () => {

    const [count, setCount] = useState(0)
    const [text, setText] = useState('initialState')

    useEffect(() => {
        console.log('init created')
        return () => { //반환값은 갱신전 화면이 지워질때 호출될 콜백 함수 
            console.log('init destoy')
        }
    },
        [] //옵저버 지정 , 빈 배열로 지정하면 (초기에 한번에 호출( on created ))
    )

    useEffect(() => {
        console.log('update every time')
        return () => {
            console.log('destoy every time')
        }
    }) //아무것도 지정안하면 , 모든 업데이트 에 호출됨

    useEffect(() => {
        console.log('count update')
        return () => {
            console.log('destoy count')
        }
    }, [count]) //카운터가 업데이트 될때 호출됨

    useEffect(() => {
        console.log('text update')
        return () => {
            console.log('text count')
        }
    }, [text]) //카운터가 업데이트 될때 호출됨

    return (
        <div>
            <h1>{count}</h1>
            <div>
                <button onClick={() => { setCount(count + 1) }} className="rogan btn" > Inc </button>
            </div>
            <div>
                <h2>{text}</h2>
                <input onChange={(evt)=>setText(evt.target.value)} />
            </div>

        </div>
    )
}

export default Exam05
