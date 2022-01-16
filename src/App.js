import './App.css';
import { useState, useEffect } from "react";
import Axios from "axios";

//skapar en variabel och en funtion som ska ändra variabeln
function App() {
const [name, setName] = useState("");
const [age, setAge] = useState(0);
const [listOfFriends, setListOfFriends] = useState([]);
//Lägger till vännens namn och ålder 
const addFriend = () => { alert(name + age);
  //Anslutning till Heroku men skapar även en body till min förfrågan {name och age} så att den //skickas till databasen jag använder även ".then" här vilket gör att den lägger in data i min databas samtidigt som den visas på min sida.
  Axios.post('https://hosein-mern.herokuapp.com/addfriend', {name: name, age: age,
  }).then((response)=> {
    setListOfFriends([...listOfFriends, {_id: response.data._id, name: name, age: age}]);
  })
  };

  const updateFriend = (id) => {
    const newAge = prompt("Enter new age")
//.then används när min förfrågan och klar och jag kan välja vad jag vill göra efter det.
    Axios.put('https://hosein-mern.herokuapp.com/update',{newAge: newAge, id: id}).then(() => {
      setListOfFriends(listOfFriends.map((val) => {
        return val._id === id ? { _id: id, name: val.name, age: newAge} : val;
      }))
    })
  };
//Tar bort en vän från mina lista av vänner
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
    }).catch(() => { console.log("Error");
  });
}, []);



  return (
    <div className="App">
     <div className="inputs">
  {/* Här har jag mina placeholders och när det kommer ny text i mina placeholders så kallas denna functionen och ändrar värdet på min variabel via event.target.value### */}

      <input type="text" placeholder="Add New Friend" onChange={ (event) => {setName( event.target.value)}} />
      <input type="number" placeholder="Age" onChange={ (event) => {setAge(event.target.value)}} />
      <button onClick={addFriend}>Add Friend</button>
      </div>

<div className="listOfFriends">
    {listOfFriends.map((val) => {
      return ( 
      <div className="friendContainer">
      <div className="friend">
     
     
   

        <h3 className="todo">Name: {val.name} </h3> 
        <h3 className="time">Age: {val.age} </h3>
       
        
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
