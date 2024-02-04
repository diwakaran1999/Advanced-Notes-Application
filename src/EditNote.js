import NoteForm from "./NoteForm";
import { useOutletContext } from "react-router-dom";

export default function EditNote({ onUpdate, onAddTag, availableTags }) {
  const note = useOutletContext();
  return (
    <>
      <h1 className="mb-4">New Note</h1>
      <NoteForm
        title={note.data.title}
        noteTags={note.tags}
        markdown={note.data.text}
        onSubmit={(data) => onUpdate(note.id, data)}
        onAddTag={onAddTag}
        availableTags={availableTags}
      ></NoteForm>
    </>
  );
}
