// import React from 'react'
import React, { useRef } from 'react'

const Exam06 = () => {

    const items = Array.from({ length: 100 }, (_, i) => `item ${i + 1}`)

    const myRef = useRef(null)
    const scrollRef = useRef()


    return (
        <>
            <h1 ref={myRef} >hello</h1>
            <button onClick={() => {
                myRef.current.innerText = 'world'
            }} > next </button>

            <ul ref={scrollRef} style={
                {
                    height: '200px',
                    backgroundColor: 'gray',
                    overflow: 'auto'
                }
            } >
                {
                    items.map((_, index) => {
                        return (
                            <li key={index} >{_}</li>
                        )
                    })

                }
            </ul>

            <button onClick={() => {
                scrollRef.current.scrollTop = 0
            }} >scroll to top</button>

            <button onClick={() => {
                
                //10번 항목 찾기
                let _item = [ ...scrollRef.current.children].filter(_=> {
                    // console.log(_.innerText)
                    return _.innerText === 'item 10'
                })

                console.log(_item[0].offsetTop - scrollRef.current.offsetTop)

                scrollRef.current.scrollTop = _item[0].offsetTop - scrollRef.current.offsetTop
            }} >scroll to 10</button>
        </>
    )
}

export default Exam06
