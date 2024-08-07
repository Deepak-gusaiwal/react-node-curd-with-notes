import React, { useEffect, useState } from "react";
import NoteForm from "../NoteForm";
import { useSelector } from "react-redux";

const EditNoteModal = () => {
  const { showNoteModal } = useSelector((state) => state.base);
  const { notes } = useSelector((state) => state.note);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    const note = notes.filter((note) => note._id == showNoteModal.id);
    setSelectedNote(note[0]);
  }, [showNoteModal.id]);

  return (
    <div className="fixed top-0 left-0 z-[99] w-full h-full p-2 bg-zinc-800 bg-opacity-85 flex items-center">
      <NoteForm data={selectedNote} modal />
    </div>
  );
};

export default EditNoteModal;
