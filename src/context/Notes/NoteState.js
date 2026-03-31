// import react from "react";
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:3000";
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
    await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjljNjkyMTlhNDQyN2I0ZjkzZWMyMDEyIn0sImlhdCI6MTc3NDYyNDIzOX0.NI-LMCAtjtJCDTghMrl275WS27Y7bO8XgGWb9rdGtbE",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    console.log("adding a new note");
    const note = {
      _id: "69ca490cc0395e4af1be13f8",
      user: "69ca48dcc0395e4af1be13f2",
      title: title,
      description: description,
      tag: tag,
      date: "2026-03-30T09:57:32.694Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  //delete a note
  const deleteNote = async (id) => {
    await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjljOTQyYzgxZmJiNzYzNGZlZWNmZWMxIn0sImlhdCI6MTc3NDc5NzUxMn0.8nOO_lG9HJFVHObUD551N38__U8X524gXK9-omH-fdw",
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

    await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjljNjkyMTlhNDQyN2I0ZjkzZWMyMDEyIn0sImlhdCI6MTc3NDYyNDIzOX0.NI-LMCAtjtJCDTghMrl275WS27Y7bO8XgGWb9rdGtbE",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    //edit
    for (let i = 0; i < notes.length; i++) {
      const element = notes[i];
      if (element._id === id) {
        notes[i].title = title;
        notes[i].description = description;
        notes[i].tag = tag;
      }
      break;
    }
    setNotes(notes);
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
