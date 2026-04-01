// import react from "react";
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  //get all notes
  const getNotes = async () => {
    //API CALL
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjljNjkyMTlhNDQyN2I0ZjkzZWMyMDEyIn0sImlhdCI6MTc3NDYyNDIzOX0.NI-LMCAtjtJCDTghMrl275WS27Y7bO8XgGWb9rdGtbE",
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  //add a note
  const addNote = async (title, description, tag) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjljNjkyMTlhNDQyN2I0ZjkzZWMyMDEyIn0sImlhdCI6MTc3NDYyNDIzOX0.NI-LMCAtjtJCDTghMrl275WS27Y7bO8XgGWb9rdGtbE",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();

    console.log("adding a new note");
    setNotes(notes.concat(note));
  };

  //delete a note
  const deleteNote = async (id) => {
    await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjljNjkyMTlhNDQyN2I0ZjkzZWMyMDEyIn0sImlhdCI6MTc3NDYyNDIzOX0.NI-LMCAtjtJCDTghMrl275WS27Y7bO8XgGWb9rdGtbE",
      },
    });
    console.log("deleting note " + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //edit a note
  const editNote = async (id, title, description, tag) => {
    //API CALL

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjljNjkyMTlhNDQyN2I0ZjkzZWMyMDEyIn0sImlhdCI6MTc3NDYyNDIzOX0.NI-LMCAtjtJCDTghMrl275WS27Y7bO8XgGWb9rdGtbE",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();

    //edit
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let i = 0; i < newNotes.length; i++) {
      const element = newNotes[i];
      if (element._id === id) {
        newNotes[i].title = title;
        newNotes[i].description = description;
        newNotes[i].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
