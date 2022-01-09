import './App.css';
import { useState, useEffect } from "react";
import Axios from "axios";


function App() {

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [listOfFriends, setListOfFriends] = useState([]);

  const addFriend = () => { alert(name + age);
    Axios.post('https://hosein-mern.herokuapp.com/addfriend', {name: name, age: age,
  }).then((response)=> {
    setListOfFriends([...listOfFriends, {_id: response.data._id, name: name, age: age}]);
  })
  };

  const updateFriend = (id) => {
    const newAge = prompt("Enter new age")

    Axios.put('https://hosein-mern.herokuapp.com/update',{newAge: newAge, id: id}).then(() => {
      setListOfFriends(listOfFriends.map((val) => {
        return val._id === id ? { _id: id, name: val.name, age: newAge} : val;
      }))
    })
  };

  const deleteFriend = (id) => {
    Axios.delete(`https://hosein-mern.herokuapp.com/delete/${id}`).then(() => {setListOfFriends(listOfFriends.filter((val)=> {
      return val._id !== id;
    })
    
    );
  });
  };

  useEffect(() => { 
    Axios.get("https://hosein-mern.herokuapp.com/read").then((response) => {
      setListOfFriends(response.data);
     // const update = prompt("Enter value");
    //   console.log(update);
    }).catch(() => { console.log("Error");
  });
}, []);



  return (
    <div className="App">
     <div className="inputs">

      <input type="text" placeholder="What to do..." onChange={ (event) => {setName( event.target.value)}} />
      <input type="number" placeholder="Minutes to finish" onChange={ (event) => {setAge(event.target.value)}} />
      <button onClick={addFriend}>Add todo</button>
      </div>

<div className="listOfFriends">
    {listOfFriends.map((val) => {
      return ( 
      <div className="friendContainer">
      <div className="friend">
     
     
   

        <h3 className="todo"> {val.name} </h3> 
        <h3 className="time">Time: {val.age} </h3>
       
        
        </div>
       
        <button onClick={()=>{updateFriend(val._id)}}>Uppdatera</button>
        <button className="removeButton"  onClick={()=>{deleteFriend(val._id)}}>X</button>
        
      </div>
     
  ); 

    })}
    </div>
  

    </div>
  );
  
}

export default App;
