// import React from 'react'
import React, { useRef,useState } from 'react'

const Exam06 = () => {

    const items = Array.from({ length: 100 }, (_, i) => `item ${i + 1}`)

    const myRef = useRef(null)
    const scrollRef = useRef()

    const [item,setItem] = useState('')


    return (
        <>
            <h1 ref={myRef} >hello</h1>
            <h2 id="hyper2" > world </h2>
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
                            <li key={index} name={`name${index}`} >{_}</li>
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

            <button onClick={
                ()=> {
                    //dom 에 직접 접근하기 
                    let _item = scrollRef.current.querySelector('[name=name50]')
                    console.log(_item)

                    let _item2 = document.querySelector('#hyper2')

                    _item2.style.color = 'red'

                }
            } > test 1 </button>

            <div>
                <input onChange={(evt)=> { setItem( parseInt( evt.target.value) ) }}  />
                <button onClick={()=> {
                    console.log(item)
                    let _item = scrollRef.current.querySelector(`[name=name${item-1}]`)

                    scrollRef.current.scrollTop = _item.offsetTop - scrollRef.current.offsetTop


                }}> click </button>
            </div>

            
        </>
    )
}

export default Exam06
