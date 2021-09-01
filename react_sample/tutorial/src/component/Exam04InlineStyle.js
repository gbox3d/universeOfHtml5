import React from 'react'

 const Exam04 = ()=> {
    let ribonStyle = {
        backgroundColor : 'pink',
        color : 'black',
        padding: '15px 16px'
    }

    let fontColor = 'rgb(255,255,0)';
    return (
        <div>
            
            <h1 style={{
                padding: '15px 16px',
                backgroundColor : '#f0f',
                color : fontColor
            }} > Inline Styling </h1>

            <h2 style={ribonStyle} > Black Pink </h2>
        </div>
    )
}

export default Exam04
