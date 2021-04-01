import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/')
    .then(res => {
      if(res.ok)
        return res.json();
    })
    .then(data => {setNotes(data); console.log('Hua')});
  })

  function addNote(newNote) {

    axios.post('http://localhost:5000/', newNote)
    .then(() => {
      setNotes(prevNotes => {
        return [...prevNotes, newNote];
      });
    });
    
  }

  function deleteNote(id) {

    axios.delete('http://localhost:5000/' + id)
    .then(() => {
      setNotes(prevNotes => {
        return prevNotes.filter((noteItem) => {
          return noteItem._id !== id;
        });
      });
    });

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
