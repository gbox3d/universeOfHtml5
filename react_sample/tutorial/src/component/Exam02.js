
import React, { useState } from 'react'


const Exam02 = () => {
    let [bTest, bTest_] = useState(true)
    const textTrue = ["진실", "거짓"]

    return (
        <div className="Exam02">
            <p> 조건부 랜더링 예제 </p>
            <div className='box' >
                <button onClick={ ()=>bTest_(true) }>true</button>
                <button onClick={ ()=>bTest_(false) }>false</button>
            </div>
            <div className='box'>
                <h1>
                    {
                        bTest ? textTrue[0] : textTrue[1]
                    }
                </h1>
                {
                    bTest ?
                        <div className='box'>
                            <p>참</p>
                            <button> 확인 </button>
                        </div> :
                        <div className='box'>
                            <p>거짓</p>
                            <input />
                        </div>
                }

            </div>

        </div>
    )
}

export default Exam02