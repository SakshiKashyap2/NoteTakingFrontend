import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from 'axios'


function App() {

  const [notes, setNotes] = useState([]);

  useEffect(()=>{
    
    axios.get('http://localhost:5000/allnotes')
    .then(response=>{
      // console.log(response.data);
      response.data.forEach(element => {
        // console.log(element);
        setNotes(prevNotes => {
          return [...prevNotes, element];
        });
      });
    })
  }, [])


  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    console.log(id)
    axios.post('http://localhost:5000/deleteById', {id: id})
    .then(response=>{
      console.log(response);
      window.location.reload();
    })
    .catch(err=>{
      console.log(err);
    })
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
