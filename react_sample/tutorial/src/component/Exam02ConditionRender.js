
import React, { useState } from 'react'


const Exam02 = () => {
    let [bTest, bTest_] = useState(true)
    let [age, age_] = useState(11)

    const textTrue = ["진실", "거짓"]

    return (
        <div className="Exam02">
            <p> 조건부 랜더링 예제 </p>
            <div className='box' >
                <button onClick={() => bTest_(true)}>true</button>
                <button onClick={() => bTest_(false)}>false</button>

            </div>
            <div className='box'>
                <h1>
                    {
                        bTest ? textTrue[0] : textTrue[1]
                    }
                </h1>
                {
                    bTest &&
                    <div>
                        <input onChange={
                            (evt) => {
                                if (evt.target.value !== '')
                                    age_(parseInt(evt.target.value))
                                else
                                    age_(0)

                            }
                        } value={age} />
                    </div>
                }
                {
                    // : null 표현식 대신에 깔금하게..
                    bTest && <div style={
                        {
                            backgroundColor: "rgb(255,255,0)",
                            width: "128px",
                            height: "64px",
                        }
                    } ></div>
                }

                <h2>
                    {

                        // if else 구문 응용 예
                        age >= 13 ?
                            age > 20 ?
                                "성인" :
                                "청소년"
                            :
                            "어린이"

                    }
                </h2>


            </div>

        </div>
    )
}

export default Exam02