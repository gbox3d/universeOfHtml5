// import logo from './logo.svg';
import './App.css';
import {findIndex} from 'lodash'
import React, { useState } from 'react';

function App() {

  let food_data = [
    { "id": 4185, "uid": "5b58090c-4731-4f5a-9663-6a134baabee0", "dish": "Fettuccine Alfredo", "description": "Creamy mascarpone cheese and custard layered between espresso and rum soaked house-made ladyfingers, topped with Valrhona cocoa powder.", "ingredient": "Vegetable Spaghetti", "measurement": "2 tablespoon" },
    { "id": 737, "uid": "2dbdd1da-a42e-43ad-97d9-18ce1c5f9b21", "dish": "Chicken Fajitas", "description": "Smoked salmon, poached eggs, diced red onions and Hollandaise sauce on an English muffin. With a side of roasted potatoes.", "ingredient": "Kokam", "measurement": "1/3 gallon" },
    {"id":9436,"uid":"872f10aa-7683-4ef0-b073-697a4e0f06a4","dish":"Barbecue Ribs","description":"Three eggs with cilantro, tomatoes, onions, avocados and melted Emmental cheese. With a side of roasted potatoes, and your choice of toast or croissant.","ingredient":"Smoked Trout","measurement":"1 pint"}
  ]
  let currentIndex = useState(0)

  function _handler(id) {

    return ()=> {
      console.log(id)
      let _index = findIndex(food_data,(o)=>o.id === id )
      console.log(_index)
      currentIndex[1](_index)
    }
  }

  return (
    <div className="App">
      
      <div className='list-root' >
      {
        food_data.map((_food) => {
          return (
            <div className='list' key={_food.id} onClick={_handler(_food.id)} >
              <h3>{_food.dish}</h3>
            </div>
          )
        })
      }
      </div>

      <div className='detail-view'>
        <hr/>
        <h4> { food_data[currentIndex[0]].dish } </h4>
        <p> { food_data[currentIndex[0]].description } </p>
        <p> { food_data[currentIndex[0]].ingredient} </p>

      </div>
      
    </div>
  );
}

export default App;
