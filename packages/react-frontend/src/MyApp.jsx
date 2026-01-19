// src/MyApp.jsx
import React, { useState } from "react";
import Table from "./Table";
import Form from "./Form";


function MyApp() {
    const [characters, setCharacters] = useState([]);
    
    function updateList(person) {
    setCharacters([...characters, person]); //Note: "..."" is an operator that unpacks(nested array) an array
    //without it, we create an extra entry thats empty upon submitting! 
    }

    function removeOneCharacter(index) {
        const updated = characters.filter((character, i) => {
        return i !== index;
        });
        setCharacters(updated);
    }
    
    return (
        <div className="container">
        <Table
      characterData={characters}
      removeCharacter={removeOneCharacter}
        />
        <Form handleSubmit={updateList} />
        </div>
    );
    

    }


export default MyApp;