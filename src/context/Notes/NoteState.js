// import react from "react";
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "69ca48fcc0395e4af1be13f4",
      user: "69ca48dcc0395e4af1be13f2",
      title: "title",
      description: "description",
      tag: "personal",
      date: "2026-03-30T09:57:16.153Z",
      __v: 0,
    },
    {
      _id: "69ca4904c0395e4af1be13f6",
      user: "69ca48dcc0395e4af1be13f2",
      title: "title1",
      description: "description1",
      tag: "personal1",
      date: "2026-03-30T09:57:24.299Z",
      __v: 0,
    },
    {
      _id: "69ca490cc0395e4af1be13f8",
      user: "69ca48dcc0395e4af1be13f2",
      title: "title2",
      description: "description2",
      tag: "personal2",
      date: "2026-03-30T09:57:32.694Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(notesInitial);

  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
