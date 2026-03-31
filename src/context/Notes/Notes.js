import React, { useContext } from "react";
import noteContext from "../context/Notes/noteContext";
import Noteitem from "./Noteitem";
import { AddNote } from "./AddNote";

export default function Notes() {
  const context = useContext(noteContext);
  const { notes, addNote } = context;
  return (
    <>
      <AddNote />
      <div className="container my-3">
        <h1>Your Note</h1>
        {Array.isArray(notes) ? (
          notes.map((note) => {
            return <Noteitem key={note._id} note={note} />;
          })
        ) : (
          <p>No notes to display</p>
        )}
      </div>
    </>
  );
}
