import React, { useState } from "react";
import { useContext } from "react";
import noteContext from "../context/Notes/noteContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AddNote = () => {
  const context = useContext(noteContext);
  const { notes, addNote } = context;
  const navigate = useNavigate();

  const [note, setNote] = useState({
    title: " ",
    description: " ",
    tag: "default",
  });

  // useEffect(() => {
  //   console.log("function running");
  // }, [note, setNote]);

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "default" });
    navigate("/notes");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value }); //???
  };

  return (
    <div className="container my-3">
      <h1>add a note</h1>
      <form>
        <div className="my-3">
          <label htmlFor="title" className="form-label">
            title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            onChange={onChange}
          />
        </div>

        <button type="submit" className="btn btn-primary" onClick={handleClick}>
          Add Note
        </button>
      </form>
    </div>
  );
};
