import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import noteContext from "../context/Notes/noteContext";
import Notes from "./Notes";

export default function Home() {
  const context = useContext(noteContext);
  const { notes, getNotes } = context;
  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div>
      <Notes />
      {notes.length > 0 && (
        <div className="container my-3">
          <Link to="/notes" className="btn btn-primary">
            View Your Notes
          </Link>
        </div>
      )}
    </div>
  );
}
