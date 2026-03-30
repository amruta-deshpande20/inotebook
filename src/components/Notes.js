import React, { useContext } from "react";
import noteContext from "../context/Notes/noteContext";
import Noteitem from "./Noteitem";

export default function Notes() {
  const context = useContext(noteContext);
  const { notes, setNotes } = context;
  return (
    <div className="container my-3">
      <h1>Your Note</h1>
      {notes.map((note) => {
        return <Noteitem key={note._id} note={note} />;
      })}
    </div>
  );
}
