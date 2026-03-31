import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/Notes/noteContext";
import { AddNote } from "./AddNote";

export default function Notes() {
  const context = useContext(noteContext);
  const { notes, getNotes } = context;
  useEffect(() => {
    getNotes();
  }, []);

  return (
    <>
      <AddNote />
    </>
  );
}
